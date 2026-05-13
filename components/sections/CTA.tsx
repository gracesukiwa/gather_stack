import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-24 px-5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative bg-gray-900 rounded-5xl p-12 md:p-16 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink/20 morph" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-lime/20 morph animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal/10 morph animate-float" />

          <div className="relative z-10">
            <div className="font-display text-6xl mb-6">🎲</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your next hangout deserves<br />
              <span className="text-pink">better than doom-scrolling.</span>
            </h2>
            <p className="font-body text-gray-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              GatherStack ships anywhere in Indonesia. Order today and have it ready for your next gathering.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/order" className="btn-primary text-lg px-10 py-5">
                Order Now — Rp 149.000
              </Link>
              <Link href="/auth/register" className="btn-ghost text-white text-lg px-10 py-5">
                Create Account First
              </Link>
            </div>
            <p className="mt-6 font-body text-sm text-gray-500">
              Free shipping on orders of 3+ units · Cash on delivery available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
