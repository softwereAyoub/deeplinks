import { Mail, Zap } from "lucide-react";
import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#f0f7ff] py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-blue-100 border border-blue-50">
        
        {/* Header Section */}
        <div className="border-b border-blue-50 pb-8 mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-blue-950 mb-4 tracking-tight">Refund Policy</h1>
          <p className="text-blue-500 font-bold text-sm uppercase tracking-widest">
            Last Updated: January 8, 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-10 text-blue-900/80 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              1. Our "Try Before You Buy" Philosophy
            </h2>
            <p>
              At <strong>DeepLinker</strong>, we believe in transparency. We provide a robust <strong>Free Tier</strong> that allows you to experience our core technology before deciding to upgrade to a Pro subscription. We strongly encourage all users to utilize this free version to ensure our service meets their specific needs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              2. Eligibility for Refunds
            </h2>
            <p>
              Since we offer a free version for evaluation, refunds are generally not issued for "change of mind" or "mistake in purchase." However, your satisfaction is important. We will honor refund requests in the following case:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong>Technical Failures:</strong> If you encounter a verified technical bug or a core service failure that prevents the service from working as advertised, and our team is unable to resolve it within 7 business days.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              3. Refund Request Process
            </h2>
            <p>
              To request a refund under the technical failure condition, please email us at <strong>support@deeplinker.com</strong> within 7 days of the initial transaction. You must include:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 border-l-2 border-blue-100 ml-2">
              <li>Your order number from Lemon Squeezy.</li>
              <li>A description or screenshot of the technical error encountered.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              4. Subscription Cancellations
            </h2>
            <p>
              You can cancel your monthly subscription at any time through your dashboard. Upon cancellation, you will retain access to all Pro features until the end of your current billing cycle. No further charges will be made.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              5. Processing of Refunds
            </h2>
            <p>
              Approved refunds will be processed via <strong>Lemon Squeezy</strong> and returned to the original payment method. Depending on your bank, it may take 5-10 business days for the funds to appear in your account.
            </p>
          </section>

          {/* Contact Footer */}
          <div className="mt-16 pt-8 border-t border-blue-50 text-center">
            <p className="text-sm font-medium text-blue-400">
              Need help with a payment issue?
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