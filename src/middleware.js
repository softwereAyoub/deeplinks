
// src/middleware.js
// src/middleware.js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  let res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) { return req.cookies.get(name)?.value; },
        set(name, value, options) { res.cookies.set({ name, value, ...options }); },
        remove(name, options) { res.cookies.set({ name, value: '', ...options }); },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const url = req.nextUrl.clone();

  // 1. منع غير المسجلين من دخول الصفحات الحساسة
  const protectedPaths = ['/dashboard', '/upgrade', '/links', '/settings'];
  const isProtected = protectedPaths.some(path => url.pathname.startsWith(path));

  if (!user && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 2. منع المسجلين من العودة لصفحة Login
  if (user && url.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/upgrade/:path*', '/links/:path*', '/settings/:path*', '/login'],
};