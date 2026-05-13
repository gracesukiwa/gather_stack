'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Order, OrderStatus } from '@/types';
import { Package, TrendingUp, Users, Truck, CheckCircle, Clock, XCircle, ChevronDown, Search } from 'lucide-react';

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-yellow/30 text-yellow-800 border-yellow/50' },
  confirmed: { label: 'Confirmed', color: 'bg-teal/15 text-teal border-teal/30' },
  shipped: { label: 'Shipped', color: 'bg-pink/15 text-pink border-pink/30' },
  delivered: { label: 'Delivered', color: 'bg-lime/30 text-green-800 border-lime/50' },
  cancelled: { label: 'Cancelled', color: 'bg-red/10 text-red border-red/20' },
};

const statuses: OrderStatus[] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

interface Props {
  orders: Order[];
  stats: {
    total: number; pending: number; confirmed: number;
    shipped: number; delivered: number; revenue: number; units: number;
  };
}

export default function AdminClient({ orders: initialOrders, stats }: Props) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [updating, setUpdating] = useState<string | null>(null);
  const supabase = createClient();

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdating(orderId);
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (!error) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
    setUpdating(null);
  };

  const filtered = orders.filter(o => {
    const matchSearch = !search ||
      o.full_name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.city.toLowerCase().includes(search.toLowerCase()) ||
      o.id.includes(search);
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <main className="min-h-screen bg-cream">
      {/* Admin header */}
      <div className="bg-gray-900 px-5 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold text-white">
          Gather<span className="text-pink">Stack</span>
          <span className="ml-3 text-xs font-body bg-pink/20 text-pink px-2 py-0.5 rounded-full">Admin</span>
        </Link>
        <Link href="/dashboard" className="font-body text-sm text-gray-400 hover:text-white transition-colors">
          ← Customer View
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-1">Order Dashboard</h1>
          <p className="font-body text-gray-500">Manage all incoming GatherStack orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="card text-center col-span-2 sm:col-span-2 lg:col-span-2 bg-gray-900">
            <div className="font-display text-3xl font-bold text-lime mb-0.5">{formatRupiah(stats.revenue)}</div>
            <div className="font-body text-xs text-gray-400">Total Revenue</div>
          </div>
          <div className="card text-center">
            <div className="font-display text-2xl font-bold text-gray-900 mb-0.5">{stats.total}</div>
            <div className="font-body text-xs text-gray-500">All Orders</div>
          </div>
          <div className="card text-center">
            <div className="font-display text-2xl font-bold text-yellow-600 mb-0.5">{stats.pending}</div>
            <div className="font-body text-xs text-gray-500">Pending</div>
          </div>
          <div className="card text-center">
            <div className="font-display text-2xl font-bold text-teal mb-0.5">{stats.confirmed}</div>
            <div className="font-body text-xs text-gray-500">Confirmed</div>
          </div>
          <div className="card text-center">
            <div className="font-display text-2xl font-bold text-pink mb-0.5">{stats.shipped}</div>
            <div className="font-body text-xs text-gray-500">Shipped</div>
          </div>
          <div className="card text-center">
            <div className="font-display text-2xl font-bold text-green-600 mb-0.5">{stats.units}</div>
            <div className="font-body text-xs text-gray-500">Units Sold</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, city, order ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', ...statuses].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-xl font-body text-sm font-medium transition-all ${
                  filterStatus === s
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-cream border border-black/8'
                }`}
              >
                {s === 'all' ? 'All' : statusConfig[s as OrderStatus].label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders table */}
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/8">
                  <th className="text-left font-display text-sm font-semibold text-gray-600 px-5 py-3.5">Order</th>
                  <th className="text-left font-display text-sm font-semibold text-gray-600 px-5 py-3.5">Customer</th>
                  <th className="text-left font-display text-sm font-semibold text-gray-600 px-5 py-3.5">Address</th>
                  <th className="text-left font-display text-sm font-semibold text-gray-600 px-5 py-3.5">Qty</th>
                  <th className="text-left font-display text-sm font-semibold text-gray-600 px-5 py-3.5">Total</th>
                  <th className="text-left font-display text-sm font-semibold text-gray-600 px-5 py-3.5">Status</th>
                  <th className="text-left font-display text-sm font-semibold text-gray-600 px-5 py-3.5">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center font-body text-gray-400 py-16">
                      No orders found matching your search.
                    </td>
                  </tr>
                ) : filtered.map((order, i) => (
                  <tr key={order.id} className={`border-b border-black/5 hover:bg-cream/50 transition-colors ${i % 2 === 0 ? '' : 'bg-cream/30'}`}>
                    <td className="px-5 py-4">
                      <div className="font-body text-xs text-gray-400 font-mono">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-body font-medium text-gray-900 text-sm">{order.full_name}</div>
                      <div className="font-body text-xs text-gray-400">{order.email}</div>
                      <div className="font-body text-xs text-gray-400">{order.phone}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-body text-sm text-gray-700 max-w-[180px] truncate">{order.address}</div>
                      <div className="font-body text-xs text-gray-400">{order.city} {order.postal_code}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-display text-lg font-bold text-gray-900">{order.quantity}</span>
                      <span className="font-body text-xs text-gray-400 ml-1">pcs</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-display font-bold text-pink">{formatRupiah(order.total_price)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="relative group">
                        <select
                          value={order.status}
                          onChange={e => updateStatus(order.id, e.target.value as OrderStatus)}
                          disabled={updating === order.id}
                          className={`badge border cursor-pointer appearance-none pr-6 ${statusConfig[order.status].color} disabled:opacity-50`}
                        >
                          {statuses.map(s => (
                            <option key={s} value={s}>{statusConfig[s].label}</option>
                          ))}
                        </select>
                        <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                      </div>
                      {updating === order.id && (
                        <div className="text-xs text-teal font-body mt-1">Saving...</div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-body text-xs text-gray-500 whitespace-nowrap">{formatDate(order.created_at)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-black/5 font-body text-xs text-gray-400">
              Showing {filtered.length} of {orders.length} orders
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
