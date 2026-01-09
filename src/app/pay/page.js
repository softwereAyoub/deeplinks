'use client';

import { createBrowserClient } from '@supabase/ssr';

export default function UpgradeButton() {
  // إنشاء عميل Supabase للمتصفح (Client Side)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleSubscribe = async () => {
  

    // رابط Lemon Squeezy الخاص بك
    const baseUrl = "https://directly2004.lemonsqueezy.com/checkout/buy/201f7501-e446-46f4-8843-11df3bb73444";
    
    // إضافة البيانات المخصصة للرابط
    const checkoutUrl = `${baseUrl}?checkout[custom][user_id]=${'12406ed6-0f5c-4b00-a881-d8737905d5ba'}&checkout[email]=${'fewose8648@hudisk.com'}&preview=1`;

    // الانتقال لصفحة الدفع
    window.location.href = checkoutUrl;
  };

  return (
    <button 
      onClick={handleSubscribe} 
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black shadow-lg transition-transform active:scale-95"
    >
      Upgrade to PRO
    </button>
  );
}