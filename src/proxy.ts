import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Search engine crawlers bypass redirect for full SEO indexation of home page
const BOT_AGENTS = [
  'googlebot','bingbot','yandexbot','baiduspider','duckduckbot',
  'slurp','facebot','facebookexternalhit','twitterbot','linkedinbot',
  'slackbot','applebot','whatsapp','telegrambot','discordbot',
];

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Only intercept root path
  if (pathname !== '/') return NextResponse.next();

  // 1. Explicit bypass query params  /?skip=true  /?home=true  /?direct
  if (
    searchParams.has('skip') ||
    searchParams.has('home') ||
    searchParams.has('direct') ||
    searchParams.has('enter')
  ) {
    const res = NextResponse.next();
    res.cookies.set('seabird_intro_seen', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24, // 24 h
      sameSite: 'lax',
    });
    return res;
  }

  // 2. Returning visitor who already saw the intro this session
  if (request.cookies.get('seabird_intro_seen')?.value) {
    return NextResponse.next();
  }

  // 3. Navigation from within the website (internal referer)
  const referer = request.headers.get('referer') || '';
  const internalPages = ['/landing','/products','/company','/contact','/applications','/insights'];
  if (internalPages.some(p => referer.includes(p))) {
    const res = NextResponse.next();
    res.cookies.set('seabird_intro_seen', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });
    return res;
  }

  // 4. Search engine crawlers bypass directly to root
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  if (BOT_AGENTS.some(b => ua.includes(b))) return NextResponse.next();

  // 5. First-time visitor: show cinematic intro at /landing
  const url = request.nextUrl.clone();
  url.pathname = '/landing';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/'],
};
