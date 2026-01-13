'use client';
import Link from "next/link";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(()=>{
  document.title = "Privacy Policy";

  },[])
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 px-6 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-16 rounded-[2.5rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800">
        
        {/* Header Section */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-widest">
            Last Updated: January 11, 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-10 text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>Direop</strong>. We respect your privacy and are committed to protecting your personal data. This policy explains how we handle your information when you use our dynamic link management services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              2. Data We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Account Credentials:</strong> We use <strong>Supabase Auth</strong> to manage your login. We only store your email address to identify your dashboard and subscription status.</li>
              <li><strong>Link Analytics:</strong> We track non-personal data such as click counts, general geographic location (country level), and device types to provide you with performance insights.</li>
              <li><strong>Cookies:</strong> We use essential cookies to keep you logged into your session.</li>
            </ul>
          </section>

       <section>
  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
    3. Payment Integrity
  </h2>
  <p className="text-slate-700 dark:text-slate-300">
    All financial transactions are securely processed through <strong>PayPal</strong>. We do not store, see, or have access to your credit card details or bank information. 
  </p>
  <p className="mt-3 text-slate-700 dark:text-slate-300">
    PayPal provides us only with the necessary confirmation to activate your subscription status. You can review their security and privacy standards at <a href="https://www.paypal.com/webapps/mpp/ua/privacy-full" className="text-indigo-600 underline font-medium" target="_blank" rel="noopener noreferrer">PayPal Privacy Policy</a>.
  </p>
</section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              4. Data Infrastructure
            </h2>
            <p>
              Our database is powered by <strong>Supabase</strong>, ensuring industry-standard encryption for your data at rest and in transit. We never sell your data to third-party advertisers. We only share data with essential infrastructure providers (Supabase, Lemon Squeezy) to maintain your service.
            </p>
          </section>

         <section>
  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
    5. Your Rights & Data Management
  </h2>
  <p>
    You have the right to access and manage your active links through your dashboard. In this current version (MVP), to ensure data integrity and prevent accidental loss, account deletion or permanent link removal is handled manually by our team.
  </p>
  <p className="mt-3">
    If you wish to delete your account or specific data, please contact us at 
    <a href="mailto:support@yourdomain.com" className="text-indigo-600 font-bold ml-1 hover:underline">
      direopsupp@gmail.com
    </a>. We will process your request within 24-48 hours.
  </p>
</section>

          {/* Contact Footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm font-medium text-slate-400">
              For privacy concerns or data requests:
            </p>
            <a href="mailto:support@yourdomain.com" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
              support@yourdomain.com
            </a>
          </div>

        </div>
      </div>

      {/* Footer Section */}
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