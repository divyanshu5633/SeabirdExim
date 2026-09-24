import { countries, findCountry } from '@/data/countriesData';

export interface NormalizedCountry {
  code: string; // ISO 3166-1 alpha-2 (e.g., 'US', 'IN', 'GB')
  name: string; // Official display name
}

export interface PhoneCountryResult {
  code: string;
  name: string;
  dialCode: string;
}

export type MatchStatus = 'MATCH' | 'MISMATCH' | 'UNKNOWN' | 'NOT DETERMINED';

export interface LeadVerificationResult {
  selectedCountry: NormalizedCountry;
  detectedCountry: NormalizedCountry;
  phoneCountry: PhoneCountryResult | null;
  countryMatch: MatchStatus;
  phoneCountryMatch: MatchStatus;
  verificationNote: string;
  isMismatch: boolean;
}

// Common aliases mapping to ISO 3166-1 alpha-2 codes
const COUNTRY_ALIASES: Record<string, string> = {
  usa: 'US',
  'united states of america': 'US',
  'u.s.a.': 'US',
  'u.s.': 'US',
  uk: 'GB',
  'united kingdom': 'GB',
  'great britain': 'GB',
  uae: 'AE',
  'united arab emirates': 'AE',
  russia: 'RU',
  'russian federation': 'RU',
  korea: 'KR',
  'south korea': 'KR',
  vietnam: 'VN',
  'viet nam': 'VN',
  czechia: 'CZ',
  'czech republic': 'CZ',
  holland: 'NL',
  netherlands: 'NL',
};

/**
 * Normalizes any country name or code input to standard ISO 3166-1 alpha-2 code and official name.
 */
export function normalizeCountry(input?: string | null): NormalizedCountry {
  if (!input || !input.trim()) {
    return { code: 'UNKNOWN', name: 'Unknown' };
  }

  const clean = input.trim();
  const lower = clean.toLowerCase();

  // Check alias table first
  if (COUNTRY_ALIASES[lower]) {
    const code = COUNTRY_ALIASES[lower];
    const match = countries.find((c) => c.code.toUpperCase() === code);
    if (match) {
      return { code: match.code.toUpperCase(), name: match.name };
    }
    return { code, name: clean };
  }

  // Check existing dataset by exact name or code
  const matched = findCountry(clean);
  if (matched) {
    return { code: matched.code.toUpperCase(), name: matched.name };
  }

  // If 2 characters, treat as ISO alpha-2 code
  if (clean.length === 2 && /^[a-zA-Z]{2}$/.test(clean)) {
    return { code: clean.toUpperCase(), name: clean.toUpperCase() };
  }

  // Fallback retaining original text
  return { code: clean.toUpperCase(), name: clean };
}

/**
 * Derives country from phone number dial code.
 * Prioritizes preferredCountryCode (e.g. buyer-selected country) when dial codes are shared (e.g., +1 for US/CA).
 */
export function extractPhoneCountry(
  phone?: string | null,
  preferredCountryCode?: string | null
): PhoneCountryResult | null {
  if (!phone || !phone.trim()) {
    return null;
  }

  const cleaned = phone.trim();

  // If phone doesn't start with +, cannot reliably determine dial code without international prefix
  if (!cleaned.startsWith('+')) {
    return null;
  }

  // Find all countries whose dial code matches the start of the cleaned phone number.
  // Sort descending by dialCode length so "+1242" (Bahamas) matches before "+1" (US/Canada).
  const matchingCountries = countries
    .filter((c) => cleaned.startsWith(c.dialCode))
    .sort((a, b) => b.dialCode.length - a.dialCode.length);

  if (matchingCountries.length === 0) {
    return null;
  }

  const longestDialCode = matchingCountries[0].dialCode;
  const candidates = matchingCountries.filter((c) => c.dialCode === longestDialCode);

  // If preferredCountryCode is among candidates, choose it
  if (preferredCountryCode) {
    const preferredMatch = candidates.find(
      (c) => c.code.toUpperCase() === preferredCountryCode.toUpperCase()
    );
    if (preferredMatch) {
      return {
        code: preferredMatch.code.toUpperCase(),
        name: preferredMatch.name,
        dialCode: preferredMatch.dialCode,
      };
    }
  }

  // Otherwise, default to the first candidate for this dial code
  const selected = candidates[0];
  return {
    code: selected.code.toUpperCase(),
    name: selected.name,
    dialCode: selected.dialCode,
  };
}

/**
 * Extracts the IP-derived country strictly from server-side request headers.
 * Never reads or trusts client body or cookies for this value.
 */
export function getDetectedIpCountry(request: Request): NormalizedCountry {
  // Primary header provided by Vercel's edge network
  const vercelCountry = request.headers.get('x-vercel-ip-country');

  // Fallback headers for standard proxies / Cloudflare / edge environments
  const cfCountry = request.headers.get('cf-ipcountry');
  const genericCountry = request.headers.get('x-country-code');

  const rawCode = (vercelCountry || cfCountry || genericCountry || '').trim();

  // If not provided or special unallocated codes ('XX', 'T1', etc.)
  if (!rawCode || rawCode.toUpperCase() === 'XX' || rawCode.toUpperCase() === 'T1') {
    return { code: 'Unknown', name: 'Unknown' };
  }

  const normalized = normalizeCountry(rawCode);
  if (normalized.code === 'UNKNOWN') {
    return { code: 'Unknown', name: 'Unknown' };
  }

  return normalized;
}

/**
 * Performs lead verification by comparing:
 * 1. Buyer-selected country
 * 2. Server-side IP-detected country
 * 3. Phone country code
 */
export function verifyLead(params: {
  request: Request;
  selectedCountryRaw: string;
  phoneWhatsappRaw: string;
}): LeadVerificationResult {
  const { request, selectedCountryRaw, phoneWhatsappRaw } = params;

  // 1. Authoritative server-side detected country
  const detectedCountry = getDetectedIpCountry(request);

  // 2. Buyer selected country
  const selectedCountry = normalizeCountry(selectedCountryRaw);

  // 3. Phone country code
  const phoneCountry = extractPhoneCountry(phoneWhatsappRaw, selectedCountry.code);

  const isDetectedKnown = detectedCountry.code !== 'Unknown';

  // Country Match Logic
  let countryMatch: MatchStatus;
  let verificationNote: string;

  if (!isDetectedKnown) {
    countryMatch = 'UNKNOWN';
    verificationNote = 'IP geolocation unavailable or unmapped on connection.';
  } else if (detectedCountry.code === selectedCountry.code) {
    countryMatch = 'MATCH';
    verificationNote = 'IP-derived country matches buyer-selected country.';
  } else {
    countryMatch = 'MISMATCH';
    verificationNote = `IP-derived country (${detectedCountry.name}) differs from buyer-selected country (${selectedCountry.name}).`;
  }

  // Phone Country Match Logic
  let phoneCountryMatch: MatchStatus;
  if (!phoneCountry) {
    phoneCountryMatch = 'NOT DETERMINED';
  } else if (phoneCountry.code === selectedCountry.code) {
    phoneCountryMatch = 'MATCH';
  } else {
    phoneCountryMatch = 'MISMATCH';
  }

  const isMismatch = countryMatch === 'MISMATCH' || phoneCountryMatch === 'MISMATCH';

  return {
    selectedCountry,
    detectedCountry,
    phoneCountry,
    countryMatch,
    phoneCountryMatch,
    verificationNote,
    isMismatch,
  };
}

/**
 * Builds the plain text LEAD VERIFICATION section for internal emails.
 */
export function formatLeadVerificationText(result: LeadVerificationResult): string {
  const detectedDisplay =
    result.detectedCountry.code === 'Unknown'
      ? 'Unknown (Unavailable on connection)'
      : `${result.detectedCountry.name} (${result.detectedCountry.code})`;

  const selectedDisplay = `${result.selectedCountry.name} (${result.selectedCountry.code})`;

  const phoneDisplay = result.phoneCountry
    ? `${result.phoneCountry.name} (${result.phoneCountry.code}) [${result.phoneCountry.dialCode}]`
    : 'Not determined (Local or non-standard format)';

  return `
LEAD VERIFICATION (Internal Review Only)
----------------------------------------
Selected Country:    ${selectedDisplay}
Detected IP Country: ${detectedDisplay}
Phone Country:       ${phoneDisplay}

Country Match:       ${result.countryMatch}
Phone Country Match: ${result.phoneCountryMatch}

Verification Note:   ${result.verificationNote}
Note: Approximate IP signal. Mismatches can legitimately occur via VPN, corporate networks, travel, or multinational procurement.
`.trim();
}

/**
 * Builds the HTML LEAD VERIFICATION section for internal emails.
 */
export function formatLeadVerificationHtml(result: LeadVerificationResult): string {
  const detectedDisplay =
    result.detectedCountry.code === 'Unknown'
      ? '<span style="color: #666; font-style: italic;">Unknown (Unavailable)</span>'
      : `<strong>${result.detectedCountry.name}</strong> <span style="color: #666;">(${result.detectedCountry.code})</span>`;

  const selectedDisplay = `<strong>${result.selectedCountry.name}</strong> <span style="color: #666;">(${result.selectedCountry.code})</span>`;

  const phoneDisplay = result.phoneCountry
    ? `<strong>${result.phoneCountry.name}</strong> <span style="color: #666;">(${result.phoneCountry.code}) [${result.phoneCountry.dialCode}]</span>`
    : '<span style="color: #777;">Not determined</span>';

  const badge = (status: MatchStatus) => {
    if (status === 'MATCH') {
      return '<span style="background-color: #E8F5E9; color: #1B5E20; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 11px; letter-spacing: 0.5px;">MATCH</span>';
    }
    if (status === 'MISMATCH') {
      return '<span style="background-color: #FFF3E0; color: #E65100; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 11px; letter-spacing: 0.5px;">MISMATCH</span>';
    }
    return '<span style="background-color: #F5F5F5; color: #616161; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 11px; letter-spacing: 0.5px;">' + status + '</span>';
  };

  const bannerBg = result.countryMatch === 'MISMATCH' ? '#FFF8E1' : '#F4FBF7';
  const bannerBorder = result.countryMatch === 'MISMATCH' ? '#FFE082' : '#C8E6C9';
  const bannerTextColor = result.countryMatch === 'MISMATCH' ? '#8D6E63' : '#2E7D32';

  return `
    <div style="background-color: #FFFFFF; padding: 20px; border-radius: 8px; margin-top: 16px; border: 1px solid #E5DDD1;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #F9F7F2; padding-bottom: 8px; margin-bottom: 12px;">
        <h2 style="font-size: 14px; color: #0A6684; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
          Lead Verification <span style="font-size: 11px; font-weight: normal; color: #888;">(Internal Only &bull; Not Shared With Buyer)</span>
        </h2>
      </div>

      <div style="background-color: ${bannerBg}; border: 1px solid ${bannerBorder}; border-radius: 6px; padding: 10px 12px; margin-bottom: 14px; font-size: 12px; color: ${bannerTextColor}; line-height: 1.5;">
        <strong>Signal Summary:</strong> ${result.verificationNote}
      </div>

      <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; color: #666; width: 160px;">Selected Country:</td>
          <td style="padding: 6px 0;">${selectedDisplay}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #666;">Detected IP Country:</td>
          <td style="padding: 6px 0;">${detectedDisplay}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #666;">Phone Country:</td>
          <td style="padding: 6px 0;">${phoneDisplay}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #666;">Country Match:</td>
          <td style="padding: 6px 0;">${badge(result.countryMatch)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #666;">Phone Country Match:</td>
          <td style="padding: 6px 0;">${badge(result.phoneCountryMatch)}</td>
        </tr>
      </table>

      <div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed #E5DDD1; font-size: 11px; color: #888; line-height: 1.5;">
        <strong>Review Guidance:</strong> Country mismatch is an informational signal, not conclusive fraud proof. Mismatches frequently occur via VPNs, corporate gateways, international procurement desks, or business travel.
      </div>
    </div>
  `;
}
