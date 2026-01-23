"use client";
import { useState } from "react";
import Link from "next/link";

export default function NumbersPage() {
  const [copyStatus, setCopyStatus] = useState(null);

  // قائمة الأرقام المزخرفة، الرومانية والكسور
  const numberSymbols = [
    "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳",
    "❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾", "❿", "⓫", "⓬", "⓭", "⓮", "⓯", "⓰", "⓱", "⓲", "⓳", "⓴",
    "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ", "Ⅼ", "Ⅽ", "Ⅾ", "Ⅿ",
    "ⅰ", "ⅱ", "ⅲ", "ⅳ", "ⅴ", "ⅵ", "ⅶ", "ⅷ", "ⅸ", "ⅹ", "ⅺ", "ⅻ", "ⅼ", "ⅽ", "ⅾ", "ⅿ",
    "⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹",
"₀","₁","₂","₃","₄","₅","₆","₇","₈","₉"
,"⓵","⓶","⓷","⓸","⓹","⓺","⓻","⓼","⓽","⓾",
"🄌","🄍","🄎","🄏","🄐","🄑","🄒","🄓","🄔","🄕"
,
    "½", "⅓", "⅔", "¼", "¾", "⅕", "⅖", "⅗", "⅘", "⅙", "⅚", "⅛", "⅜", "⅝", "⅞", "⅟",
    "𝟘","𝟙","𝟚","𝟛","𝟜","𝟝","𝟞","𝟟","𝟠","𝟡",
"𝟢","𝟣","𝟤","𝟥","𝟦","𝟧","𝟨","𝟩","𝟪","𝟫"
,"⅐","⅑","⅒","⅔","⅖","⅗","⅘","⅙","⅚","⅜","⅝","⅞"
,
    "⒈", "⒉", "⒊", "⒋", "⒌", "⒍", "⒎", "⒏", "⒐", "⒑", "⒒", "⒓", "⒔", "⒕", "⒖", "⒗", "⒘", "⒙", "⒚", "⒛",
    "⑴", "⑵", "⑶", "⑷", "⑸", "⑹", "⑺", "⑻", "⑼", "⑽", "⑾", "⑿", "⒀", "⒁", "⒂", "⒃", "⒄", "⒅", "⒆", "⒇",
    "٠","١","٢","٣","٤","٥","٦","٧","٨","٩",
"۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"

  ];

  const copyToClipboard = (char) => {
    navigator.clipboard.writeText(char);
    setCopyStatus(char);
    setTimeout(() => setCopyStatus(null), 1500);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col mb-[15px] md:flex-row items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-black italic tracking-tighter">
              Direop<span className="text-blue-600">.</span>
            </Link>
            {/* <input 
              type="text" 
              placeholder="Search number symbols..." 
              className="w-full md:w-80 bg-gray-100 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-black transition-all"
            /> */}
          </div>

          {/* Navbar */}
            <nav className="flex gap-6 mt-6 overflow-x-auto pb-2 border-b-2 border-transparent">
            <Link href="/" className="text-gray-500 hover:text-black font-bold">Symbols</Link>
            <Link href="/special-characters-letters" className="text-gray-500 hover:text-black font-bold    ">Letters</Link>
            <Link href="/special-characters-math" className="text-gray-500 hover:text-black font-bold">Math</Link>
            <Link href="/special-characters-numbers" className=" font-bold border-b-2 border-black pb-1">Numbers</Link>
            <Link href="/special-characters-arrows" className="text-gray-500 hover:text-black font-bold">Arrows</Link>
            <Link href="/special-characters-emoji" className="text-gray-500 hover:text-black font-bold">Emoji</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* <h1 className="text-2xl font-bold mb-6"></h1> */}
            <div className=" mb-[20px] ">
          <h1 className="text-2xl font-bold ">Cool Number Symbols & Roman Numerals</h1>
        <span className=" text-[15px] text-amber-600 ">Click on any special character above to copy it to your clipboard instantly.</span>
      </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {numberSymbols.map((s, i) => (
            <button
              key={i}
              onClick={() => copyToClipboard(s)}
              className="h-16 flex items-center justify-center text-2xl border rounded-lg hover:bg-orange-500 hover:text-white transition-all active:scale-90"
            >
              {s}
            </button>
          ))}
        </div>

        {/* SEO Text Section for Numbers */}
        <div className="mt-20 border-t pt-10 text-gray-500 max-w-2xl">
          <h2 className="text-black font-bold text-xl mb-4">Why use circle numbers and roman numerals?</h2>
          <p>
            Whether you are creating an eye-catching list for a blog post or looking for <strong>Roman numerals</strong> (Ⅰ, Ⅱ, Ⅲ) 
            for a professional document, our collection has it all. Copy <strong>circled numbers</strong> (①, ❶) to make your 
            social media captions stand out. All digits are ready to copy and paste anywhere.
          </p>
        </div>
      </main>

      {/* Toast Notification */}
      {copyStatus && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300 z-[100]">
          <span className="text-3xl font-bold">{copyStatus}</span>
          <div className="w-px h-8 bg-orange-300" />
          <span className="font-bold uppercase tracking-widest text-sm">Copied!</span>
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