"use client";
import { useState } from "react";
import Link from "next/link";

export default function EmojiPage() {
  const [copyStatus, setCopyStatus] = useState(null);

  // قائمة الإيموجي الأكثر شعبية وتنوعاً
  const emojiSymbols = [
    "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "❤️","🔥","✨","🎉","✅","✔️","❌","⚠️","⭐","🌟",
    "💰","💸","💵","💶","💷","💳","🏦","📈","📉","🪙",
"🤑","📊","🧾","🧮","💼","🏷️"
,"⏰","⏳","⌛","🕒","🕘","📅","🗓️","⏱️","⏲️","🕰️"
,"🌍","🌎","🌏","🗺️","✈️","🚗","🚀","🏖️","🏔️","🌄",
"🌅","☀️","🌙","⭐","💻","🖥️","📱","⌨️","🖱️","🧑‍💻","👨‍💻","👩‍💻",
"⚙️","🛠️","🧩","🧪","📡","🔌"
,"⬛","⬜","◼️","◻️","◾","◽","▪️","▫️",
"🔵","🔴","🟢","🟡","🟣","🟠"
,

"💯","🙏","👍","👎","👌","🙌","👏","🤝","💪","🫶","📌","📍","📝","✏️","🧠","📢","📣","📲","💬","🗨️",
"🔗","🔔","📎","🧷","🧲","📦","📊","📈","📉"

,"🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙",
    "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥",
    "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "😎", "🤓",
    "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣",
    "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾",
    "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉", "🙊", "💌", "💘", "💝", "💖", "💗", "💓"
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
              placeholder="Search emojis..." 
              className="w-full md:w-80 bg-gray-100 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-black transition-all"
            /> */}
          </div>

          {/* Navbar */}
              <nav className="flex gap-6 mt-6 overflow-x-auto pb-2 border-b-2 border-transparent">
            <Link href="/" className="text-gray-500 hover:text-black font-bold">Symbols</Link>
            <Link href="/special-characters-letters" className="text-gray-500 hover:text-black font-bold">Letters</Link>
            <Link href="/special-characters-math" className="text-gray-500 hover:text-black font-bold">Math</Link>
            <Link href="/special-characters-numbers" className="text-gray-500 hover:text-black font-bold">Numbers</Link>
            <Link href="/special-characters-arrows" className="text-gray-500 hover:text-black font-bold">Arrows</Link>
            <Link href="/special-characters-emoji" className="  font-bold border-b-2 border-black pb-1">Emoji</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* <h1 className="text-2xl font-bold mb-6 italic">Popular Emojis & Smileys to Copy</h1> */}
               <div className=" mb-[20px] ">
          <h1 className="text-2xl font-bold ">Popular Emojis & Smileys to Copy</h1>
        <span className=" text-[15px] text-amber-600 ">Click on any special character above to copy it to your clipboard instantly.</span>
      </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {emojiSymbols.map((s, i) => (
            <button
              key={i}
              onClick={() => copyToClipboard(s)}
              className="h-16 flex items-center justify-center text-3xl border rounded-lg hover:bg-yellow-400 hover:scale-110 transition-all active:scale-90"
            >
              {s}
            </button>
          ))}
        </div>

        {/* SEO Text Section for Emojis */}
        <div className="mt-20 border-t pt-10 text-gray-500 max-w-2xl">
          <h2 className="text-black font-bold text-xl mb-4">Express yourself with trending emojis</h2>
          <p>
            Find the perfect <strong>emoji for your social media</strong> posts. Our vast collection of smileys, 
            hearts, and icons is ready to use on Instagram, WhatsApp, TikTok, and more. 
            Simply click on any <strong>emoji symbol</strong> to copy it to your clipboard. 
            No more searching through your keyboard—get the icons you need fast and free!
          </p>
        </div>
      </main>

      {/* Toast Notification */}
      {copyStatus && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-black border-2 border-black px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300 z-[100]">
          <span className="text-3xl font-bold">{copyStatus}</span>
          <div className="w-px h-8 bg-black/20" />
          <span className="font-bold uppercase tracking-widest text-sm">Emoji Copied!</span>
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