import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Search engine crawlers bypass redirect for full SEO indexation of home page
const BOT_AGENTS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'baiduspider',
  'duckduckbot',
  'slurp',
  'facebot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'slackbot',
  'applebot',
  'whatsapp',
  'telegrambot',
  'discordbot',
];

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Only intercept root path
  if (pathname !== '/') return NextResponse.next();

  // 1. Explicit bypass query params (e.g. /?skip=true, /?home=true, /?direct)
  if (
    searchParams.has('skip') ||
    searchParams.has('home') ||
    searchParams.has('direct') ||
    searchParams.has('enter')
  ) {
    const res = NextResponse.next();
    // Clear any stale persistent cookie to avoid blocking future visits
    res.cookies.delete('seabird_intro_seen');
    return res;
  }

  // 2. Navigation from internal pages within the website (e.g. clicking Home from /products)
  const referer = request.headers.get('referer') || '';
  const internalPages = [
    '/products',
    '/company',
    '/contact',
    '/applications',
    '/insights',
  ];
  if (internalPages.some((p) => referer.includes(p))) {
    return NextResponse.next();
  }

  // 3. Search engine crawlers bypass directly to root
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  if (BOT_AGENTS.some((b) => ua.includes(b))) return NextResponse.next();

  // 4. Default for direct visits (mobile or desktop): ALWAYS open cinematic landing page
  const url = request.nextUrl.clone();
  url.pathname = '/landing';

  const res = NextResponse.redirect(url, { status: 307 });
  // Ensure old cookies are cleared so mobile & laptop always open landing page directly
  res.cookies.delete('seabird_intro_seen');
  return res;
}

export const config = {
  matcher: ['/'],
};
