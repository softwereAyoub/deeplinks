"use client";
import { useState } from "react";
import Link from "next/link";

export default function MathPage() {
  const [copyStatus, setCopyStatus] = useState(null);
 
  // قائمة الرموز الرياضية (Math & Calculus Symbols)
  const mathSymbols = [
    "∑", "∏", "√", "∞", "∫", "≈", "≠", "≤", "≥", "±", "÷", "×", "∂", "∆", "∇", "∈", "∉", "∋", "∌","∀","∃","∄","∅","ℕ","ℤ","ℚ","ℝ","ℂ","⊂","⊃","⊆","⊇","⊄","⊅","⊈","⊉",
"⇒","⇔","⇐","¬","∧","∨","⊼","⊽","⊻"
,"∇","lim","→","←","↦","∘","d","δ","ε","λ","μ","θ","π","σ","φ","ψ","ω",
"∂²","∫∫","∫∫∫","∮","ℓ","‖","⟂"
,"≪","≫","≮","≯","≰","≱","≲","≳","≺","≻","≼","≽","≾","≿"
,"⎡","⎢","⎣","⎤","⎥","⎦","⎛","⎜","⎝","⎞","⎟","⎠","⟨","⟩"
,"ℙ","ℰ","Var","Cov","∼","≍","≈","≐"
, "∎", "∠", "∡", "∢", "∣", "∦", "∧", "∨", "∩", "∪", "∴", "∵", "∶", "∷", "∼", "∽", "≂", "≃", "≅", "≣", "≡", "∝", "∟", "∬", "∭", "⨌", "∯", "∰", "∱", "∲", "∳", "⊕", "⊖", "⊗", "⊘", "⊙", "⊚", "⊛", "⊜", "⊝", "⊞", "⊟", "⊠", "⊡", "⊢", "⊣", "⊤", "⊥", "⊦", "⊧", "⊨", "⊩", "⊪", "⊫", "⊬", "⊭", "⊮", "⊯", "⊰", "⊱", "⊲", "⊳", "⊴", "⊵", "⊶", "⊷", "⊸", "⊹", "⊺", "⊻", "⊼", "⊽", "⊾", "⊿"
  ];

  const copyToClipboard = (char) => {
    navigator.clipboard.writeText(char);
    setCopyStatus(char);
    setTimeout(() => setCopyStatus(null), 1500);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* 1. Header & Search (نفس التصميم لضمان التناسق) */}
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row mb-[15px] items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-black italic tracking-tighter">
              Direop<span className="text-blue-600">.</span>
            </Link>
            {/* <input 
              type="text" 
              placeholder="Search math symbols..." 
              className="w-full md:w-80 bg-gray-100 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-black transition-all"
            /> */}
          </div>

          {/* 2. Navbar (لاحظ أن Math هو النشط هنا) */}
           <nav className="flex gap-6 mt-6 overflow-x-auto pb-2 border-b-2 border-transparent">
            <Link href="/" className="text-gray-500 hover:text-black font-bold">Symbols</Link>
            <Link href="/special-characters-letters" className="text-gray-500 hover:text-black font-bold">Letters</Link>
            <Link href="/special-characters-math" className="  font-bold border-b-2 border-black pb-1">Math</Link>
            <Link href="/special-characters-numbers" className="text-gray-500 hover:text-black font-bold">Numbers</Link>
            <Link href="/special-characters-arrows" className="text-gray-500 hover:text-black font-bold">Arrows</Link>
            <Link href="/special-characters-emoji" className="text-gray-500 hover:text-black font-bold">Emoji</Link>
          </nav>
        </div>
      </header>

      {/* 3. Main Content - Math Grid */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* <h1 className="text-2xl font-bold mb-6">Mathematical Symbols Copy and Paste</h1> */}
               <div className=" mb-[20px] ">
          <h1 className="text-2xl font-bold ">Mathematical Symbols Copy and Paste</h1>
        <span className=" text-[15px] text-amber-600 ">Click on any special character above to copy it to your clipboard instantly.</span>
      </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {mathSymbols.map((s, i) => (
            <button
              key={i}
              onClick={() => copyToClipboard(s)}
              className="h-16 flex items-center justify-center text-2xl border rounded-lg hover:bg-black hover:text-white transition-all active:scale-90"
            >
              {s}
            </button>
          ))}
        </div>

        {/* SEO Text Section for Math */}
        <div className="mt-20 border-t pt-10 text-gray-500 max-w-2xl">
          <h2 className="text-black font-bold text-xl mb-4">Mathematical Unicode Characters</h2>
          <p>
            Find all essential <strong>math symbols</strong> in one place. Whether you are working on a LaTeX document, 
            coding, or doing homework, you can easily copy operators like summation (∑), infinity (∞), 
            and integral (∫). Our tool supports all standard Unicode math characters.
          </p>
        </div>
      </main>

      {/* 4. Notification Toast */}
      {copyStatus && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full flex items-center gap-4 animate-bounce shadow-2xl">
          <span className="text-2xl font-bold">{copyStatus}</span>
          <span className="text-sm font-medium uppercase tracking-widest">Math Copied!</span>
        </div>
      )}

         <footer className="mt-20 py-8 border-t border-gray-100 text-center">
  <div className="flex justify-center gap-6 mb-4 text-sm text-gray-500 font-medium">
    <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
    <Link href="/terms" className="hover:text-black">Terms of Service</Link>
    <Link href="/about" className="hover:text-black">About Us</Link>
  </div>
  <p className="flex justify-center gap-6 mb-4 text-sm text-gray-700 font-medium">  Contact: direopsupp@gmail.com
</p>
  <p className="text-xs text-gray-400">© 2026 Direop. All rights reserved.</p>
</footer>
    </div>
  );
}