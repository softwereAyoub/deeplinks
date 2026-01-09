import { Mail, Zap } from "lucide-react";
import Link from "next/link";


export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#f0f7ff] pt-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-blue-100 border border-blue-50">
        
        {/* Header Section */}
        <div className="border-b border-blue-50 pb-8 mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-blue-950 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-blue-500 font-bold text-sm uppercase tracking-widest">
            Last Updated: January 8, 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-10 text-blue-900/80 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>DeepLinker</strong>. Your privacy is paramount to us. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our SaaS platform to create and manage deep links.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Account Information:</strong> When you register via Supabase Auth, we securely store your email address to identify your account and provide access to your dashboard.</li>
              <li><strong>Usage Analytics:</strong> We collect non-identifiable data regarding clicks on your generated links (e.g., total clicks, device types, and geographic regions) to provide you with marketing insights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              3. Payment Processing
            </h2>
            <p>
              All financial transactions are handled by <strong>Lemon Squeezy</strong>, our Merchant of Record. DeepLinker does not store, process, or have access to your credit card details or billing information. Please refer to <a href="https://www.lemonsqueezy.com/privacy" className="text-blue-600 underline font-medium">Lemon Squeezy’s Privacy Policy</a> for more details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              4. Data Security & Third Parties
            </h2>
            <p>
              We utilize <strong>Supabase</strong> for secure database management. We do not sell, trade, or otherwise transfer your personal information to outside parties. Data is only shared with these essential third-party services to ensure the functionality of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              5. User Rights & Deletion
            </h2>
            <p>
              You maintain full control over your data. You may request the deletion of your account and all associated link data directly through your dashboard or by contacting our support team.
            </p>
          </section>

          {/* Contact Footer */}
          <div className="mt-16 pt-8 border-t border-blue-50 text-center">
            <p className="text-sm font-medium text-blue-400">
              Questions about our policy? Contact us at
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