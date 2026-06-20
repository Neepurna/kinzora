import { supabase } from '@/lib/supabase'
import type { MenuCategory, MenuItem } from '@/lib/types'
import MenuOrderView from './menu-order-view'

export default async function MenuPage() {
  const { data: categories } = await supabase
    .from('menu_categories')
    .select('*')
    .order('display_order')

  const { data: items } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_available', true)

  return (
    <MenuOrderView
      categories={(categories as MenuCategory[]) ?? []}
      items={(items as MenuItem[]) ?? []}
    />
  )
}
