

'use client'
import React, { useState, useEffect } from 'react';
import { 
  Zap, CheckCircle, ArrowRight, 
  BarChart3,  ShieldCheck, Mail, Menu,  Plus,X,
  Minus, Sun, Moon ,Layers,TrendingUp,Clock
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isDark, setIsDark] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

  const [authChecked, setAuthChecked] = useState(false);
const router = useRouter();
  // دالة تفعيل الوضع الليلي
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

useEffect(() => {
    const checkUser = async () => {
      // الحصول على الجلسة الحالية من Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      // إذا كانت الجلسة موجودة (المستخدم مسجل دخول)
      if (session) {

        router.push('/dashboard');
setTimeout(() => {
                          setAuthChecked(true);

}, 800);
      }else{
              setAuthChecked(true);

      }

    };


    checkUser();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
const faqs = [
  {
    q: "Why do I need a Dynamic Link?",
    a: "Standard links are static; once they're set, you can't change them. Our Dynamic Links give you total control, allowing you to change your destination URL across 100+ accounts instantly from one dashboard without ever needing to update your bios manually."
  },
  {
    q: "Can I try the dashboard for free?",
    a: "Yes! You can create a free 'Speed-Test' link to experience the redirection performance yourself. This allows you to verify our lightning-fast redirection technology and dashboard management before upgrading to a Pro plan."
  },
  {
    q: "How does this protect my TikTok accounts?",
    a: "Every time you log in to change a link manually, you risk triggering TikTok's security flags. Our tool allows you to update your link destinations 'Server-Side'. This means you can pivot your traffic to new offers without ever touching the TikTok app, keeping your accounts safe from activity-based bans."
  },
  {
    q: "Can I update 100+ accounts at the same time?",
    a: "Absolutely. Our Bulk Redirect Engine is built for scale. You can select all your links and change their destination URL in one click. It takes less than a second to update your entire automation empire."
  },
  {
    q: "Is it a one-time payment or monthly?",
    a: "Get full access to all Pro features, including Bulk Updates and Analytics, for just $4.50/month. Scale your automation empire with our most powerful tools."
  },
  {
    q: "Which platforms does our tool support?",
    a: "Our service is optimized for maximum performance on TikTok and supports all major social and affiliate platforms including Amazon, YouTube, Instagram, and Facebook, allowing you to redirect traffic anywhere you want."
  },
];

  return (
    // هذا هو الغلاف الرئيسي الذي يحدد الوضع
  <>
    {authChecked ?   <div className={`${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-700 transition-colors duration-300">
        
        {/* --- Navigation --- */}
 <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-1 shrink-0">
          <img src='log.webp' className='w-[45px] sm:w-[55px] rounded-full' alt='Direop Logo'/>
          <span className="text-[18px] sm:text-[22px] font-bold tracking-[1px] text-slate-900 dark:text-white translate-x-[-9px]">
            ireop
          </span>
        </div>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-400">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
                    <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-110 transition-all"
          >
            {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-slate-600" />}
          </button>

          <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-700 dark:text-slate-200">
            Sign In
          </Link>
          
          <Link href="/login?signup=true" className="bg-slate-900 dark:bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            Get Started
          </Link>

          {/* Hamburger Button (Visible only on Mobile) */}
          <button onClick={toggleMenu} className="md:hidden p-2 text-slate-700 dark:text-slate-300 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (Animated) */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col p-6 gap-4 font-semibold text-slate-600 dark:text-slate-300">
          <a href="#features" onClick={toggleMenu} className="hover:text-indigo-600 py-2 border-b border-slate-50 dark:border-slate-900">Features</a>
          <a href="#how-it-works" onClick={toggleMenu} className="hover:text-indigo-600 py-2 border-b border-slate-50 dark:border-slate-900">How it works</a>
          <a href="#pricing" onClick={toggleMenu} className="hover:text-indigo-600 py-2 border-b border-slate-50 dark:border-slate-900">Pricing</a>
                  <a href="#faq" onClick={toggleMenu} className="hover:text-indigo-600 py-2 border-b border-slate-50 dark:border-slate-900">FAQ</a>

          <Link href="/login" onClick={toggleMenu} className="text-indigo-600 pt-2">Sign In</Link>
        </div>
      </div>
    </nav>

        {/* --- Hero Section --- */}
        <section className="relative pt-40 pb-20 px-4 overflow-hidden">
          {/* --- الطبقة الزرقاء / الداكنة الخلفية --- */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            {/* 1. Grid Pattern - Dark mode adjusted */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] opacity-40"></div>
            
            {/* 2. Glow Shadow - Dark mode adjusted to dark blue */}
            <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[120%] h-[1000px] bg-[radial-gradient(circle_at_50%_0%,#eef2ff_0%,#f8fafc_40%,transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,#0f172a_0%,#020617_40%,transparent_70%)] opacity-100"></div>
            
            {/* 3. Center Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-100/40 dark:bg-indigo-900/20 rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-5xl mx-auto text-center relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 text-indigo-700 dark:text-indigo-400 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Stop wasting hours on manual updates
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-[900] text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
       Manage Hundreds of TikTok Links with     
              <span className="text-indigo-600 dark:text-indigo-400 relative pl-[8px] inline-block">
 One Click               {/* Decoration Line */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-indigo-200 dark:text-indigo-900" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-semibold">
Stop wasting hours on manual updates. Redirect 100+ TikTok accounts instantly from one dashboard. Track real-time clicks and switch to high-paying offers in seconds. Scale your automation empire smarter, faster, and safer.           </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
              <Link href="/login" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2">
                Start for Free <ArrowRight size={20} />
              </Link>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-sm bg-slate-100/50 dark:bg-slate-800/50 px-5 py-3 rounded-xl border border-slate-200/50 dark:border-slate-800">
                <CheckCircle size={19} className="text-indigo-500" /> No credit card required
              </div>
            </div>

            {/* Mockup Preview */}
            <div className="mt-20 relative max-w-4xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-[2.6rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              
              <div className="relative rounded-[2.5rem] border-[8px] border-slate-900/5 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 overflow-hidden shadow-2xl">
                <div className="bg-white dark:bg-slate-950 p-4 flex items-center gap-2 border-b dark:border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="bg-slate-50 md:mb-[25px] dark:bg-slate-900 text-[10px] text-slate-400 px-10 py-1.5 rounded-md mx-auto font-mono border border-slate-100 dark:border-slate-800">
                    direop.com/go/your-smart-link
                  </div>
                </div>
                <div className=" md:h-96 bg-white dark:bg-slate-900 flex items-center justify-center italic text-slate-300 dark:text-slate-700">
                  <div className="flex flex-col items-center gap-4">
                    {/* <div className="w-16 h-16 hidden sm:flex bg-slate-50 dark:bg-slate-800 rounded-full  items-center justify-center">
                      <Zap className="text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700" />
                    </div> */}
                    <img src='dash.webp' alt='Dashboard Preview' className='w-full max-sm:w-[97%]  rounded-[8px] '/>
                    <p className="text-sm font-bold text-slate-200 dark:text-slate-700 uppercase tracking-widest">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- How It Works --- */}
      
        <section id="how-it-works" className="py-24 px-6 border-y border-slate-50 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-extrabold mb-4 text-slate-900 dark:text-white uppercase tracking-tight">Scale in 3 Simple Steps</h2>
      <p className="text-slate-500 dark:text-slate-400">The ultimate workflow for TikTok Automation experts.</p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8 relative">
      {[
        { 
          icon: <Layers size={28}/>, 
          title: "1. Deploy Your Links", 
          desc: "Create your unique smart-links and place them across your TikTok accounts. Set them up once, and never touch the app again.", 
          color: "indigo" 
        },
        { 
          icon: <Zap size={28}/>, 
          title: "2. Bulk Update Instantly", 
          desc: "Offer expired? Use our Bulk Redirect tool to change the destination of 100+ accounts in one click from your dashboard.", 
          color: "violet" 
        },
        { 
          icon: <TrendingUp size={28}/>, 
          title: "3. Track & Optimize", 
          desc: "Monitor live clicks and performance metrics. Instantly pivot your traffic to the highest-paying offers to maximize ROI.", 
          color: "emerald" 
        }
      ].map((step, i) => (
        <div key={i} className="bg-white dark:bg-slate-950 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative z-10 text-center">
          <div className={`w-14 h-14 bg-${step.color}-50 dark:bg-${step.color}-900/20 text-${step.color}-600 dark:text-${step.color}-400 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
            {step.icon}
          </div>
          <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{step.title}</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* --- Pricing --- */}
        <section id="pricing" className="py-24 px-6 bg-white dark:bg-slate-950">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">Simple, Transparent Pricing</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Everything you need to boost your conversion rates.</p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="relative p-8 rounded-[2.5rem] border-2 border-indigo-600 bg-white dark:bg-slate-900 shadow-2xl shadow-indigo-100 dark:shadow-none">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center text-slate-900 dark:text-white">Lifetime Pro</h3>
              {/* <div className="flex items-center justify-center gap-1 mb-6">
                <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$4.50</span>
                <span className="text-slate-400 dark:text-slate-500 font-bold">/mo</span>
              </div> */}
              <div className="flex items-center justify-center mb-6">
  <span className="text-[20px] font-bold text-slate-400 mr-1">$</span>
  <span className="text-[40px] font-[950] text-slate-900 dark:text-white tracking-tighter">4.50</span>
  <span className="text-slate-400 dark:text-slate-500 font-bold text-lg self-end mb-1 ml-1">/mo</span>
</div>
              <ul className="space-y-4 mb-8">
                {[
  'Unlimited Dynamic Links', 
  'Bulk Destination Links Updates', 
  'Real-Time Click Insights', 
  'Instant Redirects',
  'Anti-Ban Account Protection', 
  'Custom Slug Names',
  'Priority 24/7 Support'
].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium text-sm">
                    <CheckCircle size={18} className="text-indigo-600 dark:text-indigo-400" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/login?signup=true" className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                Get Started Now
              </Link>
            </div>
          </div>
        </section>

        {/* --- Features --- */}
     
{/* 
        <section id="features" className="py-24 px-6 bg-white dark:bg-slate-950">
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-4xl font-extrabold mb-6 leading-tight text-slate-900 dark:text-white">
          Built for <br/>
          <span className="text-indigo-600 dark:text-indigo-400">High-Performance Sellers</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium italic">
          "Every extra step in the customer journey is an opportunity for them to leave."
        </p>
        
        <div className="space-y-6">
          {[
            {
              title: "Instant App-Switching", 
              desc: "Automatically detects the device and opens Amazon, YouTube, or Instagram directly in the app.", 
              icon: <Smartphone size={20}/>
            },
             {
              title: "Time-Based Analytics", 
              desc: "Track your performance with precision. Monitor clicks for today, the last 7 days, or total clicks since creation.", 
              icon: <BarChart3 size={20}/>
            },
            // {
            //   title: "Zero-Latency Redirects", 
            //   desc: "Our servers are optimized for speed, ensuring your customers never stare at a blank loading screen.", 
            //   icon: <Zap size={20}/>
            // },
            
            {
              title: "Conversion Protection", 
              desc: "By bypassing the browser login wall, you keep the purchase intent high and reduce drop-offs , Our servers are optimized for speed, ensuring your customers never stare at a blank loading screen", 
              icon: <KeyRound size={20}/>
            }
          ].map((f, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
              <div className="text-indigo-600 dark:text-indigo-400 mt-1 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg h-fit">{f.icon}</div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{f.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        <div className="relative z-10">
          <div className="mb-6 inline-block bg-indigo-500/20 py-1 px-4 rounded-full border border-indigo-400/30">
            <span className="text-xs font-bold uppercase tracking-widest">Psychology of Conversion</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-snug">
            "The 'Login Wall' is a conversion killer. 80% of users will abandon their purchase if asked to log in on a mobile browser."
          </h3>
          
          <hr className="border-white/10 mb-6" />
          
          <div className="flex items-start gap-4">
            <div className="text-indigo-400">
              <Zap size={32} fill="currentColor" className="opacity-50" />
            </div>
            <p className="text-indigo-100/80 leading-relaxed italic">
              When a user clicks your link, they expect to buy or watch. Asking for a password creates <strong>Cognitive Friction</strong>—their brain signals 'work' instead of 'reward', causing them to close the tab instantly.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section> */}

<section id="features" className="py-24 px-6 bg-white dark:bg-slate-950">
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-4xl font-extrabold mb-6 leading-tight text-slate-900 dark:text-white">
          Built for <br/>
          <span className="text-indigo-600 dark:text-indigo-400">Automation Empires</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium italic">
          "The biggest risk to your automation business isn't the algorithm—it's the manual repetitive work that flags your accounts."
        </p>
        
        <div className="space-y-6">
          {[
            {
              title: "Anti-Ban Protection", 
              desc: "Avoid shadowbans by eliminating frequent logins. Update your link destinations server-side without ever touching your TikTok app.", 
              icon: <ShieldCheck size={20}/>
            },
             {
              title: "Bulk Redirect Engine", 
              desc: "Switch the destination of 10, 50, or 100 links simultaneously. Pivot to winning offers in one click as soon as they go viral.", 
              icon: <Zap size={20}/>
            },
            {
              title: "Advanced Performance Tracking", 
              desc: "Get deep insights into your traffic. Monitor which accounts are performing best with daily, weekly, and all-time click data.", 
              icon: <BarChart3 size={20}/>
            }
          ].map((f, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
              <div className="text-indigo-600 dark:text-indigo-400 mt-1 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg h-fit">{f.icon}</div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{f.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        <div className="relative z-10">
          <div className="mb-6 inline-block bg-indigo-500/20 py-1 px-4 rounded-full border border-indigo-400/30">
            <span className="text-xs font-bold uppercase tracking-widest">Scaling Psychology</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-snug">
            "Automation is not about doing more work; it's about removing the manual friction that limits your growth."
          </h3>
          
          <hr className="border-white/10 mb-6" />
          
          <div className="flex items-start gap-4">
            <div className="text-indigo-400">
              <Clock size={32} fill="currentColor" className="opacity-50" />
            </div>
            <p className="text-indigo-100/80 leading-relaxed italic">
              Every time you log in to change a link, you're not just wasting 5 minutes—you're exposing your accounts to <strong>Activity Pattern Tracking</strong>. Real scaling happens when you control your traffic externally, keeping your accounts safe and your time free.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>




        {/* --- FAQ --- */}
        <section id='faq' className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-12 tracking-tight uppercase text-slate-900 dark:text-white">Questions? We have answers</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    <span className="font-bold text-slate-900 dark:text-white">{faq.q}</span>
                    {activeFaq === i ? <Minus size={18} className="text-indigo-600 dark:text-indigo-400"/> : <Plus size={18} className="text-slate-400 dark:text-slate-600"/>}
                  </button>
                  {activeFaq === i && (
                    <div className="p-6 pt-0 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-50 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

   <section className="py-24 px-6">
  <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-900 to-slate-900 p-10 md:p-20 text-center shadow-2xl border border-white/10">
    
    {/* العناصر الجمالية (نفس الـ Blur الموجود في القسم السابق) */}
    <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

    <div className="relative z-10">
      {/* Badge صغير فوق العنوان */}
      <div className="mb-6 inline-block bg-indigo-500/20 py-1.5 px-4 rounded-full border border-indigo-400/20">
        <span className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em]">Ready to take control?</span>
      </div>

      <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
        Scale Your Empire <br className="hidden md:block"/> Without the Manual Hassle.
      </h2>
      
      <p className="text-indigo-100/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
        Join the high-performance players who manage their entire network with speed and security. Start for free and dominate your niche.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
        <Link 
          href="/login?signup=true" 
          className="w-full sm:w-auto px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all transform hover:scale-105 shadow-xl shadow-indigo-900/20 uppercase tracking-widest text-xs"
        >
          Get Started For Free
        </Link>
        
        <Link 
          href="#pricing" 
          className="w-full sm:w-auto px-12 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black rounded-2xl transition-all backdrop-blur-md uppercase tracking-widest text-xs"
        >
          View Pro Pricing
        </Link>
      </div>

      <div className="mt-10 flex items-center justify-center gap-2 opacity-50">
        <div className="h-1 w-1 bg-emerald-400 rounded-full animate-pulse"></div>
        <p className="text-white text-[10px] font-bold uppercase tracking-widest">
          Join 50+ early access members today
        </p>
      </div>
    </div>
  </div>
</section>

        {/* --- Footer --- */}
        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
              <img src='log.webp' className=' w-[55px] rounded-full ' alt='Direop Logo'/>
                <span className="text-[22px] font-bold tracking-[1px]  text-slate-900 dark:text-white translate-x-[-14px]">ireop</span>
              </div>
              <p className="text-slate-400 dark:text-slate-500 max-w-sm text-sm">
Empowering TikTok automation and link management with seamless bulk control since 2024.                </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-900 dark:text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500 font-medium">
                <li><Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-slate-400 dark:text-slate-500">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-slate-400 dark:text-slate-500">Privacy Policy</Link></li>
                <li><Link href="/refunds" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-slate-400 dark:text-slate-500">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-900 dark:text-white">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-500 font-medium">
                <li><a href="mailto:support@deeplinker.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-2 text-slate-400 dark:text-slate-500">
                  <Mail size={16} /> direopsupp@gmail.com
                </a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 text-center border-t border-slate-200/50 dark:border-slate-900 pt-8 text-slate-400 dark:text-slate-600 text-xs font-medium">
            © 2026 Direop. All rights reserved.
          </div>
        </footer>
      </div>
    </div> :   <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="h-15 w-15 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
      {/* <h2 className="mt-6 text-xl font-bold text-slate-800">Opening ...</h2> */}
    </div> }
  </>
  
  );
}


















// 'use client'
// import React, { useState } from 'react';
// import { 
//   Zap, CheckCircle, Smartphone, ArrowRight, 
//   BarChart3, Globe, ShieldCheck, Mail, 
//   Plus, Minus, MousePointerClick, Share2 
// } from 'lucide-react';
// import Link from 'next/link';

// export default function LandingPage() {
//   const [activeFaq, setActiveFaq] = useState(null);

//   const faqs = [
//     {
//       q: "Why do I need a Deep Link?",
//       a: "Standard links open in the 'In-App Browser' which logs users out of their accounts. Deep links bypass this, opening the native app (YouTube, Instagram) where users are already logged in, increasing engagement by up to 40%."
//     },
//     {
//       q: "Is it a one-time payment or monthly?",
//       a: "It's a one-time payment of $4.50. You get lifetime access to the Pro features with no recurring monthly fees."
//     },
//     {
//       q: "Does it work with all social media platforms?",
//       a: "Yes! DeepLinker supports all major platforms including YouTube, Instagram, TikTok, Threads, and LinkedIn."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      
//       {/* --- Subtle Background Elements --- */}
//       <div className="absolute top-0 left-0 right-0 h-[1000px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-transparent -z-10" />

//       {/* --- Navigation --- */}
//       <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
//         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
//               <Zap size={22} className="text-white fill-white" />
//             </div>
//             <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">DeepLinker</span>
//           </div>
          
//           <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
//             <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it works</a>
//             <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
//             <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
//           </div>

//           <div className="flex items-center gap-3">
//             <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-indigo-600 px-4 transition-colors">Sign In</Link>
//             <Link href="/login?signup=true" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-100">
//               Get Started
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* --- Hero Section --- */}
//       <section className="pt-44 pb-24 px-6 relative">
//         <div className="max-w-5xl mx-auto text-center">
//           <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-xs font-bold mb-8 shadow-sm">
//             <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
//             Trusted by 5,000+ Content Creators
//           </div>
          
//           <h1 className="text-5xl md:text-7xl font-[900] text-slate-900 mb-8 tracking-tight leading-[1.05]">
//             Turn Your Links Into <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Engagement Engines</span>
//           </h1>
          
//           <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
//             Standard links kill conversion. DeepLinker forces your links to open directly in the app, skipping the login wall and keeping your followers engaged.
//           </p>

//           <div className="flex flex-col sm:row items-center justify-center gap-4">
//             <Link href="/login" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all shadow-2xl flex items-center justify-center gap-2 group">
//               Create Your First Link <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* --- How It Works --- */}
//       <section id="how-it-works" className="py-24 px-6 border-y border-slate-50 bg-slate-50/50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-extrabold mb-4 text-slate-900 uppercase tracking-tight">3 Simple Steps</h2>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8 relative">
//             <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative z-10 text-center">
//               <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><MousePointerClick size={28}/></div>
//               <h4 className="font-bold text-lg mb-2 text-slate-900">1. Paste Your Link</h4>
//               <p className="text-slate-500 text-sm leading-relaxed">Copy any URL from YouTube, Instagram, or TikTok and paste it into DeepLinker.</p>
//             </div>
//             <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative z-10 text-center">
//               <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Zap size={28}/></div>
//               <h4 className="font-bold text-lg mb-2 text-slate-900">2. We Deepen It</h4>
//               <p className="text-slate-500 text-sm leading-relaxed">Our engine wraps your URL in a smart-logic that bypasses mobile browsers.</p>
//             </div>
//             <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative z-10 text-center">
//               <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Share2 size={28}/></div>
//               <h4 className="font-bold text-lg mb-2 text-slate-900">3. Share & Grow</h4>
//               <p className="text-slate-500 text-sm leading-relaxed">Post your new link. Users will land directly in the native app, logged in and ready.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- Features Grid --- */}
//       <section id="features" className="py-24 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div>
//               <h2 className="text-4xl font-extrabold mb-6 leading-tight">Advanced Features for <br/><span className="text-indigo-600">Marketing Ninjas</span></h2>
//               <p className="text-slate-500 mb-8 font-medium">Why settle for basic short links when you can have smart ones?</p>
//               <div className="space-y-6">
//                 {[
//                   {title: "Custom Slugs", desc: "Personalize your links (e.g., link.com/yourname)", icon: <Globe size={20}/>},
//                   {title: "Smart Analytics", desc: "Know your audience's device, country, and platform", icon: <BarChart3 size={20}/>},
//                   {title: "Platform Detection", desc: "Automatically opens the right app for iOS or Android", icon: <Smartphone size={20}/>}
//                 ].map((f, i) => (
//                   <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
//                     <div className="text-indigo-600 mt-1">{f.icon}</div>
//                     <div>
//                       <h4 className="font-bold text-slate-900">{f.title}</h4>
//                       <p className="text-slate-500 text-sm">{f.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
//                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
//                <h3 className="text-2xl font-bold mb-4 italic">"I gained 20% more subscribers in one month just by switching my bio link to DeepLinker."</h3>
//                <div className="flex items-center gap-3">
//                  <div className="w-10 h-10 rounded-full bg-white/20" />
//                  <div>
//                    <p className="font-bold">Sara Jenkins</p>
//                    <p className="text-indigo-200 text-sm">Tech Influencer</p>
//                  </div>
//                </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- FAQ Section --- */}
//       <section className="py-24 px-6 bg-slate-50/50">
//         <div className="max-w-3xl mx-auto">
//           <h2 className="text-3xl font-extrabold text-center mb-12 tracking-tight uppercase">Questions? We have answers</h2>
//           <div className="space-y-4">
//             {faqs.map((faq, i) => (
//               <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
//                 <button 
//                   onClick={() => setActiveFaq(activeFaq === i ? null : i)}
//                   className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
//                 >
//                   <span className="font-bold text-slate-900">{faq.q}</span>
//                   {activeFaq === i ? <Minus size={18} className="text-indigo-600"/> : <Plus size={18} className="text-slate-400"/>}
//                 </button>
//                 {activeFaq === i && (
//                   <div className="p-6 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-50">
//                     {faq.a}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- Final CTA --- */}
//       <section className="py-24 px-6">
//         <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
//           <Zap size={100} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
//           <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Ready to fix your conversion?</h2>
//           <p className="text-slate-400 mb-10 max-w-xl mx-auto font-medium">Join thousands of creators who are already using DeepLinker to grow their social presence.</p>
//           <Link href="/login" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/20">
//             Get Lifetime Pro Now
//           </Link>
//         </div>
//       </section>

//       {/* --- Footer (Same as before but cleaned up) --- */}
//       <footer className="bg-white border-t border-slate-100 pt-16 pb-8 px-6">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
//           <div className="col-span-2 space-y-4">
//             <div className="flex items-center gap-2">
//               <Zap size={22} className="text-indigo-600 fill-indigo-600" />
//               <span className="text-xl font-black tracking-tight">DeepLinker</span>
//             </div>
//             <p className="text-slate-400 max-w-sm text-sm font-medium leading-relaxed">DeepLinker is the easiest way to bypass the mobile login wall and increase engagement for social media links.</p>
//           </div>
//           <div>
//             <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-900">Policies</h4>
//             <ul className="space-y-4 text-xs font-bold text-slate-400">
//               <li><Link href="/terms" className="hover:text-indigo-600 transition-colors uppercase">Terms of Service</Link></li>
//               <li><Link href="/privacy" className="hover:text-indigo-600 transition-colors uppercase">Privacy Policy</Link></li>
//               <li><Link href="/refunds" className="hover:text-indigo-600 transition-colors uppercase">Refund Policy</Link></li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-900">Support</h4>
//             <div className="text-xs font-bold text-slate-400">
//               <a href="mailto:support@deeplinker.com" className="hover:text-indigo-600 flex items-center gap-2">
//                 <Mail size={16} /> support@deeplinker.com
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="max-w-7xl mx-auto text-center border-t border-slate-100 pt-8 text-slate-400 text-[10px] font-black uppercase tracking-widest">
//           © 2026 DeepLinker — Built for creators
//         </div>
//       </footer>
//     </div>
//   );
// }

