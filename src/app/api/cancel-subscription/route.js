import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// دالة لجلب Access Token من بايبال
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
  const response = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: { Authorization: `Basic ${auth}` },
  });
  const data = await response.json();
  return data.access_token;
}

export async function POST(req) {
  try {
    const { subscriptionId, userId } = await req.json();

    if (!subscriptionId) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const accessToken = await getPayPalAccessToken();

    // 1. إرسال طلب الإلغاء لبايبال
    const paypalRes = await fetch(`https://api-m.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason: 'User canceled from dashboard' }),
    });

    if (paypalRes.ok || paypalRes.status === 422) { 
      // 2. تحديث قاعدة البيانات في Supabase
      await supabaseAdmin
        .from('profiles')
        .update({ subscription_plan: 'free' }) // نغير الخطة لـ free
        .eq('id', userId);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'PayPal error' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}