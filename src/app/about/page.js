import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black mb-4 tracking-tight">About Direop</h1>
        <p className="text-xl text-gray-500 italic">Your ultimate toolkit for special characters and symbols.</p>
      </div>

      <div className="space-y-12">
        {/* Section 1: Our Mission */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">01</span>
            Our Mission
          </h2>
          <p className="leading-relaxed text-gray-600">
            <strong>Direop</strong> was created to solve a simple problem: finding and copying special characters quickly. 
            We believe that formatting your content, writing mathematical equations, or decorating your social media bio 
            shouldn't be a struggle. Our mission is to provide the fastest, cleanest, and most accessible character 
            database on the web.
          </p>
        </section>

        {/* Section 2: Why Direop? */}
        <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">02</span>
            Why Choose Us?
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>One-Click Copy:</strong> No selecting or right-clicking needed.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Pure Unicode:</strong> Our symbols work on iOS, Android, Windows, and macOS.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Minimalist Design:</strong> No annoying pop-ups, just the tools you need.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Categorized:</strong> Easily find Math, Arrows, Letters, and Emojis.</span>
            </li>
          </ul>
        </section>

        {/* Section 3: Technical Integrity */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">03</span>
            Our Technology
          </h2>
          <p className="leading-relaxed text-gray-600">
            Built using modern web technologies like <strong>Next.js</strong> and <strong>Tailwind CSS</strong>, 
            Direop is optimized for speed and reliability. We ensure our library is regularly updated to include 
            the latest Unicode standards.
          </p>
        </section>
      </div>

      <div className="mt-20 pt-10 border-t text-center">
        <Link href="/" className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
          Start Copying Symbols
        </Link>
      </div>
    </div>
  );
}