

// 'use client';
// import { useEffect, use,useState } from 'react';
// import { supabase } from '@/lib/supabase';

// export default function RedirectPage({ params }) {
//   const unwrappedParams = use(params);
//   const slug = unwrappedParams.slug;
// // حالة لمعرفة هل الرابط منتهي أم لا
//   const [isExpired, setIsExpired] = useState(false);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     const performRedirect = async () => {
//       if (!slug) return;

//       // 1. جلب بيانات الرابط
//       // const { data: linkData, error: linkError } = await supabase
//       //   .from('links')
//       //   .select('id, original_url, platform, clicks')
//       //   .eq('slug', slug)
//       //   .single();


//         const { data: linkData , error: linkError  } = await supabase
//   .from('links')
//   .select('id, original_url, platform, clicks, expires_at')
//   .eq('slug', slug)
//   .single();


// // فحص هل الرابط منتهي الصلاحية
// if (linkData.expires_at && new Date(linkData.expires_at) < new Date()) {
//         setIsExpired(true); // نغير الحالة بدلاً من عمل return للـ UI
//         return;
//       }
//       if (linkError || !linkData) {
//         window.location.href = '/';
//         return;
//       }

//       // 2. تحديث الإحصائيات (العداد الإجمالي + إحصائيات اليوم)
//       // نستخدم Promise.all لتنفيذ العمليتين معاً بسرعة
//      // 2. تحديث الإحصائيات (العداد الإجمالي + إحصائيات اليوم)
// const today = new Date().toISOString().split('T')[0];

// try {
//   // أ. تحديث العداد الإجمالي في جدول links
//   await supabase
//     .from('links')
//     .update({ clicks: (linkData.clicks || 0) + 1 })
//     .eq('id', linkData.id);

//   // ب. استدعاء الدالة البرمجية لتحديث إحصائيات اليوم
//   const { error: rpcError } = await supabase.rpc('increment_click', { 
//       target_link_id: linkData.id, 
//       target_date: today 
//   });

//   // إذا فشلت الـ RPC (ربما لم يتم إنشاؤها في SQL بعد)، نستخدم الحل اليدوي
//   if (rpcError) {
//     console.warn("RPC failed, falling back to manual upsert:", rpcError.message);
//     await handleManualUpsert(linkData.id, today);
//   }
// } catch (err) {
//   console.error("Error updating stats:", err);
// }

//       // 3. منطق التحويل (Deep Linking)
//       const { original_url: originalUrl, platform } = linkData;
//       let deepLink = originalUrl;

//       const protocols = {
//         amazon: 'com.amazon.mobile.shopping://',
//         youtube: 'youtube://',
//         instagram: 'instagram://',
//         twitter: 'twitter://',
//       };

//       if (protocols[platform]) {
//         deepLink = originalUrl.replace(/https?:\/\//, protocols[platform]);
//       } else if (platform === 'tiktok') {
//         deepLink = `snssdk1128://webview?url=${encodeURIComponent(originalUrl)}`;
//       }

//       // 4. محاولة الفتح ومنع الكاش
//       const start = Date.now();
//       window.location.replace(deepLink); // استخدم replace لمنع الرجوع للخلف للرابط الوسيط

//       setTimeout(() => {
//         if (Date.now() - start < 2000) {
//           window.location.replace(originalUrl);
//         }
//       }, 1200);
//     };

//     performRedirect();
//   }, [slug]);

//   // دالة مساعدة للتعامل مع تحديث اليوم يدوياً (في حال عدم استخدام RPC)
  // const handleManualUpsert = async (linkId, date) => {
  //   const { data: existing } = await supabase
  //     .from('link_stats')
  //     .select('id, click_count')
  //     .eq('link_id', linkId)
  //     .eq('click_date', date)
  //     .single();

  //   if (existing) {
  //     await supabase
  //       .from('link_stats')
  //       .update({ click_count: existing.click_count + 1 })
  //       .eq('id', existing.id);
  //   } else {
  //     await supabase
  //       .from('link_stats')
  //       .insert({ link_id: linkId, click_date: date, click_count: 1 });
  //   }
  // };
// //  return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-white">
// //       <div className="relative">
// //         <div className="h-16 w-16 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
// //       </div>
// //       <h2 className="mt-6 text-xl font-bold text-slate-800">Opening App...</h2>
// //       <p className="mt-2 text-slate-400 text-sm">You are being redirected safely</p>
// //     </div>
// //   );
 
// if (isExpired) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-4 text-center">
//         <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-red-100 max-w-md">
//           <div className="text-red-500 mb-4 text-5xl">⚠️</div>
//           <h1 className="text-2xl font-black text-slate-800 mb-2">Link Expired</h1>
//           <p className="text-slate-500 font-medium">
//             This is a temporary link that has expired after 24 hours. 
//             Upgrade to <span className="text-indigo-600 font-bold">PRO</span> to create permanent links.
//           </p>
//           <a href="/pricing" className="mt-6 inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
//             Upgrade Now
//           </a>
//         </div>
//       </div>
//     );
//   }

//   if (error) return <div>{error}</div>;

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-white">
//       <div className="h-16 w-16 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
//       <h2 className="mt-6 text-xl font-bold text-slate-800">Opening App...</h2>
//     </div>
//   );
// }
'use client';
import { useEffect, use, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RedirectPage({ params }) {
  const unwrappedParams = use(params);
  const slug =  decodeURIComponent(unwrappedParams.slug);
;
  const [isExpired, setIsExpired] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performRedirect = async () => {
      if (!slug) return;

      // 1. جلب بيانات الرابط + بيانات المستخدم (Profile) في استعلام واحد
      const { data: linkData, error: linkError } = await supabase
        .from('links')
        .select(`
          id, 
          original_url, 
          platform, 
          clicks, 
          expires_at,
          user_id,
          profiles ( is_subscribed )
        `)
        .eq('slug', slug)
        .single();

      if (linkError || !linkData) {
        window.location.href = '/';
        return;
      }

      // المنطق المحدث: فحص صلاحية الرابط بناءً على حالة الاشتراك
      const ownerIsSubscribed = linkData.profiles?.is_subscribed || false;
      const expirationDate = linkData.expires_at ? new Date(linkData.expires_at) : null;
      const now = new Date();

      // الشرط: إذا لم يكن PRO وكان هناك تاريخ انتهاء، وتحقق انتهاء الوقت
      if (!ownerIsSubscribed && expirationDate && expirationDate < now) {
        setIsExpired(true);
        return;
      }else if(!ownerIsSubscribed && expirationDate === null){
         setIsExpired(true);
        return;
      }

      // 2. تحديث الإحصائيات (العداد الإجمالي + إحصائيات اليوم)
      const today = new Date().toISOString().split('T')[0];
      try {
        await supabase
          .from('links')
          .update({ clicks: (linkData.clicks || 0) + 1 })
          .eq('id', linkData.id);

        const { error: rpcError } = await supabase.rpc('increment_click', { 
            target_link_id: linkData.id, 
            target_date: today 
        });

        if (rpcError) await handleManualUpsert(linkData.id, today);
      } catch (err) {
        console.error("Error updating stats:", err);
      }

      // 3. منطق التحويل (Deep Linking)
      // const { original_url: originalUrl, platform } = linkData;
      // let deepLink = originalUrl;

      // const protocols = {
      //   amazon: 'com.amazon.mobile.shopping://',
      //   youtube: 'youtube://',
      //   instagram: 'instagram://',
      //   twitter: 'twitter://',
      // };

      // if (protocols[platform]) {
      //   deepLink = originalUrl.replace(/https?:\/\//, protocols[platform]);
      // } else if (platform === 'tiktok') {
      //   deepLink = `snssdk1128://webview?url=${encodeURIComponent(originalUrl)}`;
      // }


      // window.location.replace(originalUrl);


      // 3. منطق التحويل الاحترافي (Deep Linking Logic)
      const { original_url: originalUrl, platform } = linkData;
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isAndroid = /android/i.test(userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

      let deepLink = originalUrl;

      // تنسيق الروابط العميقة بناءً على المنصة ونظام التشغيل
      if (platform === 'youtube') {
        const videoId = originalUrl.split('v=')[1]?.split('&')[0] || originalUrl.split('/').pop();
        deepLink = isIOS ? `youtube://www.youtube.com/watch?v=${videoId}` : `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
      } 
      else if (platform === 'amazon') {
        // تحويل الرابط لصيغة تفهمها أمازون مباشرة
        const cleanUrl = originalUrl.replace(/https?:\/\//, "");
        deepLink = isIOS ? `com.amazon.mobile.shopping://www.${cleanUrl}` : `intent://${cleanUrl}#Intent;scheme=https;package=com.amazon.mp3;end`;
      }
      else if (platform === 'instagram') {
        deepLink = `instagram://details?id=${originalUrl}`;
      }

      // محاولة فتح التطبيق
      if (deepLink !== originalUrl) {
        window.location.href = deepLink;
      }

      // Fallback: إذا لم يفتح التطبيق خلال ثانية ونصف، افتح المتصفح العادي
      const timeout = setTimeout(() => {
        window.location.replace(originalUrl);
      }, 1200);

      // تنظيف التايم آوت في حال خرج المستخدم من المتصفح
      window.onblur = () => clearTimeout(timeout);

      // setTimeout(() => {
      //   if (Date.now() - start < 2000) {
      //     window.location.replace(originalUrl);
      //   }
      // },10);
    };

    performRedirect();
  }, [slug]);

  // دالة المساعدة (بقية الكود كما هو...)
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

  // واجهة الـ Expired
  if (isExpired) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-4 text-center">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-red-100 max-w-md">
          <div className="text-red-500 mb-4 text-5xl">⚠️</div>
          <h1 className="text-2xl font-black text-slate-800 mb-2">Link Expired</h1>
       
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="h-15 w-15 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
      {/* <h2 className="mt-6 text-xl font-bold text-slate-800">Opening ...</h2> */}
    </div>
  );
}