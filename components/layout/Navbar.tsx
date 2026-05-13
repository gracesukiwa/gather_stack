'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { Menu, X, ShoppingBag, LayoutDashboard, LogOut } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-bold text-gray-900 hover:text-pink transition-colors">
          Gather<span className="text-pink">Stack</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/#features" className="px-4 py-2 font-body font-medium text-gray-700 hover:text-pink transition-colors rounded-xl hover:bg-pink/10">
            How it Works
          </Link>
          <Link href="/#about" className="px-4 py-2 font-body font-medium text-gray-700 hover:text-pink transition-colors rounded-xl hover:bg-pink/10">
            About
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-1.5 px-4 py-2 font-body font-medium text-gray-700 hover:text-teal transition-colors rounded-xl hover:bg-teal/10">
                <LayoutDashboard size={16} /> My Orders
              </Link>
              <Link href="/order" className="btn-primary text-sm px-5 py-2.5">
                <ShoppingBag size={16} /> Order Now
              </Link>
              <button onClick={handleSignOut} className="p-2 text-gray-500 hover:text-red transition-colors rounded-xl hover:bg-red/10">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="px-4 py-2 font-body font-medium text-gray-700 hover:text-pink transition-colors rounded-xl hover:bg-pink/10">
                Login
              </Link>
              <Link href="/auth/register" className="btn-primary text-sm px-5 py-2.5">
                Get Yours →
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-pink/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-black/5 px-5 py-4 flex flex-col gap-2">
          <Link href="/#features" className="px-4 py-3 font-body font-medium text-gray-700 rounded-2xl hover:bg-cream" onClick={() => setMenuOpen(false)}>How it Works</Link>
          <Link href="/#about" className="px-4 py-3 font-body font-medium text-gray-700 rounded-2xl hover:bg-cream" onClick={() => setMenuOpen(false)}>About</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="px-4 py-3 font-body font-medium text-teal rounded-2xl hover:bg-teal/10" onClick={() => setMenuOpen(false)}>My Orders</Link>
              <Link href="/order" className="btn-primary text-center" onClick={() => setMenuOpen(false)}>Order Now</Link>
              <button onClick={handleSignOut} className="px-4 py-3 font-body font-medium text-red text-left rounded-2xl hover:bg-red/10">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="px-4 py-3 font-body font-medium text-gray-700 rounded-2xl hover:bg-cream" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/auth/register" className="btn-primary text-center" onClick={() => setMenuOpen(false)}>Get Yours →</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
