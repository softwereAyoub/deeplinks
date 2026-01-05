// 'use client';

// import { useEffect } from "react";

// export default function UpgradeButton() {






//     useEffect(() => {
//     // التأكد من تحميل Paddle قبل التهيئة
//     if (typeof window !== 'undefined' && window.Paddle) {
//       window.Paddle.Initialize({ 
//         token: 'test_98ee8848025f8371d2bc08c1caa', // استبدله بـ Vendor ID الخاص بك
//       });
//     }
//   }, []);
  

//   const handleCheckout = () => {
//     if (typeof window === 'undefined' || !window.Paddle) return;
//     const paddle = window.Paddle;
//     paddle.Checkout.open({
//       items: [{
//         priceId: 'pri_01ke71e0dgq14036hyj7xevr2c', // الـ Price ID الخاص بك
//         quantity: 1
//       }],
//       customData: {
//         userId: '17256a3a-337a-4374-b64e-0514140f0620' // لربط الدفع بالمستخدم في Supabase
//       },
//       customer: {
//         email: 'ay.bouguern@gmail.com'
//       }
//     });

// }

// return(
//     <button onClick={handleCheckout} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg">
//       Upgrade to PRO
//     </button>
// )
// }

'use client';

export default function UpgradeButton() {
  const handleCheckout = () => {
    if (typeof window !== 'undefined' && window.Paddle) {
      // التهيئة داخل الدالة عند الضغط لضمان وجود المكتبة
      window.Paddle.Initialize({ 
        token: 'test_98ee8848025f8371d2bc08c1caa', // استبدله بـ Vendor ID الخاص بك
      });
setTimeout(() => {

      window.Paddle.Checkout.open({
        settings: {
          displayMode: 'overlay',
          theme: 'light',
        },
        items: [{
        priceId: 'pri_01ke71e0dgq14036hyj7xevr2c', // الـ Price ID الخاص بك
          quantity: 1
        }],
        customData: {
        userId: '17256a3a-337a-4374-b64e-0514140f0620' // لربط الدفع بالمستخدم في Supabase
        }
      });
}, 200);
    
    }
  };


return(
    <button onClick={handleCheckout} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg">
      Upgrade to PRO
    </button>
)
}