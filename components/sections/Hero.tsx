import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background blobs */}
      <div className="absolute top-20 -right-20 w-80 h-80 bg-pink/20 morph animate-float" />
      <div className="absolute bottom-20 -left-16 w-64 h-64 bg-lime/30 morph animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow/15 morph" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* Text side */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-lime/40 border border-lime px-4 py-2 rounded-full text-sm font-body font-semibold text-gray-700">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            The anti-phone game for your crew
          </div>

          <h1 className="font-display text-6xl md:text-7xl font-bold text-gray-900 leading-[1.05]">
            Put the phones{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-pink">down.</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8 Q100 2 198 8" stroke="#ED769E" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4"/>
              </svg>
            </span>
            <br />
            Pick the fun{' '}
            <span className="text-teal">up.</span>
          </h1>

          <p className="font-body text-lg text-gray-600 leading-relaxed max-w-md">
            GatherStack is a compact portable mini board game designed to spark real conversation, genuine laughter, and actual connection — no screen required.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/order" className="btn-primary text-lg px-8 py-4">
              Order Now — Rp 149.000
            </Link>
            <Link href="/#features" className="btn-ghost text-lg px-8 py-4">
              See How It Works
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-6 pt-2">
            <div className="flex -space-x-2">
              {['#ED769E','#20B8B3','#DEE864','#FFD166','#FA6565'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c }}>
                  {['A','B','C','D','E'][i]}
                </div>
              ))}
            </div>
            <p className="text-sm font-body text-gray-600">
              <strong className="text-gray-900 font-semibold">500+</strong> orders placed this month
            </p>
          </div>
        </div>

        {/* Visual side */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            {/* Main game card mockup */}
            <div className="absolute inset-0 bg-gray-900 rounded-4xl shadow-2xl flex items-center justify-center animate-float">
              <div className="text-center px-8">
                <div className="font-display text-5xl font-bold text-white mb-2">
                  Gather<span className="text-pink">Stack</span>
                </div>
                <div className="w-16 h-1 bg-lime mx-auto mb-4 rounded-full" />
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {['🎯','🎲','🃏','✏️','⏱️','🏆'].map((emoji, i) => (
                    <div key={i} className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="text-white/50 font-body text-xs">Compact • Portable • Fun</div>
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute -top-6 -right-6 bg-lime rounded-2xl px-4 py-2 font-display font-bold text-gray-900 text-sm shadow-lg animate-float-slow">
              2–6 Players 👥
            </div>
            <div className="absolute -bottom-6 -left-6 bg-pink rounded-2xl px-4 py-2 font-display font-bold text-white text-sm shadow-lg animate-bounce-soft">
              15–30 min ⏱️
            </div>
            <div className="absolute top-1/2 -right-12 -translate-y-1/2 bg-teal rounded-2xl px-4 py-2 font-display font-bold text-white text-sm shadow-lg animate-float">
              Ages 12+ 🎉
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
