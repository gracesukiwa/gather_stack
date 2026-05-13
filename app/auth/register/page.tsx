'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Create profile row
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: fullName,
        role: 'customer',
      });
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => router.push('/auth/login'), 3000);
  };

  if (success) {
    return (
      <div className="card shadow-lg border border-black/8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">You&apos;re in!</h2>
        <p className="font-body text-gray-500 text-sm mb-4">
          Check your email to confirm your account, then you&apos;re ready to order.
        </p>
        <p className="font-body text-xs text-gray-400">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="card shadow-lg border border-black/8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Join GatherStack 🎲</h1>
        <p className="font-body text-gray-500 text-sm">Create an account to order and track your games.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="input-field pl-10"
            required
          />
        </div>

        <div className="relative">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-field pl-10"
            required
          />
        </div>

        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPw ? 'text' : 'password'}
            placeholder="Create a password (min 6 chars)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-field pl-10 pr-10"
            minLength={6}
            required
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && (
          <div className="bg-red/10 border border-red/20 text-red rounded-2xl px-4 py-3 text-sm font-body">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        >
          {loading ? 'Creating account...' : 'Create Account →'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="font-body text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-pink font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
