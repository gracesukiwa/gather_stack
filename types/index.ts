export type UserRole = 'customer' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: OrderStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderWithProfile extends Order {
  profiles?: Profile;
}
