// import { createServerClient } from '@supabase/ssr';
// import { NextResponse } from 'next/server';

// export async function middleware(req) {
//   let res = NextResponse.next();

//   // 1. إنشاء عميل سوبابيس خاص بالسيرفر لتفقد الجلسة
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         get(name) {
//           return req.cookies.get(name)?.value;
//         },
//         set(name, value, options) {
//           res.cookies.set({ name, value, ...options });
//         },
//         remove(name, options) {
//           res.cookies.set({ name, value: '', ...options });
//         },
//       },
//     }
//   );

//   // 2. جلب بيانات المستخدم
//   const { data: { user } } = await supabase.auth.getUser();

//   // 3. حماية المسارات (Logic)
  
//   // إذا كان المستخدم يحاول دخول الـ Dashboard وهو غير مسجل
//   if (!user && req.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // إذا كان مسجل دخول ويحاول العودة لصفحة الـ Login
//   if (user && req.nextUrl.pathname.startsWith('/login')) {
//     return NextResponse.redirect(new URL('/dashboard', req.url));
//   }

//   return res;
// }

// // 4. تحديد الصفحات التي سيعمل عليها الـ Middleware
// export const config = {
//   matcher: ['/dashboard/:path*', '/login'],
// };
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

  // 1. حماية المسارات العامة (تسجيل الدخول)
  if (!user && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 2. حماية المسارات المدفوعة (Premium Features)
  // لنفترض أن ميزات الـ PRO موجودة داخل /dashboard/pro-tools
  if (req.nextUrl.pathname.startsWith('/dashboard/pro-tools')) {
    
    // جلب بيانات الاشتراك من جدول profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_subscribed, subscription_ends_at')
      .eq('id', user.id)
      .single();

    const isExpired = profile?.subscription_ends_at && new Date(profile.subscription_ends_at) < new Date();

    // إذا لم يكن مشتركاً أو اشتراكه انتهى
    if (!profile?.is_subscribed || isExpired) {
      // توجيهه لصفحة الترقية (Upgrade Page)
      return NextResponse.redirect(new URL('/dashboard/upgrade', req.url));
    }
  }

  if (user && req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};