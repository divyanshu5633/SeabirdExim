import { NextResponse } from 'next/server';
import { getDetectedIpCountry } from '@/lib/leadVerification';
import { findCountry } from '@/data/countriesData';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const detected = getDetectedIpCountry(request);

    if (detected.code === 'Unknown') {
      return NextResponse.json(
        {
          success: true,
          detected: false,
          countryCode: null,
          countryName: null,
          flag: null,
        },
        {
          headers: {
            'Cache-Control': 'private, no-cache, no-store, must-revalidate',
          },
        }
      );
    }

    const countryObj = findCountry(detected.code);

    return NextResponse.json(
      {
        success: true,
        detected: true,
        countryCode: detected.code,
        countryName: countryObj?.name || detected.name,
        flag: countryObj?.flag || null,
      },
      {
        headers: {
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        detected: false,
        countryCode: null,
        countryName: null,
        flag: null,
      },
      {
        status: 200, // Return 200 with fallback so the form never fails to render
        headers: {
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        },
      }
    );
  }
}
