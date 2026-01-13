
'use client';
import React, { useEffect, useState } from 'react';
import { 
  Zap, 
  LayoutGrid, 
  Link as LinkIcon, 

  Settings, 
 
  Copy,
  Check,
  Smartphone,
  Youtube,
  ShoppingBag,
  Instagram,
  Globe,
  Music2,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  
} from 'lucide-react';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';



const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('web'); // amazon, youtube, instagram, web
  const [generatedLink, setGeneratedLink] = useState('');
const [copied, setCopied] = useState(false);
const [userId, setUserId] = useState(null);
const [userEmail, setUserEmail] = useState('');
const [loading, setLoading] = useState(false);
const [isSubscribed, setSubs] = useState(true);
const [customSlug, setCustomSlug] = useState('');
const [slugError, setSlugError] = useState('');
const [host, setHost] = useState('');
const [Subs, setHandleSubs] = useState(false);
const [subscriptionPlan, setSubscriptionPlan] = useState(null);
const [subscriptionEndsAt, setSubscriptionEndsAt] = useState(null);
const router = useRouter();
const [isLimitReached, setIsLimitReached] = useState(false);
const copyToClipboard = async () => {
  if (!generatedLink) return;

  try {
    // الطريقة الحديثة للنسخ في المتصفحات
    await navigator.clipboard.writeText(generatedLink);
    
    // إظهار تأثير بصري للمستخدم لمدة ثانيتين
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy!", err);
  }
};

const fetchDataUser = async () => {

    // 1. جلب بيانات المستخدم الحالي
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // alert("Please login first");
       Swal.fire({
  icon: "error",
  title: "⚠️ Please login first",
  text: "You can create up to 10 links per 20 hours. Please wait before creating more.",
});
      return;
    }

    setUserId(user.id);
    setUserEmail(user.email);

    const { data: profile, error: profileError } = await supabase
  .from('profiles')
  .select('is_subscribed, subscription_plan, subscription_ends_at')
  .eq('id', user.id)
  .maybeSingle(); 
  const now = new Date();
  const expiryDate = new Date(profile.subscription_ends_at);
    // const isPro = profile.is_subscribed === true;
    setSubs(profile.is_subscribed === true && expiryDate > now );
    setSubscriptionPlan(profile.subscription_plan);
    setSubscriptionEndsAt(profile.subscription_ends_at);
if(profile.is_subscribed === true  && expiryDate > now){
      const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from('links')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
  .gt('created_at', new Date(Date.now() - (20 * 60 * 60 * 1000)).toISOString()); // آخر ساعة

  // إذا وصل لـ 10 روابط وهو ليس PRO
  if (count > 9) {
    setIsLimitReached(true);
  }
}else{
   const { count } = await supabase
    .from('links')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

   if (count > 1) {
    setIsLimitReached(true);
  }
}



}
useEffect(() => {
      document.title = "Dashboard";

fetchDataUser()
  setHost(window.location.host);


}, []);

const checkUserSubscription = async () => {
   const { data: profile, error: profileError } = await supabase
  .from('profiles')
  .select('is_subscribed, subscription_plan, subscription_ends_at')
  .eq('id', userId)
  .maybeSingle(); 
    // const isPro = profile.is_subscribed === true;
      const now = new Date();
  const expiryDate = new Date(profile.subscription_ends_at);
    setSubs(profile.is_subscribed === true && expiryDate > now );
      setSubscriptionPlan(profile.subscription_plan);
    setSubscriptionEndsAt(profile.subscription_ends_at);
    if(profile.is_subscribed === true &&  expiryDate > now &&  isLimitReached  ){
      setIsLimitReached(false);
            console.log("testtttttttttttttttttttttt");

    } 
}

useEffect(() => {
  const handleFocus = () => {
    // لا تفحص إلا إذا كان المستخدم مسجلاً أصلاً ولم يصبح PRO بعد
    if (userId && !isSubscribed) {
      console.log("Welcome back! Checking payment status...");
  
      setTimeout(async()=>{
        checkUserSubscription()
      },1800)
      
      // دالة تجلب بيانات المستخدم من Supabase

    }
  };

  window.addEventListener('focus', handleFocus);
  return () => window.removeEventListener('focus', handleFocus);
}, [userId, isSubscribed,isLimitReached]); // يعتمد على هذه القيم ليكون ذكياً


  // منطق التعرف التلقائي على المنصة
useEffect(() => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('amazon') || lowerUrl.includes('amzn')) setPlatform('amazon');
    else if (lowerUrl.includes('youtube') || lowerUrl.includes('youtu.be')) setPlatform('youtube');
    else if (lowerUrl.includes('instagram')) setPlatform('instagram');
    else if (lowerUrl.includes('tiktok.com')) setPlatform('tiktok'); // السطر الجديد
    else if (lowerUrl !== '') setPlatform('web');
    else setPlatform('none');
  }, [url]);

// تأكد من استيراد السوبابيس في أعلى الملف
// import { supabase } from '@/lib/supabase';

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("Erreur lors de la déconnexion:", error.message);
  } else {
    // Rediriger vers la page de login
    window.location.href = '/login';
  }
};



  // أيقونة المنصة المتغيرة



const handleGenerate = async (e) => {
e.preventDefault();
  setLoading(true);
setSlugError('');
  try {
    // مثال بسيط داخل دالة إنشاء الرابط


    let slug = customSlug.trim();
    // const slug = Math.random().toString(36).substring(2, 8);

  // 1. إذا اختار المستخدم slug مخصص، نتحقق من توفره
  if (slug) {
    const { data: existing } = await supabase
      .from('links')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (existing) {
      setSlugError('This custom link is already taken. Try another one , (Add numbers or symbols!)');
      return;
    }
  } else {
    // 2. إذا لم يختر، نولد واحد عشوائي
    slug = Math.random().toString(36).substring(2, 8);; 
  }
    // 1. جلب بيانات المستخدم الحالي
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // alert("Please login first");
        Swal.fire({
  icon: "error",
  title: "⚠️ Please login first",
  text: "You can create up to 10 links per 20 hours. Please wait before creating more.",
});
      return;
    }
const { count, error } = await supabase
  .from('links')
  .select('*', { count: 'exact', head: true })
  .eq('user_id', user.id)
  .gt('created_at', new Date(Date.now() - (20 * 60 * 60 * 1000)).toISOString()); // آخر ساعة

if (count > 10) { // حد أقصى 10 رابط في الساعة للمجاني
  return      Swal.fire({
  icon: "error",
  title: "⚠️ Rate Limit Exceeded",
  text: "You can create up to 10 links per 24 hours. Please wait before creating more.",
});
  // alert("⚠️ Rate Limit Exceeded: You can create up to 10 links per 20 hours. Please wait before creating more.");
   
}

    setUserId(user.id);
    setUserEmail(user.email);


    // استخدم .maybeSingle() بدلاً من .single() لتجنب رمي خطأ إذا كان السجل مفقوداً
const { data: profile, error: profileError } = await supabase
  .from('profiles')
  .select('is_subscribed, subscription_plan')
  .eq('id', user.id)
  .maybeSingle(); 

// إذا لم يوجد بروفايل، نفترض أنه مستخدم مجاني افتراضياً
const isSubscribed = profile?.is_subscribed || false;
const plan = profile?.subscription_plan || 'free';

console.log("User Status:", { isSubscribed, plan });


    // 3. جلب عدد الروابط التي أنشأها المستخدم مسبقاً
    const { count: linksCount, error: countError } = await supabase
      .from('links')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (countError) throw countError;

    // 4. التحقق من الصلاحيات (Logic)
    const isPro = profile.is_subscribed === true;
    setSubs(isPro);
    // إذا لم يكن مشتركاً وحاول إنشاء أكثر من رابط واحد
    if (!isPro && linksCount >= 3) {

      // alert("⚠️ Free Plan Limit: You can only create 1 link. Please upgrade to Pro for unlimited access!");
      Swal.fire({
  icon: "error",
  title: "⚠️ Free Plan Limit",
  text: "You can only create 3 link. Please upgrade to Pro for unlimited access!",
});
          setIsLimitReached(true);

      setLoading(false);
      return; 
    }

    // 5. توليد السلوج (Slug)

    // 6. تحديد تاريخ الانتهاء (إذا كان مجاني ينتهي بعد 24 ساعة)
    // ملاحظة: يجب أن تضيف عمود expires_at في جدول links في سوبابيس إذا أردت تفعيل ميزة الـ 24 ساعة
    const expiresAt = !isPro 
      ? new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() 
      : null;

    // 7. إدخال الرابط في قاعدة البيانات
    const { data, error: insertError } = await supabase
      .from('links')
      .insert([
        { 
          slug, 
          original_url: url, 
          platform, 
          clicks: 0,
          user_id: user.id,
          expires_at: expiresAt // اختياري: إذا أضفت العمود في SQL
        }
      ]);

    if (insertError) throw insertError;
    // window.location.origin تجلب دومين موقعك تلقائياً (localhost أو الدومين الحقيقي)
    const finalLink = `${window.location.origin}/go/${slug}`;
    
    // 5. تحديث حالة الرابط المنشأ ليظهر في الواجهة
    setGeneratedLink(finalLink);
    // alert(isPro ? "Link generated successfully!" : "Temporary link generated (Valid for 24h)");
    isPro ?     Swal.fire({
  title: "Link generated successfully!",
  icon: "success"
})
 : 
   Swal.fire({
  title: "Temporary link generated (Valid for 48h)",
  icon: "success"
})
 

    // تحديث الواجهة أو جلب الروابط مجدداً
    // fetchDashboardData(); 

  } catch (error) {
    console.error("Error:", error.message);
    // alert("An error occurred while generating the link.");
    Swal.fire({
  icon: "error",
  title: "An error occurred while generating the link.",
  text: "Please wait before trying again.",
});
  } finally {
    setLoading(false);
  }
};

  const PlatformIcon = () => {
    switch (platform) {
      case 'amazon': return <ShoppingBag className="text-orange-500" size={24} />;
      case 'youtube': return <Youtube className="text-red-500" size={24} />;
      case 'instagram': return <Instagram className="text-pink-500" size={24} />;
      case 'tiktok': return <Music2 className="text-black" size={24} />; // أيقونة تيك توك
      case 'web': return <Globe className="text-indigo-500" size={24} />;
      default: return <Smartphone className="text-slate-400" size={24} />;
    }
  };






//  const supabase = createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   );

   const handleSubscribe = async () => {
  

    // // رابط Lemon Squeezy الخاص بك
    // const baseUrl = "https://directly2004.lemonsqueezy.com/checkout/buy/201f7501-e446-46f4-8843-11df3bb73444";
    
    // // إضافة البيانات المخصصة للرابط
    // const checkoutUrl = `${baseUrl}?checkout[custom][user_id]=${userId}&checkout[email]=${userEmail}&preview=1`;

    // // الانتقال لصفحة الدفع
  router.push('/upgrade')
    // setHandleSubs(true);
    
    
  };







  

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
{/* {Subs && <div className=' absolute left-[46%] bg-white  rounded-[8px] max-md:left-[20%] top-[40%]  p-[45px] z-[10] '> 
  < X size={30} onClick={()=> setHandleSubs(false)} className=' absolute top-[10px] bg-gray-300 p-[5px] rounded-full cursor-pointer right-[15px] '/>
       <PayPalScriptProvider options={{ 
      "client-id": "ARGPHh-iy1nZ_KusDoY2BOt65fMFQJrr84apNWJFi-9tcWTFa8PNfNhhKjsxu1KSw71NYfIkH-h0kKew", // هذا الـ Client ID الخاص بك
      vault: true, 
      intent: "subscription" 
    }}>
      <PayPalButtons
        style={{ shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe' }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: 'P-0PN22317719958939NFSLTTA' // تأكد من وضع الـ Plan ID الحقيقي هنا
          });
        }}
        onApprove={async (data, actions) => {
          // بدلاً من تحديث Supabase هنا، نرسل البيانات للـ API الخاص بنا
          const response = await fetch('/api/paypal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              subscriptionID: data.subscriptionID,
              userId: userId,
              userEmail: userEmail
            }),
          });

          if (response.ok) {
            alert("Success! You are now a PRO member.");
            window.location.reload(); 
          }
        }}
      />
    </PayPalScriptProvider></div>} */}
      {/* --- Sidebar --- */}
      {/* Burger Menu Button (Mobile) */}
      {!sidebarOpen && (
        <button 
          className="md:hidden absolute top-4 left-4 z-50 text-slate-600 p-2 bg-white shadow-md rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}


      <aside className={`w-64 pb-[20px] bg-white border-r border-slate-200 fixed md:relative h-full z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col`}>
        <div className="p-6 flex items-center justify-between text-indigo-600 font-bold text-2xl tracking-tight">
          <div className="flex items-center gap-2">
              <img src='log.webp' className=' w-[50px] rounded-full ' alt='Direop Logo'/>
                <span className="text-[23px] font-bold tracking-[2px]  text-slate-900 dark:text-white translate-x-[-14px]">ireop</span>
              </div>
          <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <NavItem icon={<LayoutGrid size={20} />} href="/dashboard" label="Dashboard" active />
          <NavItem icon={<LinkIcon size={20} />} href="/links" label="My Analytics Links" />
          {/* <NavItem icon={<BarChart3 size={20} />} label="Analytics" /> */}
          <NavItem icon={<Settings size={20} />} href="/settings" label="Settings" />
        </nav>

    {!isSubscribed ?     <div className="p-4">
  <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-4 text-white shadow-lg shadow-indigo-200">
    <div className="flex justify-between mb-[11px] items-start">
      <p className="text-xs opacity-80 font-medium italic">Pro Plan</p>
      {/* أيقونة تاج صغيرة تعطي شعوراً بالتميز */}
      <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">Best Value</span>
    </div>
    
    <p className="font-bold text-sm mb-3">Unlimited Active Links</p>
    
    <button onClick={handleSubscribe} className="w-full bg-white text-indigo-600 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm">
      Upgrade for $4.5/mo
    </button>

    {/* قسم الأمان المضاف */}
    <div className="mt-3 flex flex-col items-center justify-center gap-1.5 opacity-90">
     
      <p className="text-[12px] flex items-center gap-[5px] font-medium text-white/90">
       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
        Secure SSL Payment
      </p>
        <p className="text-[12px] font-medium text-white/90">
 Powered by PayPal      </p>
    </div>
  </div>
</div> : <div className="p-4">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-4 text-white shadow-lg shadow-indigo-200">
            <p className="text-xs opacity-80 mb-1 font-medium italic">Pro Plan</p>
            <p className="font-bold text-sm mb-3">Unlimited Active Links</p>
              <div className={`px-4 py-1.5 rounded-xl text-[11px] w-max font-black uppercase tracking-wider flex items-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100`}>
                     <ShieldCheck size={17}/> Active Subscription
                    
                    </div>
          </div>
        </div>}
        <button
  onClick={handleLogout}
  className="flex items-center w-[90%] gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold transition-all duration-200 border mx-auto border-red-100"
>
  <LogOut size={18} />
  Logout
</button>
      </aside> 

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 max-md:justify-end flex items-center justify-between px-8">
          {/* <h2 className='max-md:hidden flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-yellow-200 '>Welcome {userEmail.split("@")[0]}</h2> */}

<h2 className="max-md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all rounded-xl font-medium text-slate-700">
  {/* أيقونة مستخدم صغيرة تعطي طابعاً احترافياً */}
  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> 
  
  <span className="text-slate-500 text-sm">Welcome,</span>
  <span className="text-indigo-600 font-bold tracking-tight">
    {userEmail.split("@")[0]}
  </span>
</h2>          {/* <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <span className="hidden sm:inline">Pages /</span> 
            <span className="text-slate-900 font-semibold italic underline decoration-indigo-300">Dashboard</span>
          </div> */}
          
          <div className="flex items-center gap-4">
     {!isSubscribed ?  <button  onClick={handleSubscribe}  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-95">
      <Zap size={18} className="fill-current text-yellow-300" />
      <span>Upgrade Now</span>
    </button> :  <div className="flex items-center gap-2 mt-1">
              <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
               PRO PLAN
              </span>
            </div>
         }  
            <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-[17px]">{userEmail ? userEmail[0].toUpperCase() : ''}</div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-8">
          {subscriptionPlan === 'free' && isSubscribed && new Date() < new Date(subscriptionEndsAt) && <p className=' text-amber-600 text-center p-[5px] '>Your Pro Subscription will end on {subscriptionEndsAt.split('T')[0]} , You can renew your subscription on {subscriptionEndsAt.split('T')[0]}</p> }
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-4">Redirect 100+ TikTok Bio accounts instantly 🚀</h1>
            <p className="text-slate-600 text-[18px] text-lg">
              {isSubscribed ? 'Stop wasting hours on manual updates. Redirect 100+ TikTok Bio accounts instantly from one dashboard. Create unlimited links—up to 9 new links every 24 hours maximum. ' : "Stop wasting hours on manual updates. Redirect 100+ TikTok Bio accounts instantly from one dashboard 🚀 Upgrade to PRO with secure payment for unlimited link creation! ⚡ Full control—cancel your subscription anytime from your settings. 🛡️"}
            </p>
            {!isSubscribed ? <p className='mt-[23px] lg:w-[77%] mx-auto bg-amber-200 text-[13px] font-semibold p-[10px] rounded-[5px] '>Free Plan: Create 3 smart dynanmic link, valid for 48 hours only. Perfect for testing performance before upgrading to unlimited, permanent links.</p> 
            :
            <p className='mt-[23px] lg:w-[77%] mx-auto bg-amber-200 text-[15px] font-semibold p-[10px] rounded-[5px] '>PRO Plan: Unlimited permanent links  ( Daily creation limit: 10 links ). </p>
            }
          </div>

          {/* Main Action Card */}
          <form onSubmit={(e)=>{
            handleGenerate(e);
          }} className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 ml-1 italic">Destination URL</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={url}
                      required
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste Amazon, YouTube, or Instagram link..."
                      className="w-full pl-5 pr-14 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-lg placeholder:text-slate-400 font-medium"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 p-2 transition-all duration-300">
                      <PlatformIcon />
                    </div>
                  </div>
                </div>
                



                <div className="space-y-2">
  <label className="block text-sm font-bold text-slate-700 mb-3 ml-1 italic">
    Custom Alias (Optional)
  </label>
  <div className="relative flex items-center">
    <div className="absolute inset-y-0  pl-4 flex items-center pointer-events-none text-slate-500 text-[15px] font-bold">
      direop.com/go/
    </div>
    <input 
      type="text"
      value={customSlug}
      // onChange={(e) => { setCustomSlug(e.target.value.toLowerCase().replace(/[\s#?]+/g, '-')); setSlugError(''); }}
      onChange={(e) => {
  const value = e.target.value.toLowerCase();
  
  // 1. استبدال المسافات والهاشتاج بشرطة
  let cleanedValue = value.replace(/[\s#]+/g, '-');
  
  // 2. إزالة أي رمز ليس (حرف، رقم، شرطة، نقطة، شرطة سفلية)
  // الرمز ^ داخل [] يعني "كل شيء ما عدا"
  cleanedValue = cleanedValue.replace(/[^a-z0-9-._@]/g, '');

  setCustomSlug(cleanedValue);
  setSlugError('');
}}
      placeholder="my-awesome-link"
      className={`w-full pl-[131px] text-[15px] pr-4 py-4 bg-slate-50 border ${slugError ? 'border-red-500' : 'border-slate-100'} rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700 transition-all`}
    />
  </div>
  {slugError && <p className="text-red-500 text-[12px] font-bold ml-2">{slugError}</p>}
</div>

                {/* <button 
                  onClick={handleGenerate}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 text-lg"
                >
                  Generate Smart Link <Zap size={20} className="fill-white" />
                </button> */}
                <button 
  // onClick={handleGenerate}
 
  disabled={isLimitReached || loading}
  className={`w-full font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg shadow-lg 
    ${isLimitReached 
      ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' // حالة تخطي الحد
      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200' // الحالة العادية
    }`}
>
  {loading ? (
    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : isLimitReached ? (
    <>{isSubscribed ? 'Daily Limit Reached' : 'Free Plan Reached'} <ShieldAlert size={20} /></>
  ) : (
    <>Generate Smart Link <Zap size={20} className="fill-white" /></>
  )}
</button>

{/* رسالة توضيحية تظهر فقط عند تخطي الحد */}
{isLimitReached && (
  <p className="text-center text-red-500 text-xs font-bold mt-4 animate-pulse">
   {isSubscribed ? "You've reached your link creation limit for today. Please wait before creating more links." : "Free plan limit reached. Upgrade to Pro for unlimited Active links!"}
  </p>
)}
              </div>
            </div>

            {/* Generated Link Display (Result) */}
            {generatedLink && (
              <div className="bg-indigo-50 border-2 border-indigo-100 p-6 rounded-[2rem] animate-in fade-in slide-in-from-top-4 duration-500">
                <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3 ml-1 text-center">Your Smart Link is Ready</p>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-indigo-200 shadow-sm">
                  <span className="flex-1 font-semibold text-indigo-900 truncate">{generatedLink}</span>
                  <button 
                    onClick={copyToClipboard}
                    type='button'
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
<InfoCard 
  color="red" 
  title="Pro Tip" 
  desc="Switching your link destination externally prevents TikTok activity flags and keeps your accounts safe from shadowbans." 
/>            <InfoCard color="indigo" title="Need Help?" desc="Contact our 24/7 support for enterprise solutions." />
          </div>

        </div>
      </main>
          {Subs && <div className=' absolute bg-gray-700  opacity-[0.3] z-[9]  h-[100%] w-[100%] '></div>}

    </div>
  );
};

// --- Helper Components ---
const NavItem = ({href, icon, label, active = false }) => (
  <Link href={href} className={`flex items-center  gap-3 px-4 py-3 rounded-xl font-medium transition-all ${active ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
    {icon} <span>{label}</span>
  </Link>
);

const InfoCard = ({ color, title, desc }) => (
  <div className={`flex gap-4 p-4 bg-${color}-50 rounded-2xl `}>
    <div className={`w-10 h-10 bg-${color}-100 rounded-xl flex items-center justify-center text-${color}-600 shrink-0 font-black italic`}>!</div>
    <div>
      <h4 className={`font-bold text-${color}-900 text-sm`}>{title}</h4>
      <p className={`text-${color}-700 text-xs leading-relaxed mt-1`}>{desc}     { title == "Need Help?" && <a className=' text-[12px] font-bold ' href="mailto:direopsupp@gmail.com">Email : direopsupp@gmail.com </a>}
</p>
    </div>
    <br/>

  </div>
);

export default Dashboard;




//sandbox

{/* <div id="paypal-button-container-P-0PN22317719958939NFSLTTA"></div>
<script src="https://www.paypal.com/sdk/js?client-id=ARGPHh-iy1nZ_KusDoY2BOt65fMFQJrr84apNWJFi-9tcWTFa8PNfNhhKjsxu1KSw71NYfIkH-h0kKew&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
<script>
  paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          plan_id: 'P-0PN22317719958939NFSLTTA'
        });
      },
      onApprove: function(data, actions) {
        alert(data.subscriptionID); 
      }
  }).render('#paypal-button-container-P-0PN22317719958939NFSLTTA'); // Renders the PayPal button
</script> */}