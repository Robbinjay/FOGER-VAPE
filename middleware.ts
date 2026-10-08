import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ISO 2-letter country codes for restricted countries (India only; Africa and all other regions allowed)
const BLOCKED_COUNTRIES = new Set([
  'IN', // India
]);

export function middleware(request: NextRequest) {
  // Check common geo-ip headers provided by cloud platforms (Vercel, Cloudflare, Google Cloud, etc.)
  const countryHeader = 
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-goog-ip-country') ||
    request.headers.get('x-country') ||
    request.headers.get('x-client-geo-country');

  if (countryHeader) {
    const country = countryHeader.toUpperCase().trim();
    if (BLOCKED_COUNTRIES.has(country)) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Access Restricted</title>
          <style>
            body { background: #000; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
            .container { max-width: 500px; padding: 40px; border: 1px solid #333; border-radius: 12px; background: #111; }
            h1 { color: #facc15; font-size: 24px; margin-bottom: 16px; }
            p { color: #aaa; font-size: 14px; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Access Restricted</h1>
            <p>Access to this service is not available from your current region.</p>
          </div>
        </body>
        </html>`,
        {
          status: 403,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
