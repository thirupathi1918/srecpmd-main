import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token');
  const { pathname } = req.nextUrl;

  // If trying to access dashboard ('/') without token, go to login
  if (pathname === '/' && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If already logged in and trying to access login, go to dashboard
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login'],
};