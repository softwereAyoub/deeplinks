
// 'use client';
// import { useEffect, use } from 'react'; // أضفنا use هنا
// import { supabase } from '@/lib/supabase';

// export default function RedirectPage({ params }) {
//   // فك تغليف params باستخدام React.use() لحل مشكلة الـ Promise
//   const unwrappedParams = use(params);
//   const slug = unwrappedParams.slug;

//   useEffect(() => {
//     const performRedirect = async () => {
//       if (!slug) return;

//       // 1. جلب البيانات من Supabase
//       const { data, error } = await supabase
//         .from('links')
//         .select('original_url, platform, clicks')
//         .eq('slug', slug)
//         .single();

//       if (error || !data) {
//         console.error("Link not found");
//         window.location.href = '/'; 
//         return;
//       }

//       // باقي الكود كما هو ...
//       const originalUrl = data.original_url;
//       const platform = data.platform;

//       // تحديث العداد
//       await supabase
//         .from('links')
//         .update({ clicks: (data.clicks || 0) + 1 })
//         .eq('slug', slug);

//       // منطق التحويل (Deep Linking)
//       let deepLink = originalUrl;
//       if (platform === 'amazon') {
//         deepLink = originalUrl.replace(/https?:\/\//, 'com.amazon.mobile.shopping://');
//       } else if (platform === 'youtube') {
//         deepLink = originalUrl.replace(/https?:\/\//, 'youtube://');
//       } else if (platform === 'tiktok') {
//         deepLink = `snssdk1128://webview?url=${encodeURIComponent(originalUrl)}`;
//       } else if (platform === 'instagram') {
//         deepLink = originalUrl.replace(/https?:\/\//, 'instagram://');
//       }

//       const start = Date.now();
//       window.location.href = deepLink;

//       setTimeout(() => {
//         if (Date.now() - start < 2000) {
//           window.location.href = originalUrl;
//         }
//       }, 1200);
//     };

//     performRedirect();
//   }, [slug]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       <p className="mt-4 text-slate-500 font-medium">Redirecting to App...</p>
//     </div>
//   );
// }

'use client';
import { useEffect, use,useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RedirectPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
// حالة لمعرفة هل الرابط منتهي أم لا
  const [isExpired, setIsExpired] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const performRedirect = async () => {
      if (!slug) return;

      // 1. جلب بيانات الرابط
      // const { data: linkData, error: linkError } = await supabase
      //   .from('links')
      //   .select('id, original_url, platform, clicks')
      //   .eq('slug', slug)
      //   .single();


        const { data: linkData , error: linkError  } = await supabase
  .from('links')
  .select('id, original_url, platform, clicks, expires_at')
  .eq('slug', slug)
  .single();


// فحص هل الرابط منتهي الصلاحية
if (linkData.expires_at && new Date(linkData.expires_at) < new Date()) {
        setIsExpired(true); // نغير الحالة بدلاً من عمل return للـ UI
        return;
      }
      if (linkError || !linkData) {
        window.location.href = '/';
        return;
      }

      // 2. تحديث الإحصائيات (العداد الإجمالي + إحصائيات اليوم)
      // نستخدم Promise.all لتنفيذ العمليتين معاً بسرعة
     // 2. تحديث الإحصائيات (العداد الإجمالي + إحصائيات اليوم)
const today = new Date().toISOString().split('T')[0];

try {
  // أ. تحديث العداد الإجمالي في جدول links
  await supabase
    .from('links')
    .update({ clicks: (linkData.clicks || 0) + 1 })
    .eq('id', linkData.id);

  // ب. استدعاء الدالة البرمجية لتحديث إحصائيات اليوم
  const { error: rpcError } = await supabase.rpc('increment_click', { 
      target_link_id: linkData.id, 
      target_date: today 
  });

  // إذا فشلت الـ RPC (ربما لم يتم إنشاؤها في SQL بعد)، نستخدم الحل اليدوي
  if (rpcError) {
    console.warn("RPC failed, falling back to manual upsert:", rpcError.message);
    await handleManualUpsert(linkData.id, today);
  }
} catch (err) {
  console.error("Error updating stats:", err);
}

      // 3. منطق التحويل (Deep Linking)
      const { original_url: originalUrl, platform } = linkData;
      let deepLink = originalUrl;

      const protocols = {
        amazon: 'com.amazon.mobile.shopping://',
        youtube: 'youtube://',
        instagram: 'instagram://',
        twitter: 'twitter://',
      };

      if (protocols[platform]) {
        deepLink = originalUrl.replace(/https?:\/\//, protocols[platform]);
      } else if (platform === 'tiktok') {
        deepLink = `snssdk1128://webview?url=${encodeURIComponent(originalUrl)}`;
      }

      // 4. محاولة الفتح ومنع الكاش
      const start = Date.now();
      window.location.replace(deepLink); // استخدم replace لمنع الرجوع للخلف للرابط الوسيط

      setTimeout(() => {
        if (Date.now() - start < 2000) {
          window.location.replace(originalUrl);
        }
      }, 1200);
    };

    performRedirect();
  }, [slug]);

  // دالة مساعدة للتعامل مع تحديث اليوم يدوياً (في حال عدم استخدام RPC)
  const handleManualUpsert = async (linkId, date) => {
    const { data: existing } = await supabase
      .from('link_stats')
      .select('id, click_count')
      .eq('link_id', linkId)
      .eq('click_date', date)
      .single();

    if (existing) {
      await supabase
        .from('link_stats')
        .update({ click_count: existing.click_count + 1 })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('link_stats')
        .insert({ link_id: linkId, click_date: date, click_count: 1 });
    }
  };
//  return (
//     <div className="flex flex-col items-center justify-center h-screen bg-white">
//       <div className="relative">
//         <div className="h-16 w-16 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
//       </div>
//       <h2 className="mt-6 text-xl font-bold text-slate-800">Opening App...</h2>
//       <p className="mt-2 text-slate-400 text-sm">You are being redirected safely</p>
//     </div>
//   );
 
if (isExpired) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-4 text-center">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-red-100 max-w-md">
          <div className="text-red-500 mb-4 text-5xl">⚠️</div>
          <h1 className="text-2xl font-black text-slate-800 mb-2">Link Expired</h1>
          <p className="text-slate-500 font-medium">
            This is a temporary link that has expired after 24 hours. 
            Upgrade to <span className="text-indigo-600 font-bold">PRO</span> to create permanent links.
          </p>
          <a href="/pricing" className="mt-6 inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Upgrade Now
          </a>
        </div>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="h-16 w-16 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
      <h2 className="mt-6 text-xl font-bold text-slate-800">Opening App...</h2>
    </div>
  );
}