'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Order, OrderItem, OrderStatus } from '@/lib/types'
import { Clock, CheckCircle, ChefHat, Package, XCircle, LogOut } from 'lucide-react'

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: 'Pendiente', color: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30', icon: <Clock size={14} /> },
  accepted: { label: 'Aceptado', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30', icon: <CheckCircle size={14} /> },
  preparing: { label: 'Preparando', color: 'bg-orange-500/15 text-orange-400 border-orange-500/30', icon: <ChefHat size={14} /> },
  ready: { label: 'Listo', color: 'bg-green-500/15 text-green-400 border-green-500/30', icon: <Package size={14} /> },
  completed: { label: 'Completado', color: 'bg-[#D6D0C7]/10 text-[#D6D0C7]/50 border-[#D6D0C7]/20', icon: <CheckCircle size={14} /> },
  cancelled: { label: 'Cancelado', color: 'bg-red-500/15 text-red-400 border-red-500/30', icon: <XCircle size={14} /> },
}

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: 'accepted',
  accepted: 'preparing',
  preparing: 'ready',
  ready: 'completed',
}

const nextStatusLabel: Partial<Record<OrderStatus, string>> = {
  pending: 'Aceptar',
  accepted: 'Preparar',
  preparing: 'Listo',
  ready: 'Completar',
}

export default function AdminDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'active' | 'all'>('active')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const orderIdsRef = useRef<Set<string>>(new Set())

  const playNotification = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbsGUcBj+a2telekkWN5HY8markup_audio')
      audioRef.current = new Audio()
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 800
      gain.gain.value = 0.3
      osc.start()
      osc.stop(ctx.currentTime + 0.2)
      setTimeout(() => {
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.frequency.value = 1000
        gain2.gain.value = 0.3
        osc2.start()
        osc2.stop(ctx.currentTime + 0.3)
      }, 250)
    }
  }, [])

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
        return
      }
      loadOrders()
    }
    checkAuth()

    const channel = supabase
      .channel('admin-orders')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          const newOrder = payload.new as Order
          setOrders((prev) => [newOrder, ...prev])
          if (!orderIdsRef.current.has(newOrder.id)) {
            playNotification()
          }
          orderIdsRef.current.add(newOrder.id)
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          const updated = payload.new as Order
          setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)))
          setSelectedOrder((prev) => (prev?.id === updated.id ? updated : prev))
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [router, playNotification])

  async function loadOrders() {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (data) {
      setOrders(data as Order[])
      data.forEach((o) => orderIdsRef.current.add(o.id))
    }
    setLoading(false)
  }

  async function selectOrder(order: Order) {
    setSelectedOrder(order)
    const { data } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id)
    setOrderItems((data as OrderItem[]) ?? [])
  }

  async function updateStatus(orderId: string, status: OrderStatus) {
    await supabase.from('orders').update({ status }).eq('id', orderId)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const filteredOrders = filter === 'active'
    ? orders.filter((o) => !['completed', 'cancelled'].includes(o.status))
    : orders

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#C89B52] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Header */}
      <header className="border-b border-[rgba(200,155,82,0.1)] bg-[#0A0A0A]">
        <div className="px-6 flex items-center justify-between py-4">
          <h1 className="font-heading text-xl font-bold text-[#C89B52]">Kinzora · Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filter === 'active' ? 'bg-[#C89B52] text-[#0A0A0A]' : 'text-[#D6D0C7]/50 hover:text-[#C89B52]'
                }`}
              >
                Activos
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filter === 'all' ? 'bg-[#C89B52] text-[#0A0A0A]' : 'text-[#D6D0C7]/50 hover:text-[#C89B52]'
                }`}
              >
                Todos
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="text-[#D6D0C7]/40 hover:text-red-400 transition-colors cursor-pointer"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Order list */}
        <div className="w-full lg:w-1/2 xl:w-2/5 border-r border-[rgba(200,155,82,0.1)] overflow-y-auto">
          {filteredOrders.length === 0 ? (
            <p className="text-[#D6D0C7]/40 text-sm text-center mt-20">No hay pedidos</p>
          ) : (
            filteredOrders.map((order) => {
              const cfg = statusConfig[order.status]
              const isNew = order.status === 'pending'
              return (
                <button
                  key={order.id}
                  onClick={() => selectOrder(order)}
                  className={`w-full text-left px-6 py-4 border-b border-[rgba(200,155,82,0.06)] hover:bg-[#111] transition-colors cursor-pointer ${
                    selectedOrder?.id === order.id ? 'bg-[#111]' : ''
                  } ${isNew ? 'bg-yellow-500/5' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#F8F4EE] font-semibold text-sm">{order.order_number}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${cfg.color}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D6D0C7]/50 text-xs">{order.customer_name}</span>
                    <span className="text-[#C89B52] text-sm font-medium">
                      {Number(order.total).toFixed(2).replace('.', ',')}€
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[#D6D0C7]/30 text-[10px]">
                      {new Date(order.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-[#D6D0C7]/30 text-[10px] uppercase">
                      {order.order_type === 'pickup' ? 'Recogida' : 'Entrega'}
                    </span>
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Order detail */}
        <div className="hidden lg:flex flex-1 flex-col">
          {selectedOrder ? (
            <div className="p-8 overflow-y-auto">
              <div className="max-w-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-bold text-[#F8F4EE]">
                    {selectedOrder.order_number}
                  </h2>
                  <span className={`text-xs px-3 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusConfig[selectedOrder.status].color}`}>
                    {statusConfig[selectedOrder.status].icon}
                    {statusConfig[selectedOrder.status].label}
                  </span>
                </div>

                {/* Customer info */}
                <div className="glass-dark rounded-xl p-5 mb-4">
                  <h3 className="text-xs text-[#D6D0C7]/50 uppercase tracking-wider mb-3">Cliente</h3>
                  <div className="space-y-1.5 text-sm">
                    <p className="text-[#F8F4EE]">{selectedOrder.customer_name}</p>
                    <p className="text-[#D6D0C7]/60">{selectedOrder.phone}</p>
                    {selectedOrder.email && <p className="text-[#D6D0C7]/60">{selectedOrder.email}</p>}
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div className="glass-dark rounded-xl p-5 mb-4">
                    <h3 className="text-xs text-[#D6D0C7]/50 uppercase tracking-wider mb-2">Notas</h3>
                    <p className="text-[#F8F4EE] text-sm">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Items */}
                <div className="glass-dark rounded-xl p-5 mb-4">
                  <h3 className="text-xs text-[#D6D0C7]/50 uppercase tracking-wider mb-3">Artículos</h3>
                  <div className="space-y-2">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm py-1.5 border-b border-[rgba(200,155,82,0.06)]">
                        <span className="text-[#F8F4EE]">{item.quantity}x {item.item_name}</span>
                        <span className="text-[#C89B52]">{Number(item.total_price).toFixed(2).replace('.', ',')}€</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-3 mt-2 border-t border-[rgba(200,155,82,0.15)]">
                    <span className="text-[#F8F4EE] font-medium">Total</span>
                    <span className="text-[#C89B52] font-bold text-lg">
                      {Number(selectedOrder.total).toFixed(2).replace('.', ',')}€
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {nextStatus[selectedOrder.status] && (
                    <button
                      onClick={() => updateStatus(selectedOrder.id, nextStatus[selectedOrder.status]!)}
                      className="flex-1 py-3 rounded-xl bg-gold-gradient text-[#0A0A0A] font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      {nextStatusLabel[selectedOrder.status]}
                    </button>
                  )}
                  {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'completed' && (
                    <button
                      onClick={() => updateStatus(selectedOrder.id, 'cancelled')}
                      className="px-6 py-3 rounded-xl border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[#D6D0C7]/30 text-sm">Selecciona un pedido para ver detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
