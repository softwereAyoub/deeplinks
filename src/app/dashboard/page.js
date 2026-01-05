
'use client';
import React, { useEffect, useState } from 'react';
import { 
  Zap, 
  LayoutGrid, 
  Link as LinkIcon, 
  BarChart3, 
  Settings, 
  Plus, 
  Copy,
  Check,
  Smartphone,
  Youtube,
  ShoppingBag,
  Instagram,
  Globe,
  Music2,
  LogOut
} from 'lucide-react';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';




const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('web'); // amazon, youtube, instagram, web
  const [generatedLink, setGeneratedLink] = useState('');
const [copied, setCopied] = useState(false);
const [userId, setUserId] = useState(null);
const [userEmail, setUserEmail] = useState('');
const [loading, setLoading] = useState(false);
const [paddle, setPaddle] = useState(null);
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
      alert("Please login first");
      return;
    }

    setUserId(user.id);
    setUserEmail(user.email);
}
useEffect(() => {
fetchDataUser()
}, []);
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

// const handleGenerate = async () => {
//   // 1. التحقق من أن الحقل ليس فارغاً
//   if (!url || url.trim() === '') {
//     alert("Please paste a valid URL first!");
//     return;
//   }
  

//   try {
//     // 2. توليد كود فريد (Slug) قصير (مثلاً: 6 رموز)
//     // يمكنك استخدام Math.random أو مكتبة nanoid
//     const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     alert("You must be logged in!");
//     window.location.href = '/login';
//     return;
//   }
//     const slug = Math.random().toString(36).substring(2, 8);

//     // 3. إرسال البيانات إلى جدول 'links' في Supabase
//     const { data, error } = await supabase
//       .from('links')
//       .insert([
//         { 
//           slug: slug, 
//           original_url: url, 
//           platform: platform,
//           user_id:user.id, // المنصة التي تعرف عليها الكود تلقائياً
//           clicks: 0 
//         }
//       ])
//       .select(); // جلب البيانات بعد الإدخال للتأكد

//     if (error) throw error;

//     // 4. إنشاء الرابط النهائي الذي سيستخدمه الزبون
//     // window.location.origin تجلب دومين موقعك تلقائياً (localhost أو الدومين الحقيقي)
//     const finalLink = `${window.location.origin}/go/${slug}`;
    
//     // 5. تحديث حالة الرابط المنشأ ليظهر في الواجهة
//     setGeneratedLink(finalLink);
    
//     console.log("Link saved successfully:", data);

//   } catch (error) {
//     console.error("Error saving to Supabase:", error.message);
//     alert("Failed to generate link. Please check your database connection.");
//   }
// };

  // أيقونة المنصة المتغيرة



const handleGenerate = async () => {
  setLoading(true);

  try {
    // 1. جلب بيانات المستخدم الحالي
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please login first");
      return;
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
    
    // إذا لم يكن مشتركاً وحاول إنشاء أكثر من رابط واحد
    if (!isPro && linksCount >= 1) {
      alert("⚠️ Free Plan Limit: You can only create 1 link. Please upgrade to Pro for unlimited access!");
      setLoading(false);
      return; 
    }

    // 5. توليد السلوج (Slug)
    const slug = Math.random().toString(36).substring(2, 8);

    // 6. تحديد تاريخ الانتهاء (إذا كان مجاني ينتهي بعد 24 ساعة)
    // ملاحظة: يجب أن تضيف عمود expires_at في جدول links في سوبابيس إذا أردت تفعيل ميزة الـ 24 ساعة
    const expiresAt = !isPro 
      ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() 
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
    alert(isPro ? "Link generated successfully!" : "Temporary link generated (Valid for 24h)");
    // تحديث الواجهة أو جلب الروابط مجدداً
    // fetchDashboardData(); 

  } catch (error) {
    console.error("Error:", error.message);
    alert("An error occurred while generating the link.");
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







function UpgradeButton({ userId, userEmail }) {
  





  if (typeof window !== 'undefined' && window.Paddle) {
      window.Paddle.Initialize({ 
        token: 'test_98ee8848025f8371d2bc08c1caa', // استبدله بـ Vendor ID الخاص بك
        environment: 'sandbox' 
      });
      setPaddle(window.Paddle);
    }
  

  const handleCheckout = () => {
    if (!paddle) return;

    paddle.Checkout.open({
      items: [{
        priceId: 'pro_01ke6yes6cqg1hyh24n3hffcqb', // الـ Price ID الخاص بك
        quantity: 1
      }],
      customData: {
        userId: userId // لربط الدفع بالمستخدم في Supabase
      },
      customer: {
        email: userEmail
      }
    });
handleCheckout()
}
}









  

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      
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

      <aside className={`w-64 bg-white border-r border-slate-200 fixed md:relative h-full z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col`}>
        <div className="p-6 flex items-center justify-between text-indigo-600 font-bold text-2xl tracking-tight">
          <div className="flex items-center gap-2">
            <Zap className="fill-indigo-600" />
            <span>Directly</span>
          </div>
          <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" active />
          <NavItem icon={<LinkIcon size={20} />} label="My Links" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-4 text-white shadow-lg shadow-indigo-200">
            <p className="text-xs opacity-80 mb-1 font-medium italic">Pro Access</p>
            <p className="font-bold text-sm mb-3">Unlimited Deep Links</p>
            <button onClick={()=>UpgradeButton(userId,userEmail)} className="w-full bg-white text-indigo-600 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
              Upgrade for $4/mo
            </button>
          </div>
        </div>
        <button
  onClick={handleLogout}
  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold transition-all duration-200 border border-red-100"
>
  <LogOut size={18} />
  Logout
</button>
      </aside> 

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <span className="hidden sm:inline">Pages /</span> 
            <span className="text-slate-900 font-semibold italic underline decoration-indigo-300">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-50 rounded-full transition text-slate-400">
              <Plus size={22} />
            </button>
            <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-xs">JD</div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Create a Deep Link 🚀</h1>
            <p className="text-slate-500 text-lg">Instant app-opening links for your social media bio.</p>
          </div>

          {/* Main Action Card */}
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 ml-1 italic">Destination URL</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste Amazon, YouTube, or Instagram link..."
                      className="w-full pl-5 pr-14 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-lg placeholder:text-slate-400 font-medium"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 p-2 transition-all duration-300">
                      <PlatformIcon />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 text-lg"
                >
                  Generate Smart Link <Zap size={20} className="fill-white" />
                </button>
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
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <InfoCard color="amber" title="Pro Tip" desc="Deep links can increase conversion by 300% on TikTok." />
            <InfoCard color="indigo" title="Need Help?" desc="Contact our 24/7 support for enterprise solutions." />
          </div>

        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---
const NavItem = ({ icon, label, active = false }) => (
  <a href={label == 'My Links' ? '/links' : '/dashboard'} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${active ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
    {icon} <span>{label}</span>
  </a>
);

const InfoCard = ({ color, title, desc }) => (
  <div className={`flex gap-4 p-4 bg-${color}-50 rounded-2xl border border-${color}-100`}>
    <div className={`w-10 h-10 bg-${color}-100 rounded-xl flex items-center justify-center text-${color}-600 shrink-0 font-black italic`}>!</div>
    <div>
      <h4 className={`font-bold text-${color}-900 text-sm`}>{title}</h4>
      <p className={`text-${color}-700 text-xs leading-relaxed mt-1`}>{desc}</p>
    </div>
  </div>
);

export default Dashboard;