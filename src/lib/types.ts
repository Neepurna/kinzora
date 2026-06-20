export interface MenuCategory {
  id: string
  name: string
  slug: string
  display_order: number
}

export interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string | null
  price: number
  unit: string | null
  tag: 'signature' | 'spicy' | 'veg' | null
  image_url: string | null
  is_available: boolean
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  phone: string
  email: string | null
  order_type: 'pickup' | 'delivery'
  address: string | null
  notes: string | null
  subtotal: number
  total: number
  status: OrderStatus
  created_at: string
}

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'ready' | 'completed' | 'cancelled'

export interface OrderItem {
  id: string
  order_id: string
  menu_item_id: string | null
  item_name: string
  quantity: number
  unit_price: number
  total_price: number
}
