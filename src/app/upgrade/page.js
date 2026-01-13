// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
// import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard } from "lucide-react"; // مكتبة lucide-react للأيقونات
// import Link from "next/link";
// import Swal from "sweetalert2";
// import { createBrowserClient } from '@supabase/ssr'
// export default function UpgradePage() {
//   const [userProfile, setUserProfile] = useState(false);
// const router = useRouter();
// const supabase=createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )
//   useEffect(() => {
//     // التحقق هل المستخدم برو حالياً
//    useEffect(() => {
//     async function getUserData() {
//       // 1. الحصول على المستخدم من الجلسة (Auth)
//       const { data: { user } } = await supabase.auth.getUser();

//       if (user) {
//         // 2. جلب البيانات من جدول profiles
//         const { data: profile, error } = await supabase
//           .from('profiles')
//           .select('*')
//           .eq('id', user.id)
//           .single();

//         if (!error) setUserProfile(profile);
//       } else {
//         // إذا لم يكن مسجل دخول، وجهه لصفحة تسجيل الدخول
//         router.push('/login');
//       }
//       setLoading(false);
//     }

//     getUserData();
//   }, [supabase, router]);
//   }, [userProfile]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       {/* زر الرجوع */}
//       <div className="max-w-4xl mx-auto mb-8">
//         <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Dashboard
//         </Link>
//       </div>

//       <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//         <div className="bg-blue-600 p-8 text-center text-white">
//           <h1 className="text-3xl font-bold uppercase tracking-tight">Upgrade to Pro</h1>
//           <p className="mt-2 text-blue-100">Unleash the full power of LinkCommand</p>
//         </div>

//         <div className="p-8">
//           {/* عرض السعر */}
//           <div className="text-center mb-8">
//             <span className="text-5xl font-extrabold text-gray-900">$4.50</span>
//             <span className="text-gray-500 text-lg"> / month</span>
//             <p className="text-sm text-gray-400 mt-2 italic">Cancel anytime from your settings</p>
//           </div>

//           {/* المميزات */}
//           <ul className="space-y-4 mb-10">
//             {[
//   'Unlimited Dynamic Links', 
//   'Bulk Destination Links Updates', 
//   'Real-Time Click Insights', 
//   'Instant Redirects',
//   'Anti-Ban Account Protection', 
//   'Custom Slug Names',
//   'Priority 24/7 Support'
// ].map((feature, index) => (
//               <li key={index} className="flex items-center text-gray-700">
//                 <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
//                 {feature}
//               </li>
//             ))}
//           </ul>

//           {/* التحقق من حالة المستخدم */}
//           {isAlreadyPro ? (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
//               <p className="text-green-800 font-medium">You are already a PRO member!</p>
//               <p className="text-green-600 text-sm mt-1">Your subscription is active until {new Date(userProfile.subscription_ends_at).toLocaleDateString()}</p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {/* مكون PayPal */}
//              <PayPalScriptProvider options={{ 
//                 "client-id": "ARGPHh-iy1nZ_KusDoY2BOt65fMFQJrr84apNWJFi-9tcWTFa8PNfNhhKjsxu1KSw71NYfIkH-h0kKew", // هذا الـ Client ID الخاص بك
//                 vault: true, 
//                 intent: "subscription" 
//               }}>
//                 <PayPalButtons
//                   style={{ shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe' }}
//                   createSubscription={(data, actions) => {
//                     return actions.subscription.create({
//                       plan_id: 'P-0PN22317719958939NFSLTTA' // تأكد من وضع الـ Plan ID الحقيقي هنا
//                     });
//                   }}
//                   onApprove={async (data, actions) => {
//                     // بدلاً من تحديث Supabase هنا، نرسل البيانات للـ API الخاص بنا
//                     const response = await fetch('/api/paypal', {
//                       method: 'POST',
//                       headers: { 'Content-Type': 'application/json' },
//                       body: JSON.stringify({
//                         subscriptionID: data.subscriptionID,
//                         userId: userProfile.id,
//                         userEmail: userProfile.email
//                       }),
//                     });
          
//                     if (response.ok) {
//     Swal.fire({ icon: "success", title: "Success!", text: "You are now a PRO member." });

//                      router.push('/dashboard');
                     
//                     }
//                   }}
//                 />
//               </PayPalScriptProvider>

//               {/* ملاحظات الأمان */}
//               <div className="flex flex-col items-center space-y-3 pt-4 border-t border-gray-100">
//                 <div className="flex items-center text-xs text-gray-500">
//                   <ShieldCheck className="w-4 h-4 mr-1 text-blue-500" />
//                   Secure Encryption by PayPal
//                 </div>
//                 <div className="flex items-center text-xs text-gray-400">
//                   <CreditCard className="w-4 h-4 mr-1" />
//                   Auto-renews monthly. Manage in settings.
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { createBrowserClient } from '@supabase/ssr';

export default function UpgradePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    async function getUserData() {
      try {
        // 1. الحصول على المستخدم من الجلسة
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.push('/login');
          return;
        }

        // 2. جلب البيانات من جدول profiles
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!profileError) {
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, [supabase, router]);

  // فحص هل المستخدم برو حالياً بناءً على الحالة والوقت
  const isAlreadyPro = userProfile?.is_subscribed && 
                       new Date(userProfile.subscription_ends_at) > new Date();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* زر الرجوع */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-8 text-center text-white">
          <h1 className="text-3xl font-bold uppercase tracking-tight">Upgrade to Pro</h1>
          <p className="mt-2 text-blue-100">Unleash the full power of LinkCommand</p>
        </div>

        <div className="p-8">
          {/* عرض السعر */}
          <div className="text-center mb-8">
            <span className="text-5xl font-extrabold text-gray-900">$4.50</span>
            <span className="text-gray-500 text-lg"> / month</span>
            <p className="text-sm text-gray-400 mt-2 italic">Cancel anytime from your settings</p>
          </div>

          {/* المميزات */}
          <ul className="space-y-4 mb-10">
            {[
              'Unlimited Dynamic Links', 
              'Bulk Destination Links Updates', 
              'Real-Time Click Insights', 
              'Instant Redirects',
              'Anti-Ban Account Protection', 
              'Custom Slug Names',
              'Priority 24/7 Support'
            ].map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                {feature}
              </li>
            ))}
          </ul>

          {/* التحقق من حالة المستخدم */}
          {isAlreadyPro ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800 font-medium text-lg">You are a PRO member! ✨</p>
              <p className="text-green-600 text-sm mt-1">
                Active until {new Date(userProfile.subscription_ends_at).toLocaleDateString()}
              </p>
              <Link href="/dashboard" className="mt-4 inline-block text-blue-600 underline text-sm">
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* مكون PayPal */}
              <PayPalScriptProvider options={{ 
                "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                vault: true, 
                intent: "subscription" 
              }}>
                <PayPalButtons
                  style={{ shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe' }}
                  createSubscription={(data, actions) => {
                    return actions.subscription.create({
                      plan_id: process.env.NEXT_PUBLIC_PLAN_ID
                    });
                  }}
                  onApprove={async (data, actions) => {
                    try {
                      const response = await fetch('/api/paypal', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          subscriptionID: data.subscriptionID,
                          userId: userProfile?.id,
                        }),
                      });
            
                      if (response.ok) {
                       setTimeout(async()=>{
                         await Swal.fire({ 
                          icon: "success", 
                          title: "Success!", 
                          text: "Congratulations! You are now a PRO member.",
                          confirmButtonColor: "#2563eb"
                        });
                        router.push('/dashboard');
                        router.refresh();
                       },500)
                      } else {
                        throw new Error("Failed to update subscription");
                      }
                    } catch (error) {
                      Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong during activation." });
                    }
                  }}
                />
              </PayPalScriptProvider>

              {/* ملاحظات الأمان */}
              <div className="flex flex-col items-center space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 mr-1 text-blue-500" />
                  Secure Encryption by PayPal
                </div>
                <div className="flex items-center text-xs text-gray-400 text-center">
                  <CreditCard className="w-4 h-4 mr-1 inline" />
                  $4.50 billed monthly. Manage or cancel in settings.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




{/* <div id="paypal-button-container-P-9BA173355U850394ANFTBHDI"></div>
<script src="https://www.paypal.com/sdk/js?client-id=AcAKIARVYtE8l6w9gtcDOBxhSNMZOM_gq52XGtQx7DmAEkD-TCFAx-4mmCNKw2sFpH6hQHKVFOKPqQnO&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
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
          
          plan_id: 'P-9BA173355U850394ANFTBHDI'
        });
      },
      onApprove: function(data, actions) {
        alert(data.subscriptionID); 
      }
  }).render('#paypal-button-container-P-9BA173355U850394ANFTBHDI'); 
</script> */}