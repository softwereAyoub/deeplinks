import { Mail, Zap } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#f0f7ff] py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-blue-100 border border-blue-50">
        
        {/* Header Section */}
        <div className="border-b border-blue-50 pb-8 mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-blue-950 mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-blue-500 font-bold text-sm uppercase tracking-widest">
            Effective Date: January 8, 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-10 text-blue-900/80 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              1. Acceptance of Agreement
            </h2>
            <p>
              By accessing or using <strong>DeepLinker</strong>, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              2. Subscription & Billing
            </h2>
            <p>
              DeepLinker offers a subscription-based service billed monthly.
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong>Payments:</strong> All billing is handled by <strong>Lemon Squeezy</strong>, our Merchant of Record.</li>
              <li><strong>Automatic Renewal:</strong> Your subscription will automatically renew each month unless you cancel it before the billing date.</li>
              <li><strong>Refunds:</strong> We offer a free tier to test our services. Therefore, paid subscriptions are generally non-refundable. Please refer to our Refund Policy for specific cases.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              3. User Responsibilities & Conduct
            </h2>
            <p>
              You are responsible for all activity under your account. You agree NOT to use DeepLinker for:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Spamming, phishing, or distributing malware via links.</li>
              <li>Any activity that violates the terms of third-party platforms (YouTube, Instagram, etc.).</li>
              <li>Attempting to reverse-engineer or disrupt the platform's infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              4. Disclaimer of Warranty
            </h2>
            <p>
              DeepLinker is provided on an "AS IS" and "AS AVAILABLE" basis. While we strive for 99.9% uptime, we do not guarantee that the service will be uninterrupted or error-free. We are not liable for any changes in third-party app behavior (e.g., how Instagram handles deep links).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, DeepLinker shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the service or inability to access the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              6. Modifications to Service
            </h2>
            <p>
              We reserve the right to modify or discontinue any part of the service with or without notice. Pricing for subscriptions may change, but we will notify active subscribers at least 30 days in advance.
            </p>
          </section>

          {/* Contact Footer */}
          <div className="mt-16 pt-8 border-t border-blue-50 text-center">
            <p className="text-sm font-medium text-blue-400">
              For any legal inquiries, please contact
            </p>
            <a href="mailto:support@deeplinker.com" className="text-blue-600 font-bold hover:underline">
              support@deeplinker.com
            </a>
          </div>

        </div>
      </div>
         {/* --- Footer (Crucial for Legal/Lemon Squeezy) --- */}
      <footer className="bg-slate-50 mt-[27px] border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Zap size={24} className="text-indigo-600 fill-indigo-600" />
              <span className="text-xl font-bold tracking-tight">DeepLinker</span>
            </div>
            <p className="text-slate-400 max-w-sm text-sm">Helping content creators bridge the gap between social media and native applications since 2024.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-900">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500 font-medium">
              <li><Link href="/terms" className="hover:text-indigo-600 transition-colors text-slate-400">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-600 transition-colors text-slate-400">Privacy Policy</Link></li>
              <li><Link href="/refunds" className="hover:text-indigo-600 transition-colors text-slate-400">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-900">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-500 font-medium">
              <li><a href="mailto:support@deeplinker.com" className="hover:text-indigo-600 flex items-center gap-2 text-slate-400">
                <Mail size={16} /> support@deeplinker.com
              </a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center border-t border-slate-200/50 pt-8 text-slate-400 text-xs font-medium">
          © 2026 DeepLinker. All rights reserved.
        </div>
      </footer>
    </div>
  );
}