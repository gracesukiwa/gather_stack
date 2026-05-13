'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { createClient } from '@/lib/supabase/client';
import { ShoppingBag, Package, MapPin, Phone, ChevronDown, ChevronUp } from 'lucide-react';

const UNIT_PRICE = 149000;

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

export default function OrderPage() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    notes: '',
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const total = form.quantity * UNIT_PRICE;
  const freeShipping = form.quantity >= 3;

  const update = (field: string, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const { error: insertError } = await supabase.from('orders').insert({
      user_id: user.id,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      postal_code: form.postal_code,
      notes: form.notes || null,
      quantity: form.quantity,
      unit_price: UNIT_PRICE,
      total_price: total,
      status: 'pending',
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-cream">
        <Navbar />
        <div className="max-w-lg mx-auto px-5 pt-32 pb-16 text-center">
          <div className="card shadow-lg">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Order Placed!</h1>
            <p className="font-body text-gray-600 mb-2">
              We got your order for <strong>{form.quantity}x GatherStack</strong>.
            </p>
            <p className="font-body text-gray-500 text-sm mb-8">
              We&apos;ll confirm via email within 24 hours and ship in 3–5 business days.
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={() => router.push('/dashboard')} className="btn-primary w-full justify-center">
                View My Orders
              </button>
              <button onClick={() => router.push('/')} className="btn-ghost w-full justify-center text-gray-700">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 pt-28 pb-16">
        <div className="mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Order GatherStack 🎲
          </h1>
          <p className="font-body text-gray-600">Fill in your details and we&apos;ll ship it right to you.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="card">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-pink/15 rounded-xl flex items-center justify-center">
                    <Package size={16} className="text-pink" />
                  </div>
                  <h2 className="font-display text-lg font-semibold text-gray-900">Your Info</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Budi Santoso"
                        value={form.full_name}
                        onChange={e => update('full_name', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input
                        type="email"
                        placeholder="budi@email.com"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <Phone size={13} /> Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="08xx-xxxx-xxxx"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping address */}
              <div className="card">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-teal/15 rounded-xl flex items-center justify-center">
                    <MapPin size={16} className="text-teal" />
                  </div>
                  <h2 className="font-display text-lg font-semibold text-gray-900">Shipping Address</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">Street Address *</label>
                    <textarea
                      placeholder="Jl. Sudirman No. 123, RT 01/RW 02"
                      value={form.address}
                      onChange={e => update('address', e.target.value)}
                      className="input-field resize-none h-20"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">City *</label>
                      <input
                        type="text"
                        placeholder="Bandung"
                        value={form.city}
                        onChange={e => update('city', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">Postal Code *</label>
                      <input
                        type="text"
                        placeholder="40123"
                        value={form.postal_code}
                        onChange={e => update('postal_code', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">Notes (optional)</label>
                    <textarea
                      placeholder="Delivery instructions, landmark, etc."
                      value={form.notes}
                      onChange={e => update('notes', e.target.value)}
                      className="input-field resize-none h-16"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red/10 border border-red/20 text-red rounded-2xl px-4 py-3 text-sm font-body">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? 'Placing Order...' : `Place Order — ${formatRupiah(total)} →`}
              </button>
            </form>
          </div>

          {/* Order summary sidebar */}
          <div className="space-y-4">
            <div className="card sticky top-28">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-lime/40 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={16} className="text-gray-700" />
                </div>
                <h2 className="font-display text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>

              {/* Product */}
              <div className="flex items-center gap-3 p-3 bg-cream rounded-2xl mb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-lg">🎲</div>
                <div>
                  <div className="font-display font-semibold text-sm text-gray-900">GatherStack</div>
                  <div className="font-body text-xs text-gray-500">Mini Board Game</div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-5">
                <label className="block font-body text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center border-2 border-black/10 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => update('quantity', Math.max(1, form.quantity - 1))}
                    className="px-4 py-3 hover:bg-cream transition-colors font-bold text-gray-700"
                  >−</button>
                  <span className="flex-1 text-center font-display text-lg font-bold text-gray-900">{form.quantity}</span>
                  <button
                    type="button"
                    onClick={() => update('quantity', Math.min(20, form.quantity + 1))}
                    className="px-4 py-3 hover:bg-cream transition-colors font-bold text-gray-700"
                  >+</button>
                </div>
                {freeShipping && (
                  <div className="mt-2 bg-lime/30 text-gray-700 text-xs font-semibold font-body px-3 py-1.5 rounded-full text-center">
                    🎉 Free shipping applied!
                  </div>
                )}
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 pt-4 border-t border-black/8">
                <div className="flex justify-between font-body text-sm text-gray-600">
                  <span>{form.quantity}x GatherStack</span>
                  <span>{formatRupiah(total)}</span>
                </div>
                <div className="flex justify-between font-body text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className={freeShipping ? 'text-teal font-semibold' : 'text-gray-600'}>
                    {freeShipping ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between font-display text-lg font-bold text-gray-900 pt-2 border-t border-black/8">
                  <span>Total</span>
                  <span className="text-pink">{formatRupiah(total)}</span>
                </div>
              </div>

              <div className="mt-4 bg-yellow/20 rounded-2xl px-4 py-3 text-xs font-body text-gray-600">
                💳 Payment via bank transfer after order confirmation. We&apos;ll send details to your email.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
