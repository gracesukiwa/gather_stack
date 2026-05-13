import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5 py-12">
      {/* Background blobs */}
      <div className="fixed top-0 right-0 w-80 h-80 bg-pink/15 morph animate-float pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-lime/20 morph animate-float-slow pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-3xl font-bold text-gray-900 hover:text-pink transition-colors">
            Gather<span className="text-pink">Stack</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
