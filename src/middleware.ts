import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const path = request.nextUrl.pathname;

  console.log(`Middleware check: ${path} | Session present: ${!!session}`);

  if (path.startsWith('/admin')) {
    try {
      if (!session) {
        console.log("No session found, redirecting to /login");
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const decrypted = await decrypt(session);
      if (!decrypted) {
        console.log("Session verification failed, redirecting to /login");
        return NextResponse.redirect(new URL('/login', request.url));
      }
      
      console.log("Session verified, allowing access to admin");
      return NextResponse.next();
    } catch (error) {
      console.log("Middleware error:", error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
