
// import { createClient } from '@supabase/supabase-js';
// import crypto from 'crypto';

// export async function POST(req) {
//   try {
//     const rawBody = await req.text();
//     const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    
//     // 1. التحقق من صحة التوقيع (Security Check)
//     const hmac = crypto.createHmac('sha256', secret);
//     const digest = hmac.update(rawBody).digest('hex');
//     const signature = req.headers.get('x-signature') || '';

//     if (digest !== signature) {
//       console.error('❌ Invalid Webhook Signature');
//       return new Response('Invalid signature', { status: 401 });
//     }

//     const payload = JSON.parse(rawBody);
//     const eventName = payload.meta.event_name;
//     const userId = payload.meta.custom_data.user_id; // الـ ID الذي أرسلناه من الزر
//     const attributes = payload.data.attributes;

//     console.log(`🔔 Webhook Received: ${eventName} for User: ${userId}`);

//     // 2. الاتصال بـ Supabase (Service Role Key)
//     const supabase = createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.SUPABASE_SERVICE_ROLE_KEY
//     );

//     // 3. معالجة الأحداث المختلفة
    
//     // أ- حالة الاشتراك الجديد أو التحديث (مثل تغيير الخطة أو التجديد)
//     if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
//       const { error } = await supabase
//         .from('profiles')
//         .update({ 
//           is_subscribed: attributes.status === 'active', // true إذا كان فعالاً
//           subscription_plan: 'PRO',
//           subscribed_at: attributes.created_at, // تاريخ بداية الاشتراك
// subscription_ends_at: attributes.ends_at || attributes.renews_at,
//           lemon_subscription_id: payload.data.id, // ID الاشتراك للإدارة لاحقاً
//           customer_portal_url: attributes.urls.customer_portal, // رابط الإلغاء للمستخدم
//         })
//         .eq('id', userId); // التحديث باستخدام معرف المستخدم الفريد

//       if (error) throw error;
//       console.log('✅ Subscription updated in database');
//     }

//     // ب- حالة انتهاء الاشتراك تماماً (بعد الإلغاء وانتهاء الفترة المدفوعة)
//     if (eventName === 'subscription_expired') {
//       const { error } = await supabase
//         .from('profiles')
//         .update({ 
//           is_subscribed: false,
//           subscription_plan: 'FREE',
//           // نترك تاريخ الانتهاء كما هو للسجل التاريخي
//         })
//         .eq('id', userId);

//       if (error) throw error;
//       console.log('🚫 Subscription expired and access revoked');
//     }

//     return new Response('Webhook processed successfully', { status: 200 });
//   } catch (err) {
//     console.error('💥 Webhook Error:', err.message);
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }
// }
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(rawBody).digest('hex');
    const signature = req.headers.get('x-signature') || '';

    if (digest !== signature) {
      console.error('❌ Invalid Webhook Signature');
      return new Response('Invalid signature', { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;
    const userId = payload.meta.custom_data?.user_id; // استخدم ?. للوقاية
    const attributes = payload.data.attributes;
    const userEmail = attributes.user_email; // الإيميل متوفر دائماً

    console.log(`🔔 Webhook: ${eventName} | User: ${userId} | Email: ${userEmail}`);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // دالة مساعدة لتحديد المستخدم سواء بالـ ID أو الإيميل
    const userQuery = userId ? { id: userId } : { email: userEmail };

    if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          is_subscribed: attributes.status === 'active',
          subscription_plan: 'PRO',
          subscribed_at: attributes.created_at,
          subscription_ends_at: attributes.ends_at || attributes.renews_at,
          lemon_subscription_id: payload.data.id, 
          customer_portal_url: attributes.urls.customer_portal,
        })
        .match(userQuery); // يستخدم الـ ID إذا وجد، وإلا يستخدم الإيميل

      if (error) throw error;
      console.log('✅ Subscription sync successful');
    }

    if (eventName === 'subscription_expired') {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          is_subscribed: false,
          subscription_plan: 'FREE',
        })
        .match(userQuery);

      if (error) throw error;
      console.log('🚫 Subscription expired');
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('💥 Webhook Error:', err.message);
    return new Response(`Error: ${err.message}`, { status: 400 });
  }
}