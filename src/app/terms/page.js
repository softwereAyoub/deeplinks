'use client';
import Link from "next/link";
import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(()=>{
  document.title = "Terms of Service";
  
    },[])
  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-6 font-sans dark:bg-slate-950">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-16 rounded-[2.5rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800">
        
        {/* Header Section */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-widest">
            Last Updated: January 11, 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-10 text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              1. Acceptance of Terms
            </h2>
            <p>
              By creating an account or using <strong>Direop</strong>, you agree to be legally bound by these Terms of Service. Our platform provides dynamic link management and bulk redirection services designed for social media automation and performance marketing.
            </p>
          </section>

   <section>
  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
    2. Subscription & Billing
  </h2>
  <p>
    We provide subscription-based access to our premium features. By subscribing, you agree to our billing terms.
  </p>
  <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-700 dark:text-slate-300">
    <li>
      <strong>Payment Provider:</strong> All payments are securely processed via <strong>PayPal</strong>.
    </li>
    <li>
      <strong>Free Tier/Trial:</strong> New users can create up to <strong>3 trial links</strong>. Each trial link is valid for <strong>48 hours</strong> only. To unlock unlimited links and permanent validity, a premium subscription is required.
    </li>
    <li>
      <strong>Automatic Renewal:</strong> Premium subscriptions are billed in advance on a recurring monthly basis and will automatically renew unless canceled.
    </li>
    <li>
      <strong>Cancellation:</strong> You may cancel your subscription at any time through your <strong>dashboard</strong> or your <strong>PayPal account</strong>.
    </li>
  </ul>
</section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              3. Acceptable Use Policy
            </h2>
            <p>
              You agree to use our dynamic links for lawful purposes only. Prohibited activities include:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Redirecting to illegal content, malware, or phishing sites.</li>
              <li>Using our service to bypass security measures of third-party platforms in a malicious way.</li>
              <li>Generating "spam" traffic or deceptive redirects that violate the terms of networks like TikTok, Amazon, or Instagram.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              4. Disclaimer of Liability
            </h2>
            <p>
              While we provide tools to manage links externally to avoid manual app friction, we are not responsible for any actions taken by third-party platforms (such as TikTok) against your accounts. You use this automation tool at your own discretion and risk. 
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              5. Data & Privacy
            </h2>
            <p>
              Your use of the service is also governed by our <strong>Privacy Policy</strong>. We collect minimal data necessary to provide link redirection and analytics services.
            </p>
          </section>

          {/* Contact Footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm font-medium text-slate-400">
              For billing support or legal inquiries:
            </p>
            <a href="mailto:support@yourdomain.com" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
              direopsupp@gmail.com
            </a>
          </div>

        </div>
      </div>

      {/* Footer */}
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