import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // تأكد من المسار

export async function POST(req) {
  const payload = await req.json();
  
  // فحص نوع الحدث (في Paddle v2 يسمى transaction.completed أو subscription.created)
  if (payload.event_type === 'subscription.created' || payload.event_type === 'transaction.completed') {
    const userId = payload.data.custom_data.userId;

    // تحديث جدول البروفايل في سوبابيس
    const { error } = await supabase
      .from('profiles')
      .update({ 
        is_subscribed: true, 
        subscription_plan: 'pro' 
      })
      .eq('id', userId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ status: 'success' });
}