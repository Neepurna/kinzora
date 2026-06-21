'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, ChefHat, Package, ArrowLeft, Copy, Check, Phone, Home } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Order, OrderItem, OrderStatus } from '@/lib/types'

const statusSteps: { key: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { key: 'pending', label: 'Recibido', icon: <Clock size={16} /> },
  { key: 'accepted', label: 'Aceptado', icon: <CheckCircle2 size={16} /> },
  { key: 'preparing', label: 'Preparando', icon: <ChefHat size={16} /> },
  { key: 'ready', label: 'Listo', icon: <Package size={16} /> },
  { key: 'completed', label: 'Completado', icon: <CheckCircle2 size={16} /> },
]

function getStepIndex(status: OrderStatus) {
  if (status === 'cancelled') return -1
  return statusSteps.findIndex((s) => s.key === status)
}

export default function OrderTrackingPage() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [items, setItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function load() {
      const [orderRes, itemsRes] = await Promise.all([
        supabase.from('orders').select('*').eq('id', id).single(),
        supabase.from('order_items').select('*').eq('order_id', id),
      ])
      if (orderRes.data) setOrder(orderRes.data as Order)
      if (itemsRes.data) setItems(itemsRes.data as OrderItem[])
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`order-${id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${id}` },
        (payload) => setOrder(payload.new as Order)
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [id])

  async function copyOrderNumber() {
    if (!order) return
    await navigator.clipboard.writeText(order.order_number)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#C89B52] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#D6D0C7]/60 text-lg mb-4">Pedido no encontrado</p>
          <Link href="/menu" className="text-[#C89B52] hover:underline inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Volver al menú
          </Link>
        </div>
      </div>
    )
  }

  const currentStep = getStepIndex(order.status)
  const cancelled = order.status === 'cancelled'

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="kinzora-container py-10 max-w-2xl mx-auto">
        {/* Celebratory hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative glass-dark rounded-3xl p-8 md:p-10 mb-6 overflow-hidden text-center"
        >
          {/* Background glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,155,82,0.18) 0%, transparent 70%)',
            }}
          />

          {/* Check badge */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.15, damping: 12, stiffness: 200 }}
            className="relative mx-auto w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center shadow-[0_8px_32px_-8px_rgba(200,155,82,0.6)] mb-6"
          >
            <CheckCircle2 size={40} className="text-[#0A0A0A]" strokeWidth={2.5} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-jp text-[#C89B52] text-xs tracking-[0.5em] uppercase mb-3"
          >
            ありがとう
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-heading text-3xl md:text-4xl font-bold text-[#F8F4EE] mb-3"
          >
            ¡Gracias por tu <span className="text-gold-gradient italic">pedido</span>!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-[#D6D0C7]/70 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-7"
          >
            Estamos preparando tu pedido con todo el cariño. Te contactaremos en cuanto esté listo para la entrega.
          </motion.p>

          {/* Order ID chip */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            onClick={copyOrderNumber}
            className="relative inline-flex items-center gap-3 px-5 py-3 rounded-full border border-[rgba(200,155,82,0.3)] bg-[rgba(200,155,82,0.06)] hover:bg-[rgba(200,155,82,0.12)] transition-colors cursor-pointer group"
          >
            <span className="text-[10px] text-[#D6D0C7]/50 uppercase tracking-[0.2em]">Pedido</span>
            <span className="font-heading text-[#C89B52] font-bold text-base tracking-wider">
              {order.order_number}
            </span>
            <span className="text-[#C89B52]/70 group-hover:text-[#C89B52] transition-colors">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </span>
          </motion.button>

          {copied && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#C89B52] text-xs mt-2"
            >
              Copiado al portapapeles
            </motion.p>
          )}
        </motion.div>

        {/* Status tracker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-dark rounded-2xl p-6 mb-6"
        >
          <h2 className="font-heading text-sm font-semibold text-[#C89B52] uppercase tracking-wider mb-5">
            Estado del pedido
          </h2>
          {cancelled ? (
            <div className="text-center py-4">
              <p className="text-red-400 font-semibold text-lg">Pedido Cancelado</p>
              <p className="text-[#D6D0C7]/50 text-sm mt-1">
                Contacta con el restaurante para más información
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              {statusSteps.map((step, i) => (
                <div key={step.key} className="flex-1 flex flex-col items-center relative">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors z-10 ${
                      i <= currentStep
                        ? 'bg-[#C89B52] text-[#0A0A0A]'
                        : 'bg-[#1a1a1a] text-[#D6D0C7]/30 border border-[rgba(200,155,82,0.1)]'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`text-[9px] mt-2 tracking-wider uppercase text-center ${
                      i <= currentStep ? 'text-[#C89B52]' : 'text-[#D6D0C7]/30'
                    }`}
                  >
                    {step.label}
                  </span>
                  {i < statusSteps.length - 1 && (
                    <div
                      className={`absolute top-[18px] left-[calc(50%+18px)] right-[calc(-50%+18px)] h-px ${
                        i < currentStep ? 'bg-[#C89B52]' : 'bg-[rgba(200,155,82,0.1)]'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Order details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-dark rounded-2xl p-6 mb-6"
        >
          <h2 className="font-heading text-sm font-semibold text-[#C89B52] uppercase tracking-wider mb-4">
            Detalle del pedido
          </h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm py-2 border-b border-[rgba(200,155,82,0.06)]"
              >
                <span className="text-[#F8F4EE]">
                  <span className="text-[#D6D0C7]/50 mr-2">{item.quantity}×</span>
                  {item.item_name}
                </span>
                <span className="text-[#C89B52] font-medium">
                  {Number(item.total_price).toFixed(2).replace('.', ',')}€
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-[rgba(200,155,82,0.15)]">
            <span className="text-[#F8F4EE] font-medium">Total</span>
            <span className="text-[#C89B52] font-bold text-xl">
              {Number(order.total).toFixed(2).replace('.', ',')}€
            </span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <a
            href="tel:663108134"
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[rgba(200,155,82,0.3)] text-[#C89B52] text-sm font-medium hover:bg-[rgba(200,155,82,0.06)] transition-colors cursor-pointer"
          >
            <Phone size={15} /> Llamar al restaurante
          </a>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-gradient text-[#0A0A0A] text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Home size={15} /> Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
