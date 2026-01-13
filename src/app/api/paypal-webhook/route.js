import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  // التأكد من وجود التوكن ومطابقته للمخزن في البيئة
  if (!token || token !== process.env.PAYPAL_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const event = await req.json();

  // 1. حالة إلغاء الاشتراك
  if (event.event_type === 'BILLING.SUBSCRIPTION.CANCELLED') {
    const subscriptionID = event.resource.id;
    
    // نغير الحالة إلى "ملغي" ولكن لا نغير is_subscribed إلى false
    // لأن العميل دفع مسبقاً وسينتهي حسابه عند وصول تاريخ subscription_ends_at
    await supabaseAdmin
      .from('profiles')
      .update({ subscription_plan: 'free' }) 
      .eq('paypal_subscription_id', subscriptionID);
  }

  // 2. حالة فشل الدفع (هنا نغلق الحساب فوراً)
  if (event.event_type === 'BILLING.SUBSCRIPTION.PAYMENT.FAILED') {
    const subscriptionID = event.resource.id;
    await supabaseAdmin
      .from('profiles')
      .update({ is_subscribed: false, subscription_plan: 'free' })
      .eq('paypal_subscription_id', subscriptionID);
  }

  // 3. حالة تجديد الاشتراك بنجاح (نزيد شهر إضافي)
  if (event.event_type === 'PAYMENT.SALE.COMPLETED') {
    const subscriptionID = event.resource.billing_agreement_id;
    const newEndsAt = new Date();
    newEndsAt.setDate(newEndsAt.getDate() + 30);

    await supabaseAdmin
      .from('profiles')
      .update({ 
        is_subscribed: true, 
        subscription_ends_at: newEndsAt.toISOString() 
      })
      .eq('paypal_subscription_id', subscriptionID);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}