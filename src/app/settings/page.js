'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import { ArrowBigLeft } from 'lucide-react';
import Swal from 'sweetalert2';

export default function SettingsPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    }
    getProfile();
  }, []);
const handleCancel = async () => {
  // 1. Confirmation Dialog
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "Your PRO features will remain active until the end of your current billing period, but the subscription will not renew.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33', // Red for cancellation
    cancelButtonColor: '#3085d6', // Blue for keeping it
    confirmButtonText: 'Yes, cancel subscription',
    cancelButtonText: 'No, keep it',
    background: '#111827', // Dark background to match your UI
    color: '#fff'
  });

  if (result.isConfirmed) {
    // 2. Show Loading State
    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while we update your subscription.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          subscriptionId: profile?.paypal_subscription_id, 
          userId: profile?.id 
        }),
      });

      if (res.ok) {
        // 3. Success Message
        await Swal.fire({
          icon: 'success',
          title: 'Cancelled!',
          text: 'Your auto-renewal has been successfully turned off.',
          confirmButtonText: 'Got it',
          timer: 4000
        });
        window.location.reload();
      } else {
        throw new Error('Failed to cancel');
      }
    } catch (error) {
      // 4. Error Message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while communicating with PayPal. Please try again later.',
        confirmButtonText: 'Okay'
      });
    }
  }
};
// في الـ JSX:


  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
            <Link href='/dashboard' className="p-2 absolute left-[65px] top-[35px]  inline-flex bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100 hover:scale-105 transition-transform">
            <ArrowBigLeft size={24} />
          </Link>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Account Settings</h1>

      {profile?.is_subscribed && profile?.subscription_plan === 'PRO' ? (
        /* PRO Subscriber UI */
        <div className="space-y-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-800 font-bold text-lg">PRO Plan Active ✅</p>
                <p className="text-green-600 text-sm">You have full access to all features</p>
              </div>
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full uppercase">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-xs">Subscription Date</p>
              <p className="font-medium">
                {new Date(profile.subscribed_at).toLocaleDateString('en-US')}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-xs">Next Renewal Date</p>
              <p className="font-medium text-indigo-600">
                {profile.subscription_ends_at 
                  ? new Date(profile.subscription_ends_at).toLocaleDateString('en-US') 
                  : 'Not Specified'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4">
              You can manage your subscription, update payment methods, or cancel through our official payment portal.
            </p>
            <a
              href='https://www.sandbox.paypal.com/myaccount/autopay/'
              // onClick={() => window.open('https://www.paypal.com/myaccount/autopay/', '_blank')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center justify-center w-full px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold"
            >
               Cancel Subscription from PayPal
            </a>
            <button 
  onClick={handleCancel}
  className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
>
  Cancel Subscription Directly
</button>
          </div>
        </div>
      ) : (
        /* Free User UI */
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-gray-600 font-medium">You are currently on the {profile?.is_subscribed && new Date(profile?.subscription_ends_at) > new Date() ? 'PRO' : 'Free'} Plan</p>
            {profile?.is_subscribed && new Date(profile?.subscription_ends_at) > new Date() ? <p className="text-gray-600 text-[15px]">Wait until your current subscription ends, then you can renews.</p> : <p className="text-gray-400 text-sm">Upgrade to PRO for unlimited features</p> }
            
          </div>

         
          {profile?.is_subscribed && new Date(profile?.subscription_ends_at) > new Date() && profile?.subscription_plan == 'free' ? 
          
           <button
            onClick={() => window.location.href = '/dashboard/upgrade'}
            disabled={true}
            className="w-full bg-gray-600 text-white py-3 rounded-xl font-bold  shadow-lg shadow-indigo-200 transition-all"
          >
            Upgrade to PRO Now
          </button>:
           <button
            onClick={() => window.location.href = '/dashboard/upgrade'}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
          >
            Upgrade to PRO Now
          </button> 
          }
        </div>
      )}
      {profile?.is_subscribed && new Date(profile?.subscription_ends_at) > new Date()  && profile?.subscription_plan == 'free' && <p className=' py-[35px] text-amber-600 text-center p-[5px] '>Your current subscription is still valid. Wait until this date when the subscription ends  {profile?.subscription_ends_at.split('T')[0]}, and you can subscribe then.</p>}
        {/* <p>اشتراكك الحالي لا يزال سارياً حتى {user.subscription_ends_at}</p> */}

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">Account ID: {profile?.id}</p>
      </div>
    </div>
  );
}