import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();
  console.log({ session });
  if (!session || !session.user) {
    if (request.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/movie/:path*',
    '/api/series/:path*',
    '/api/profile/:path*',
    '/movie/:path*',
    '/series/:path*',
    '/profile/:path*',
  ],
};
