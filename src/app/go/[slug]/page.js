

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
const [showManualButton, setShowManualButton] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [platforme, setPlatform] = useState(null);
  const [deeplinke, setDeepLink] = useState(null);
  const [original_urle, setUrl] = useState(null);

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
//       const { original_url: originalUrl, platform } = linkData;
//       const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//       const isAndroid = /android/i.test(userAgent);
//       const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
// setPlatform(platform);
//       let deepLink = originalUrl;

//       // تنسيق الروابط العميقة بناءً على المنصة ونظام التشغيل
//       if (platform === 'youtube') {
//         const videoId = originalUrl.split('v=')[1]?.split('&')[0] || originalUrl.split('/').pop();
//         deepLink = isIOS ? `youtube://www.youtube.com/watch?v=${videoId}` : `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
//       } 
//       else if (platform === 'amazon') {
//         // تحويل الرابط لصيغة تفهمها أمازون مباشرة
//         const cleanUrl = originalUrl.replace(/https?:\/\//, "");
//         deepLink = isIOS ? `com.amazon.mobile.shopping://www.${cleanUrl}` : `intent://${cleanUrl}#Intent;scheme=https;package=com.amazon.mp3;end`;
//       }
//       else if (platform === 'instagram') {
//         deepLink = `instagram://details?id=${originalUrl}`;
//       }

//       // محاولة فتح التطبيق
//       if (deepLink !== originalUrl) {
//         window.location.href = deepLink;
//       }

//       // Fallback: إذا لم يفتح التطبيق خلال ثانية ونصف، افتح المتصفح العادي
//       const timeout = setTimeout(() => {
//         window.location.replace(originalUrl);
//       }, 1200);

//       // تنظيف التايم آوت في حال خرج المستخدم من المتصفح
//       window.onblur = () => clearTimeout(timeout);

// 1. انتظر قليلاً لضمان ظهور التصميم الأنيق للمستخدم أولاً
await new Promise(resolve => setTimeout(resolve, 800));

// 2. منطق التحويل (Deep Linking)
const { original_url: originalUrl, platform } = linkData;
setPlatform(platform); // لنعرف أي لوجو نظهر في الواجهة

const userAgent = navigator.userAgent || navigator.vendor || window.opera;
const isAndroid = /android/i.test(userAgent);
const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

let deepLink = originalUrl;
setDeepLink(deepLink);
setUrl(originalUrl);

if (platform === 'youtube') {
  const videoId = originalUrl.split('v=')[1]?.split('&')[0] || originalUrl.split('/').pop();
  deepLink = isAndroid 
    ? `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`
    : `youtube://www.youtube.com/watch?v=${videoId}`;
} else if (platform === 'amazon') {
  const cleanUrl = originalUrl.replace(/https?:\/\//, "");
  deepLink = isIOS 
    ? `com.amazon.mobile.shopping://www.${cleanUrl}` 
    : `intent://${cleanUrl}#Intent;scheme=https;package=com.amazon.mp3;end`;
}

// 3. محاولة الفتح التلقائي
window.location.href = deepLink;

// 4. بدلاً من الذهاب للمتصفح فوراً، ننتظر 2.5 ثانية
// إذا لم يغادر المستخدم الصفحة (بسبب Alert إنستغرام أو Cancel)، نظهر الزر اليدوي
const timeout = setTimeout(() => {
  setShowManualButton(true); // تأكد من تعريف هذه الحالة بـ useState(false)
}, 2500);

// إذا نجح التحويل وخرج المستخدم من المتصفح، نلغي التايم آوت
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

  // return (
  //   <div className="flex flex-col items-center justify-center h-screen bg-white">
  //     <div className="h-15 w-15 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
  //     {/* <h2 className="mt-6 text-xl font-bold text-slate-800">Opening ...</h2> */}
  //   </div>
  // );
return (
  <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-4">
    <div className="flex flex-col items-center max-w-sm w-full px-6 py-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
      
      {/* أيقونة المنصة مع Spinner */}
      <div className="relative mb-8">
        <div className="h-20 w-20 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden shadow-inner">
          {platforme === 'amazon' ? (
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" className="w-12 h-12" />
          ) : platforme === 'youtube' ? (
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" className="w-12 h-12" />
          ) : (
            <div className="h-10 w-10 bg-indigo-100 rounded-full animate-pulse" />
          )}
        </div>
        {!showManualButton && (
          <div className="absolute -inset-2 border-2 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
        )}
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-2">
        {showManualButton ? "Action Required" : "Opening Official App"}
      </h2>
      
      <p className="text-slate-500 text-center text-sm mb-8">
        {showManualButton 
          ? "If the app didn't open automatically, please use the button below."
          : `Connecting you safely to ${platforme || 'the app'}...`}
      </p>

      {/* التبديل بين شريط التحميل والزر اليدوي */}
      {showManualButton ? (
        <div className="w-full space-y-4">
          <button 
            onClick={() => window.location.href = deeplinke }
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Open in App
          </button>
          
          <button 
            onClick={() => window.location.replace(original_urle)}
            className="w-full py-3 text-slate-400 text-sm font-medium"
          >
            Continue in Browser
          </button>
        </div>
      ) : (
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 animate-[loading_1.5s_ease-in-out_infinite] w-1/2 rounded-full"></div>
        </div>
      )}

      <p className="mt-8 text-[10px] text-slate-300 uppercase tracking-widest font-bold">
        Secure Redirect
      </p>
    </div>

    <style jsx>{`
      @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(250%); }
      }
    `}</style>
  </div>
);
}