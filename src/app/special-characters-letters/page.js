"use client";
import { useState } from "react";
import Link from "next/link";


export default function LettersClient() {
  const [copyStatus, setCopyStatus] = useState(null);

  // قائمة الحروف المزخرفة والفريدة (Fancy & Special Letters)
  const extraLetterSymbols = [
  // ---- Script Style (VERY POPULAR) ----
  "𝓐","𝓑","𝓒","𝓓","𝓔","𝓕","𝓖","𝓗","𝓘","𝓙","𝓚","𝓛","𝓜","𝓝","𝓞","𝓟","𝓠","𝓡","𝓢","𝓣","𝓤","𝓥","𝓦","𝓧","𝓨","𝓩",
  "𝓪","𝓫","𝓬","𝓭","𝓮","𝓯","𝓰","𝓱","𝓲","𝓳","𝓴","𝓵","𝓶","𝓷","𝓸","𝓹","𝓺","𝓻","𝓼","𝓽","𝓾","𝓿","𝔀","𝔁","𝔂","𝔃",

  // ---- Bold Script ----
  "𝒜","𝐵","𝒞","𝒟","𝐸","𝐹","𝒢","𝐻","𝐼","𝒥","𝒦","𝐿","𝑀","𝒩","𝒪","𝒫","𝒬","𝑅","𝒮","𝒯","𝒰","𝒱","𝒲","𝒳","𝒴","𝒵",
  "𝒶","𝒷","𝒸","𝒹","𝑒","𝒻","𝓰","𝒽","𝒾","𝒿","𝓀","𝓁","𝓂","𝓃","𝑜","𝓅","𝓆","𝓇","𝓈","𝓉","𝓊","𝓋","𝓌","𝓍","𝓎","𝓏",

  // ---- Double-struck (Blackboard style - popular in usernames) ----
  "𝔸","𝔹","ℂ","𝔻","𝔼","𝔽","𝔾","ℍ","𝕀","𝕁","𝕂","𝕃","𝕄","ℕ","𝕆","ℙ","ℚ","ℝ","𝕊","𝕋","𝕌","𝕍","𝕎","𝕏","𝕐","ℤ",
  "𝕒","𝕓","𝕔","𝕕","𝕖","𝕗","𝕘","𝕙","𝕚","𝕛","𝕜","𝕝","𝕞","𝕟","𝕠","𝕡","𝕢","𝕣","𝕤","𝕥","𝕦","𝕧","𝕨","𝕩","𝕪","𝕫",

  // ---- Monospace (Tech / Dev / Games) ----
  "𝙰","𝙱","𝙲","𝙳","𝙴","𝙵","𝙶","𝙷","𝙸","𝙹","𝙺","𝙻","𝙼","𝙽","𝙾","𝙿","𝚀","𝚁","𝚂","𝚃","𝚄","𝚅","𝚆","𝚇","𝚈","𝚉",
  "𝚊","𝚋","𝚌","𝚍","𝚎","𝚏","𝚐","𝚑","𝚒","𝚓","𝚔","𝚕","𝚖","𝚗","𝚘","𝚙","𝚚","𝚛","𝚜","𝚝","𝚞","𝚟","𝚠","𝚡","𝚢","𝚣",

  // ---- Small Caps Style (popular in bios) ----
  "ᴀ","ʙ","ᴄ","ᴅ","ᴇ","ғ","ɢ","ʜ","ɪ","ᴊ","ᴋ","ʟ","ᴍ","ɴ","ᴏ","ᴘ","ǫ","ʀ","s","ᴛ","ᴜ","ᴠ","ᴡ","x","ʏ","ᴢ",
  "ᵃ","ᵇ","ᶜ","ᵈ","ᵉ","ᶠ","ᵍ","ʰ","ⁱ","ʲ","ᵏ","ˡ","ᵐ","ⁿ","ᵒ","ᵖ","ᵠ","ʳ","ˢ","ᵗ","ᵘ","ᵛ","ʷ","ˣ","ʸ","ᶻ"

];

  const letterSymbols = [
    "Ⓐ", "Ⓑ", "Ⓒ", "Ⓓ", "Ⓔ", "Ⓕ", "Ⓖ", "Ⓗ", "Ⓘ", "Ⓙ", "Ⓚ", "Ⓛ", "Ⓜ", "Ⓝ", "Ⓞ", "Ⓟ", "Ⓠ", "Ⓡ", "Ⓢ", "Ⓣ", "Ⓤ", "Ⓥ", "Ⓦ", "Ⓧ", "Ⓨ", "Ⓩ",
    "ⓐ", "ⓑ", "ⓒ", "ⓓ", "ⓔ", "ⓕ", "ⓖ", "ⓗ", "ⓘ", "ⓙ", "ⓚ", "ⓛ", "ⓜ", "ⓝ", "ⓞ", "ⓟ", "ⓠ", "ⓡ", "ⓢ", "ⓣ", "ⓤ", "ⓥ", "ⓦ", "ⓧ", "ⓨ", "ⓩ",
    "🄰", "🄱", "🄲", "🄳", "🄴", "🄵", "🄶", "🄷", "🄸", "🄹", "🄺", "🄻", "🄼", "🄽", "🄾", "🄿", "🅀", "🅁", "🅂", "🅃", "🅄", "🅅", "🅆", "🅇", "🅈", "🅉",
    "🅰", "🅱", "🅲", "🅳", "🅴", "🅵", "🅶", "🅷", "🅸", "🅹", "🅺", "🅻", "🅼", "🅽", "🅾", "🅿", "🆀", "🆁", "🆂", "🆃", "🆄", "🆅", "🆆", "🆇", "🆈", "🆉",
    ,...extraLetterSymbols,
    "🅐", "🅑", "🅒", "🅓", "🅔", "🅕", "🅖", "🅗", "🅘", "🅙", "🅚", "🅛", "🅜", "🅝", "🅞", "🅟", "🅠", "🅡", "🅢", "🅣", "🅤", "🅥", "🅦", "🅧", "🅨", "🅩",
    "𝔸", "𝔹", "ℂ", "𝔻", "𝔼", "🔇", "𝔾", "ℍ", "𝕀", "🕈", "𝕂", "🕃", "𝕄", "ℕ", "𝕆", "ℙ", "ℚ", "ℝ", "𝕊", "𝕋", "𝕌", "🕄", "🕅", "🕆", "𝕐", "ℤ"
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
            <Link href="/" className="text-2xl font-black italic tracking-tighter text-black">
              Direop<span className="text-blue-600">.</span>
            </Link>
            {/* <input 
              type="text" 
              placeholder="Search fancy letters..." 
              className="w-full md:w-80 bg-gray-100 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-black transition-all"
            /> */}
          </div>

          {/* Navbar */}
             <nav className="flex gap-6 mt-6 overflow-x-auto pb-2 border-b-2 border-transparent">
            <Link href="/" className="text-gray-500 hover:text-black font-bold">Symbols</Link>
            <Link href="/special-characters-letters" className="  font-bold border-b-2 border-black pb-1">Letters</Link>
            <Link href="/special-characters-math" className="text-gray-500 hover:text-black font-bold">Math</Link>
            <Link href="/special-characters-numbers" className="text-gray-500 hover:text-black font-bold">Numbers</Link>
            <Link href="/special-characters-arrows" className="text-gray-500 hover:text-black font-bold">Arrows</Link>
            <Link href="/special-characters-emoji" className="text-gray-500 hover:text-black font-bold">Emoji</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* <h1 className="text-2xl font-bold mb-6 uppercase tracking-tight">Fancy Letters & Special Alphabet</h1> */}
                 <div className=" mb-[20px] ">
          <h1 className="text-2xl font-bold ">Fancy Letters & Special Alphabet</h1>
        <span className=" text-[15px] text-amber-600 ">Click on any special character above to copy it to your clipboard instantly.</span>
      </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {letterSymbols.map((s, i) => (
            <button
              key={i}
              onClick={() => copyToClipboard(s)}
              className="h-16 flex items-center justify-center text-3xl border rounded-lg hover:bg-blue-600 hover:text-white transition-all active:scale-90"
            >
              {s}
            </button>
          ))}
        </div>

        {/* SEO Text Section for Letters */}
        <div className="mt-20 border-t pt-10 text-gray-500 max-w-2xl">
          <h2 className="text-black font-bold text-xl mb-4">How to use fancy text letters?</h2>
          <p>
            Our <strong>Fancy Letters</strong> collection is perfect for creating unique nicknames and stylish bios for Instagram, 
            TikTok, and gaming profiles. Simply click on any <strong>alphabet symbol</strong> to copy it. These characters are 
            Unicode-based, meaning they will work on most modern websites and apps without issues.
          </p>
        </div>
      </main>

      {/* Toast Notification */}
      {copyStatus && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300 z-[100]">
          <span className="text-3xl font-bold">{copyStatus}</span>
          <div className="w-px h-8 bg-blue-400" />
          <span className="font-bold uppercase tracking-widest text-sm text-white">Copied!</span>
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