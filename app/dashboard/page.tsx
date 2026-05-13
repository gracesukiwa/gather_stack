import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/layout/Navbar';
import type { Order } from '@/types';
import { Package, ShoppingBag, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ size?: string | number }> }> = {
  pending: { label: 'Pending', color: 'bg-yellow/30 text-yellow-800 border-yellow/50', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-teal/15 text-teal border-teal/30', icon: CheckCircle },
  shipped: { label: 'Shipped', color: 'bg-pink/15 text-pink border-pink/30', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-lime/30 text-green-800 border-lime/50', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red/10 text-red border-red/20', icon: XCircle },
};

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const totalSpent = orders?.reduce((sum, o) => sum + o.total_price, 0) ?? 0;
  const firstName = (profile?.full_name ?? user.email ?? 'there').split(' ')[0];

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-5 pt-28 pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-1">
              Hey, {firstName}! 👋
            </h1>
            <p className="font-body text-gray-500">Here are all your GatherStack orders.</p>
          </div>
          <Link href="/order" className="btn-primary whitespace-nowrap">
            <ShoppingBag size={16} /> Order More
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <div className="card text-center">
            <div className="font-display text-3xl font-bold text-pink mb-1">{orders?.length ?? 0}</div>
            <div className="font-body text-sm text-gray-500">Total Orders</div>
          </div>
          <div className="card text-center">
            <div className="font-display text-3xl font-bold text-teal mb-1">
              {orders?.reduce((sum, o) => sum + o.quantity, 0) ?? 0}
            </div>
            <div className="font-body text-sm text-gray-500">Games Ordered</div>
          </div>
          <div className="card text-center col-span-2 sm:col-span-1">
            <div className="font-display text-2xl font-bold text-lime-700 mb-1">{formatRupiah(totalSpent)}</div>
            <div className="font-body text-sm text-gray-500">Total Spent</div>
          </div>
        </div>

        {/* Orders list */}
        {!orders || orders.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-5xl mb-4">🎲</div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">No orders yet!</h2>
            <p className="font-body text-gray-500 text-sm mb-6">
              Your first GatherStack is just a click away.
            </p>
            <Link href="/order" className="btn-primary">
              Place Your First Order →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-gray-900">Order History</h2>
            {orders.map((order: Order) => {
              const status = statusConfig[order.status] ?? statusConfig.pending;
              const StatusIcon = status.icon;
              return (
                <div key={order.id} className="card hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-xl shrink-0">
                        🎲
                      </div>
                      <div>
                        <div className="font-display font-semibold text-gray-900 mb-0.5">
                          {order.quantity}x GatherStack
                        </div>
                        <div className="font-body text-xs text-gray-500 mb-2">
                          {formatDate(order.created_at)} · Order #{order.id.slice(0, 8).toUpperCase()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`badge border ${status.color}`}>
                            <StatusIcon size={12} />
                            <span className="ml-1">{status.label}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-lg font-bold text-gray-900">
                        {formatRupiah(order.total_price)}
                      </div>
                      <div className="font-body text-xs text-gray-400">
                        {formatRupiah(order.unit_price)} each
                      </div>
                    </div>
                  </div>
                  {order.address && (
                    <div className="mt-4 pt-4 border-t border-black/5 font-body text-xs text-gray-400">
                      📍 Ships to: {order.address}, {order.city} {order.postal_code}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
