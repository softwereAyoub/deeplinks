import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    // 1. فك تغليف الكوكيز (تحديث لـ Next.js 15)
    const cookieStore = await cookies(); 
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // يمكن تجاهل الخطأ إذا تم استدعاء setAll من Server Component
            }
          },
        },
      }
    );

    // 2. تبديل الكود بالجلسة
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // استخدام URL لضمان بناء الرابط بشكل صحيح
      const forwardTo = new URL(next, origin);
      return NextResponse.redirect(forwardTo);
    }
    
    console.error("Auth Error:", error.message);
  }

  // العودة لصفحة Login في حال الفشل
  return NextResponse.redirect(new URL('/login?error=auth-code-error', origin));
}