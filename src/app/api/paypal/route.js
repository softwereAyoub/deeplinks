// src/app/api/paypal/route.js
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { subscriptionID, userId } = body;

    // إعداد Supabase (يفضل استخدام Service Role Key)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const now = new Date();
    const endsAt = new Date();
    endsAt.setDate(now.getDate() + 30);

    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ 
        is_subscribed: true,
        paypal_subscription_id: subscriptionID,
        subscription_plan: 'PRO',
        subscribed_at: now.toISOString(),
        subscription_ends_at: endsAt.toISOString()
      })
      .eq('id', userId);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}