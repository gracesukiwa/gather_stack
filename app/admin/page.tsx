import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminClient from './AdminClient';

export default async function AdminPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  const stats = {
    total: orders?.length ?? 0,
    pending: orders?.filter(o => o.status === 'pending').length ?? 0,
    confirmed: orders?.filter(o => o.status === 'confirmed').length ?? 0,
    shipped: orders?.filter(o => o.status === 'shipped').length ?? 0,
    delivered: orders?.filter(o => o.status === 'delivered').length ?? 0,
    revenue: orders?.reduce((sum, o) => sum + o.total_price, 0) ?? 0,
    units: orders?.reduce((sum, o) => sum + o.quantity, 0) ?? 0,
  };

  return <AdminClient orders={orders ?? []} stats={stats} />;
}
