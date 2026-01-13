'use client';

import { useEffect } from "react";
import Link from "next/link";

export default function RefundPolicy() {
   useEffect(()=>{
  document.title = "Refund Policy";
  
    },[])
  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-6 font-sans dark:bg-slate-950">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-16 rounded-[2.5rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800">
        
        {/* Header Section */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Refund Policy</h1>
          <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-widest">
            Effective Date: January 11, 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-10 text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              1. "Try Before You Buy" Philosophy
            </h2>
            <p>
              At <strong>Direop</strong>, we offer a <strong>Free Tier</strong> to allow users to fully test our link management and redirection technology before committing to a paid plan. We strongly encourage all users to utilize this free access to ensure the service meets their automation needs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              2. Refund Eligibility
            </h2>
            <p>
              Due to the digital nature of our service and the availability of a free version, paid subscriptions are generally <strong>non-refundable</strong> for "change of mind" or "under-utilization" of the service. However, we may issue a refund in the following circumstance:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong>Critical Technical Failures:</strong> If a verified system bug or core service failure prevents you from using the platform as advertised, and our technical team is unable to resolve the issue within 7 business days of being notified.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              3. Refund Request Process
            </h2>
            <p>
              To request a refund under the technical failure condition, please contact us at <strong>support@yourdomain.com</strong> within 7 days of the transaction. Please include:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 ml-2 py-1">
              <li>Your order number from Lemon Squeezy.</li>
              <li>A detailed description or screenshot of the technical error.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              4. Subscription Cancellations
            </h2>
            <p>
              You can cancel your subscription at any time via your dashboard settings. Upon cancellation, you will retain access to Pro features until the end of your current billing period. No further charges will be applied to your account.
            </p>
          </section>

    <section>
  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
    5. Processing Refunds
  </h2>
  <p className="text-slate-700 dark:text-slate-300">
    Because we provide a <strong>free trial (3 links for 48 hours each)</strong> to let you test the service before upgrading, we generally do not offer refunds once a premium subscription is purchased.
  </p>
  <p className="mt-3 text-slate-700 dark:text-slate-300">
    In cases of billing errors or technical issues, approved refunds will be issued via <strong>PayPal</strong> to your original payment method. Please allow <strong>5-10 business days</strong> for the transaction to be completed.
  </p>
</section>

          {/* Contact Footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm font-medium text-slate-400">
              Need assistance with your billing?
            </p>
            <a href="mailto:support@yourdomain.com" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
              direopsupp@gmail.com
            </a>
          </div>

        </div>
      </div>

      {/* Footer (Consistency with other legal pages) */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm font-semibold text-slate-500">
            <Link href="/privacy" className="hover:text-indigo-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo-600">Terms of Service</Link>
            <Link href="/refunds" className="hover:text-indigo-600">Refund Policy</Link>
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">
            © 2026 Direop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}