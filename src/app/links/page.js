

// 'use client';
// import { useState, useEffect } from 'react';
// import { supabase } from '@/lib/supabase';
// import { 
//   BarChart3, MousePointer2, Link2, Plus, 
//   ExternalLink, Copy, CheckCircle2, TrendingUp, Calendar, History
// } from 'lucide-react';

// export default function Links() {
//   const [links, setLinks] = useState([]);
//   const [statsSummary, setStatsSummary] = useState({ today: 0, total: 0, week: 0 });
//   const [loading, setLoading] = useState(true);
//   const [copiedId, setCopiedId] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) { window.location.href = '/login'; return; }

//     const today = new Date().toISOString().split('T')[0];
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//     const dateLimit = sevenDaysAgo.toISOString().split('T')[0];

//     // جلب الروابط مع كل سجلات الإحصائيات المرتبطة بها
//     const { data: linksData, error } = await supabase
//       .from('links')
//       .select(`
//         *,
//         link_stats (click_count, click_date)
//       `)
//       .eq('user_id', user.id)
//       .order('created_at', { ascending: false });

//     if (!error && linksData) {
//       let grandToday = 0;
//       let grandTotal = 0;
//       let grandWeek = 0;

//       const processedLinks = linksData.map(link => {
//         let totalClicks = 0;
//         let clicksToday = 0;
//         let clicksLastWeek = 0;

//         link.link_stats?.forEach(stat => {
//           totalClicks += stat.click_count;
//           if (stat.click_date === today) clicksToday += stat.click_count;
//           if (stat.click_date >= dateLimit) clicksLastWeek += stat.click_count;
//         });

//         grandToday += clicksToday;
//         grandTotal += totalClicks;
//         grandWeek += clicksLastWeek;

//         return { ...link, totalClicks, clicksToday, clicksLastWeek };
//       });

//       setLinks(processedLinks);
//       setStatsSummary({ today: grandToday, total: grandTotal, week: grandWeek });
//     }
//     setLoading(false);
//   };

//   const copyToClipboard = (slug, id) => {
//     const fullUrl = `${window.location.origin}/go/${slug}`;
//     navigator.clipboard.writeText(fullUrl);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 2000);
//   };

//   if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-12">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Stats Cards */}
        // <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        //   <StatCard label="Total Clicks" value={statsSummary.total} icon={<MousePointer2 />} color="indigo" />
        //   <StatCard label="Last 7 Days" value={statsSummary.week} icon={<History />} color="blue" />
        //   <StatCard label="Clicks Today" value={statsSummary.today} icon={<TrendingUp />} color="emerald" />
        // </div>

//         {/* Links Table */}
//         <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50/50">
//               <tr>
//                 <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Link Info</th>
//                 <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Performance</th>
//                 <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {links.map((link) => (
//                 <tr key={link.id} className="hover:bg-slate-50/30 transition-all group">
//                   <td className="px-6 py-5">
//                     <div className="flex flex-col gap-1">
//                       <span className="text-[10px] font-bold text-slate-400 uppercase">Original URL</span>
//                       <span className="text-slate-600 font-medium text-xs truncate max-w-[250px]">{link.original_url}</span>
//                       <span className="text-[10px] font-bold text-slate-400 uppercase mt-2">Short Link</span>
//                       <span className="text-indigo-600 font-bold text-sm truncate">{window.location.origin}/go/{link.slug}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="flex items-center gap-6">
//                       <div className="flex flex-col">
//                         <span className="text-[9px] font-bold text-slate-400 uppercase">Today</span>
//                         <span className="text-sm font-black text-emerald-600">+{link.clicksToday}</span>
//                       </div>
//                       <div className="flex flex-col border-l border-slate-100 pl-4">
//                         <span className="text-[9px] font-bold text-slate-400 uppercase">7 Days</span>
//                         <span className="text-sm font-black text-blue-600">{link.clicksLastWeek}</span>
//                       </div>
//                       <div className="flex flex-col border-l border-slate-100 pl-4">
//                         <span className="text-[9px] font-bold text-slate-400 uppercase">Total</span>
//                         <span className="text-sm font-black text-slate-800">{link.totalClicks}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="flex items-center gap-2">
//                       <button onClick={() => copyToClipboard(link.slug, link.id)} className="p-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
//                         {copiedId === link.id ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
//                       </button>
//                       <a href={`/go/${link.slug}`} target="_blank" className="p-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
//                         <ExternalLink size={18} />
//                       </a>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ label, value, icon, color }) {
//   const bg = color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600';
//   return (
//     <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
//       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bg}`}>{icon}</div>
//       <div>
//         <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
//         <span className="text-2xl font-black text-slate-800">{value}</span>
//       </div>
//     </div>
//   );
// }


























// 'use client';
// import { useState, useEffect } from 'react';
// import { supabase } from '@/lib/supabase';
// import { 
//   BarChart3, MousePointer2, Link2, Plus, 
//   ExternalLink, Copy, CheckCircle2, TrendingUp, History, Globe
// } from 'lucide-react';

// export default function Dashboard() {
//   const [links, setLinks] = useState([]);
//   const [statsSummary, setStatsSummary] = useState({ today: 0, total: 0, week: 0 });
//   const [loading, setLoading] = useState(true);
//   const [copiedId, setCopiedId] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) { window.location.href = '/login'; return; }

//     const today = new Date().toISOString().split('T')[0];
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//     const dateLimit = sevenDaysAgo.toISOString().split('T')[0];

//     const { data: linksData, error } = await supabase
//       .from('links')
//       .select(`*, link_stats (click_count, click_date)`)
//       .eq('user_id', user.id)
//       .order('created_at', { ascending: false });

//     if (!error && linksData) {
//       let grandToday = 0, grandTotal = 0, grandWeek = 0;

//       const processedLinks = linksData.map(link => {
//         let totalClicks = 0, clicksToday = 0, clicksLastWeek = 0;
//         link.link_stats?.forEach(stat => {
//           totalClicks += stat.click_count;
//           if (stat.click_date === today) clicksToday += stat.click_count;
//           if (stat.click_date >= dateLimit) clicksLastWeek += stat.click_count;
//         });
//         grandToday += clicksToday; grandTotal += totalClicks; grandWeek += clicksLastWeek;
//         return { ...link, totalClicks, clicksToday, clicksLastWeek };
//       });

//       setLinks(processedLinks);
//       setStatsSummary({ today: grandToday, total: grandTotal, week: grandWeek });
//     }
//     setLoading(false);
//   };

//   const copyToClipboard = (slug, id) => {
//     const fullUrl = `${window.location.origin}/go/${slug}`;
//     navigator.clipboard.writeText(fullUrl);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 2000);
//   };

//   if (loading) return (
//     <div className="flex h-screen items-center justify-center bg-white">
//       <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#FBFDFF] p-4 md:p-8 lg:p-12 font-sans">
//       <div className="max-w-6xl mx-auto">
        
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Analytics</h1>
//             <div className="flex items-center gap-2 mt-1">
//               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
//               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time tracking</span>
//             </div>
//           </div>
//           <button className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100 hover:scale-105 transition-transform">
//             <Plus size={24} />
//           </button>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
//           <StatCard label="Total" value={statsSummary.total} color="bg-indigo-600" />
//           <StatCard label="7 Days" value={statsSummary.week} color="bg-blue-500" />
//           <StatCard label="Today" value={statsSummary.today} color="bg-emerald-500" />
//         </div>

//         {/* Links Section */}
//         <div className="space-y-4">
//           <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Your Links</h3>
          
//           {/* Desktop Header - Hidden on Mobile */}
//           <div className="hidden md:grid grid-cols-12 px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
//             <div className="col-span-6">Destination & Short Link</div>
//             <div className="col-span-4">Performance Metrics</div>

//             <div className="col-span-2 text-right">Actions</div>
//           </div>

//           {/* Links List */}
//           <div className="space-y-3">
//             {links.map((link) => (
//               <div key={link.id} className="bg-white border border-slate-100 p-6 md:px-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
//                 <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
                  
//                   {/* Link Info */}
//                   <div className="md:col-span-6 space-y-2">
//                     <div className="flex items-center gap-2">
//                       <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Globe size={14}/></div>
//                       <span className="text-xs font-bold text-slate-400 truncate max-w-[200px] md:max-w-xs">{link.original_url}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
//                       <span className="text-sm font-black text-slate-800 break-all">{window.location.origin}/go/{link.slug}</span>
//                     </div>
//                   </div>

//                   {/* Stats */}
//                   <div className="md:col-span-4 flex items-center justify-between md:justify-start gap-8 border-t md:border-t-0 pt-4 md:pt-0">
//                     <DataPoint label="Today" value={`+${link.clicksToday}`} color="text-emerald-600" />
//                     <DataPoint label="7 Days" value={link.clicksLastWeek} color="text-blue-600" />
//                     <DataPoint label="Total" value={link.totalClicks} color="text-slate-800" />
//                   </div>

//                   {/* Actions */}
//                   <div className="md:col-span-2 flex justify-end gap-2">
//                     <button 
//                       onClick={() => copyToClipboard(link.slug, link.id)}
//                       className={`flex-1 md:flex-none flex items-center justify-center p-3 rounded-xl transition-all ${copiedId === link.id ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400 hover:text-indigo-600'}`}
//                     >
//                       {copiedId === link.id ? <CheckCircle2 size={18} /> : <Copy size={18} />}
//                     </button>
//                     <a href={`/go/${link.slug}`} target="_blank" className="flex-1 md:flex-none flex items-center justify-center p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
//                       <ExternalLink size={18} />
//                     </a>
//                   </div>

//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Sub-components for better organization
// function StatCard({ label, value, color }) {
//   return (
//     <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden relative">
//       <div className={`absolute top-0 left-0 w-1 h-full ${color}`}></div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{label}</p>
//       <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
//     </div>
//   );
// }

// function DataPoint({ label, value, color }) {
//   return (
//     <div className="flex flex-col">
//       <span className="text-[9px] font-black text-slate-300 uppercase mb-1 tracking-tighter">{label}</span>
//       <span className={`text-sm font-black ${color}`}>{value}</span>
//     </div>
//   );
// }










'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link'

import { 
  Plus, ExternalLink, Copy, CheckCircle2, Globe, ShieldCheck, ShieldAlert , TrendingUp, MousePointer2, History , 
ArrowBigLeft} from 'lucide-react';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [statsSummary, setStatsSummary] = useState({ today: 0, total: 0, week: 0 });
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = '/login'; return; }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_subscribed')
      .eq('id', user.id)
      .single();
    
    setIsSubscribed(profile?.is_subscribed || false);

    const today = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const dateLimit = sevenDaysAgo.toISOString().split('T')[0];

    const { data: linksData, error } = await supabase
      .from('links')
      .select(`*, link_stats (click_count, click_date)`)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && linksData) {
      let grandToday = 0, grandTotal = 0, grandWeek = 0;

      const processedLinks = linksData.map(link => {
        let totalClicks = 0, clicksToday = 0, clicksLastWeek = 0;
        link.link_stats?.forEach(stat => {
          totalClicks += stat.click_count;
          if (stat.click_date === today) clicksToday += stat.click_count;
          if (stat.click_date >= dateLimit) clicksLastWeek += stat.click_count;
        });

        // منطق الحالة: إذا كان مشتركاً فالرابط نشط دائماً، وإلا نفحص تاريخ الانتهاء
        const isExpired = (!profile?.is_subscribed && link.expires_at === null) || (!profile?.is_subscribed && link.expires_at && new Date(link.expires_at) < new Date());
        const status = isExpired ? 'Expired' : 'Active';

        grandToday += clicksToday; grandTotal += totalClicks; grandWeek += clicksLastWeek;
        return { ...link, totalClicks, clicksToday, clicksLastWeek, status };
      });

      setLinks(processedLinks);
      setStatsSummary({ today: grandToday, total: grandTotal, week: grandWeek });
    }
    setLoading(false);
  };

  const copyToClipboard = (slug, id) => {
    const fullUrl = `${window.location.origin}/go/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBFDFF] p-4 md:p-8 lg:p-12 lg:pt-[5px] font-sans">
        <Link href='/dashboard' className="p-2 my-[4px] inline-flex bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100 hover:scale-105 transition-transform">
            <ArrowBigLeft size={24} />
          </Link>
      <div className="max-w-6xl mx-auto">
        
        {/* Header (نفس الهيدر السابق) */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Analytics</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {isSubscribed ? 'PRO PLAN ACTIVE' : 'FREE PLAN'}
              </span>
            </div>
          </div>
          <Link href='/dashboard' className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100 hover:scale-105 transition-transform">
            <Plus size={24} />
          </Link>
           

        </div>
        <p className=' text-amber-600 font-medium text-[13px] mx-auto text-center  '>To see the latest data, refresh the page. </p>
                  <h3 className="text-sm font-black mb-4.25 text-slate-400 uppercase tracking-[0.2em] ml-2">All Clicks</h3>


        {/* Stats Grid (نفسه) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard label="Total Clicks" value={statsSummary.total} icon={<MousePointer2 />}  color="bg-indigo-600" />
          <StatCard label="Last 7 Days" value={statsSummary.week} icon={<History />} color="bg-blue-500" />
          <StatCard label="Clicks Today" value={statsSummary.today} icon={<TrendingUp />} color="bg-emerald-500" />
        </div>

           {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard label="Total Clicks" value={statsSummary.total} icon={<MousePointer2 />} color="indigo" />
          <StatCard label="Last 7 Days" value={statsSummary.week} icon={<History />} color="blue" />
          <StatCard label="Clicks Today" value={statsSummary.today} icon={<TrendingUp />} color="emerald" />
        </div> */}

        {/* Links Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Your Links</h3>
          
          {/* Desktop Header - تمت إضافة عمود Status */}
          <div className="hidden md:grid grid-cols-12 px-8 py-4 text-[12px] font-black text-slate-500 uppercase tracking-widest">
            <div className="col-span-4">Destination & Short Link</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-4 text-center">Performance Metrics (Clicks)</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="space-y-3">
            {links.map((link) => (
              <div key={link.id} className="bg-white border border-slate-100 p-6 md:px-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
                  
                  {/* Column 1: Link Info (4 cols) */}
                  {/* <div className="md:col-span-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-slate-50 rounded text-slate-400"><Globe size={12}/></div>
                      <span className="text-[10px] font-bold text-slate-400 truncate max-w-[150px]">{link.original_url}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-black break-all ${link.status === 'Active' ? 'text-slate-800' : 'text-slate-400'}`}>
                        {window.location.origin}/go/{link.slug}
                      </span>
                    </div>
                  </div> */}
                      <div className="md:col-span-4 space-y-2">
                     <div className="flex items-center gap-2">
                       <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Globe size={14}/></div>
                       <span className="text-xs font-bold text-slate-400 truncate max-w-[200px] md:max-w-xs">{link.original_url}</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                      <span className="text-sm font-black text-slate-800 break-all">{window.location.origin}/go/{link.slug}</span>
                    </div>
                 </div>

                  {/* Column 2: Status (2 cols) - العمود الجديد */}
                  <div className="md:col-span-2 flex flex-col items-center justify-start md:justify-center">
                    <div className={`px-4 py-1.5 rounded-xl text-[10px] w-max font-black uppercase tracking-wider flex items-center gap-1.5 ${link.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                      {link.status === 'Active' ? <ShieldCheck size={12}/> : <ShieldAlert size={12}/>}
                      {link.status}
                    </div>
                  
                     {link.status === 'Active' && !isSubscribed && link.expires_at && (<span className="ml-1 mt-[8px] mt- text-[12px] p-[4px] rounded-[4px] bg-amber-100 text-amber-800">Expires In: {new Date(link.expires_at).toLocaleDateString()}</span>)}

                  </div>

                  {/* Column 3: Stats (4 cols) */}
                  <div className="md:col-span-4 flex items-center justify-around  md:justify-center gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                    <DataPoint label="Today" value={`${link.clicksToday}`} color="text-emerald-600" />
                    <DataPoint label="7 Days" value={link.clicksLastWeek} color="text-blue-600" />
                    <DataPoint label="All time Clicks" value={link.totalClicks} color="text-slate-800" />
                  </div>

                  {/* Column 4: Actions (2 cols) */}
                  <div className="md:col-span-2 flex justify-end gap-2">
                    <button 
                      onClick={() => copyToClipboard(link.slug, link.id)}
                      className={`flex-1 md:flex-none flex items-center justify-center p-3 rounded-xl transition-all ${copiedId === link.id ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400 hover:text-indigo-600'}`}
                    >
                      {copiedId === link.id ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    </button>
                    <a href={`/go/${link.slug}`} target="_blank" className="flex-1 md:flex-none flex items-center justify-center p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
                      <ExternalLink size={18} />
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components... (StatCard & DataPoint تبقى كما هي)
// function StatCard({ label, value, color }) {
//   return (
//     <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden relative">
//       <div className={`absolute top-0 left-0 w-1 h-full ${color}`}></div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{label}</p>
//       <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
//     </div>
//   );
// }

function StatCard({ label, value, icon, color }) {
  const bg = color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600';
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bg}`}>{icon}</div>
      <div>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <span className="text-2xl font-black text-slate-800">{value}</span>
      </div>
    </div>
  );
}


function DataPoint({ label, value, color }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[11px] font-black text-slate-500 uppercase mb-1 ">{label}</span>
      <span className={`text-sm font-black ${color}`}>{value}</span>
    </div>
  );
}