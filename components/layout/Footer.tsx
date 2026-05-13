import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-5 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <div className="font-display text-3xl font-bold mb-3">
              Gather<span className="text-pink">Stack</span>
            </div>
            <p className="font-body text-gray-400 text-sm leading-relaxed">
              Put the phones down. Pick the fun up. A compact board game built for real human connection.
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            <div>
              <div className="font-display text-lg font-semibold mb-4 text-lime">Product</div>
              <ul className="space-y-2 text-sm font-body text-gray-400">
                <li><Link href="/#features" className="hover:text-white transition-colors">How it Works</Link></li>
                <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/order" className="hover:text-white transition-colors">Order</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-display text-lg font-semibold mb-4 text-lime">Account</div>
              <ul className="space-y-2 text-sm font-body text-gray-400">
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/auth/register" className="hover:text-white transition-colors">Register</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">My Orders</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-gray-500 text-sm">© 2025 GatherStack. All rights reserved.</p>
          <p className="font-body text-gray-600 text-xs">Made with ♥ for people who actually want to hang out</p>
        </div>
      </div>
    </footer>
  );
}
