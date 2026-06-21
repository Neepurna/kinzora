'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'

type PaymentMethod = 'efectivo' | 'tarjeta'
type OrderType = 'delivery' | 'pickup'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const subtotal = useCartStore((s) => s.subtotal)
  const clearCart = useCartStore((s) => s.clearCart)

  const [orderType, setOrderType] = useState<OrderType>('delivery')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [numGuests, setNumGuests] = useState<string>('')
  const [payment, setPayment] = useState<PaymentMethod>('efectivo')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isPickup = orderType === 'pickup'
  const phoneValid = phone.replace(/\D/g, '').length >= 9
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const addressValid = isPickup || (address.trim() && zip.trim() && city.trim())
  const formValid = name.trim() && emailValid && phoneValid && addressValid

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (items.length === 0) return
    if (!formValid) {
      setError('Por favor completa todos los campos obligatorios correctamente')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          order_type: orderType,
          address: isPickup ? null : address.trim(),
          zip: isPickup ? null : zip.trim(),
          city: isPickup ? null : city.trim(),
          delivery_time: deliveryTime.trim() || null,
          num_guests: numGuests ? Number(numGuests) : null,
          payment_method: payment,
          notes: notes.trim() || null,
          items: items.map((ci) => ({
            menu_item_id: ci.menuItem.id,
            item_name: ci.menuItem.name,
            quantity: ci.quantity,
            unit_price: ci.menuItem.price,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al enviar pedido')
        setSubmitting(false)
        return
      }

      clearCart()
      router.push(`/order/${data.orderId}`)
    } catch {
      setError('Error de conexión. Inténtelo de nuevo.')
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#D6D0C7]/60 text-lg mb-4">Tu carrito está vacío</p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-[#C89B52] hover:underline"
          >
            <ArrowLeft size={16} /> Volver al menú
          </Link>
        </div>
      </div>
    )
  }

  const fieldClass =
    'w-full bg-[#111] border border-[rgba(200,155,82,0.15)] rounded-xl px-4 py-3 text-[#F8F4EE] text-sm focus:outline-none focus:border-[#C89B52]/50 transition-colors'
  const labelClass =
    'block text-xs text-[#D6D0C7]/60 uppercase tracking-wider mb-1.5'

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="border-b border-[rgba(200,155,82,0.1)]">
        <div className="kinzora-container flex items-center gap-4 py-4">
          <Link href="/menu" className="text-[#D6D0C7]/60 hover:text-[#C89B52] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-heading text-xl font-bold text-[#F8F4EE]">Finalizar Pedido</h1>
        </div>
      </header>

      <div className="kinzora-container py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Order type toggle */}
            <div className="glass-dark rounded-2xl p-6">
              <h2 className="font-heading text-lg font-semibold text-[#C89B52] mb-4">¿Cómo quieres tu pedido?</h2>
              <div className="grid grid-cols-2 gap-3">
                {(['delivery', 'pickup'] as OrderType[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setOrderType(opt)}
                    className={`py-4 rounded-xl border text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                      orderType === opt
                        ? 'bg-gold-gradient text-[#0A0A0A] border-transparent'
                        : 'text-[#D6D0C7]/70 border-[rgba(200,155,82,0.2)] hover:border-[rgba(200,155,82,0.5)]'
                    }`}
                  >
                    {opt === 'delivery' ? 'Entrega a domicilio' : 'Recogida en restaurante'}
                  </button>
                ))}
              </div>
              {isPickup && (
                <p className="text-xs text-[#D6D0C7]/50 mt-3">
                  C/ Vizconde de Matamala, 5 · Salamanca, Madrid
                </p>
              )}
            </div>

            <div className="glass-dark rounded-2xl p-6">
              <h2 className="font-heading text-lg font-semibold text-[#C89B52] mb-4">Datos de contacto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Nombre completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className={labelClass}>Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={fieldClass}
                    placeholder="+34 612 345 678"
                  />
                </div>
              </div>
            </div>

            {!isPickup && (
              <div className="glass-dark rounded-2xl p-6">
                <h2 className="font-heading text-lg font-semibold text-[#C89B52] mb-4">Dirección de entrega</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Dirección *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={fieldClass}
                      placeholder="Calle, número, piso"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Código postal *</label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className={fieldClass}
                      placeholder="28028"
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Ciudad *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={fieldClass}
                      placeholder="Madrid"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="glass-dark rounded-2xl p-6">
              <h2 className="font-heading text-lg font-semibold text-[#C89B52] mb-4">Detalles del pedido</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={isPickup ? 'sm:col-span-2' : ''}>
                  <label className={labelClass}>
                    {isPickup ? 'Hora de recogida' : 'Hora de entrega'}
                  </label>
                  <input
                    type="time"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                {!isPickup && (
                  <div>
                    <label className={labelClass}>Número de comensales</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={numGuests}
                      onChange={(e) => setNumGuests(e.target.value)}
                      className={fieldClass}
                      placeholder="2"
                    />
                  </div>
                )}
                <div className="sm:col-span-2">
                  <label className={labelClass}>Forma de pago *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['efectivo', 'tarjeta'] as PaymentMethod[]).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPayment(opt)}
                        className={`py-3 rounded-xl border text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                          payment === opt
                            ? 'bg-gold-gradient text-[#0A0A0A] border-transparent'
                            : 'text-[#D6D0C7]/70 border-[rgba(200,155,82,0.2)] hover:border-[rgba(200,155,82,0.5)]'
                        }`}
                      >
                        {opt === 'efectivo' ? 'Efectivo' : 'Tarjeta'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Información adicional</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className={`${fieldClass} resize-none`}
                    placeholder={
                      isPickup
                        ? 'Alergias, peticiones especiales...'
                        : 'Alergias, peticiones especiales, indicaciones de entrega...'
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="glass-dark rounded-2xl p-6 sticky top-20">
              <h2 className="font-heading text-lg font-semibold text-[#C89B52] mb-4">Resumen del pedido</h2>

              <div className="space-y-3 mb-6">
                {items.map((ci) => (
                  <div key={ci.menuItem.id} className="flex items-center justify-between gap-3 py-2 border-b border-[rgba(200,155,82,0.06)]">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F8F4EE] text-sm truncate">{ci.menuItem.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => ci.quantity === 1 ? removeItem(ci.menuItem.id) : updateQuantity(ci.menuItem.id, ci.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-[#C89B52]/20 flex items-center justify-center text-[#C89B52] hover:bg-[#C89B52]/10 cursor-pointer"
                      >
                        {ci.quantity === 1 ? <Trash2 size={10} /> : <Minus size={10} />}
                      </button>
                      <span className="text-[#F8F4EE] text-sm w-4 text-center">{ci.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(ci.menuItem.id, ci.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-[#C89B52]/20 flex items-center justify-center text-[#C89B52] hover:bg-[#C89B52]/10 cursor-pointer"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                    <span className="text-[#C89B52] text-sm font-medium w-16 text-right">
                      {(Number(ci.menuItem.price) * ci.quantity).toFixed(2).replace('.', ',')}€
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center py-3 border-t border-[rgba(200,155,82,0.15)]">
                <span className="text-[#F8F4EE] font-medium">Total</span>
                <span className="text-[#C89B52] font-bold text-lg">
                  {subtotal().toFixed(2).replace('.', ',')}€
                </span>
              </div>

              {error && (
                <p className="text-red-400 text-sm mt-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting || !formValid}
                className="w-full mt-4 py-3.5 rounded-xl bg-gold-gradient text-[#0A0A0A] font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity cursor-pointer"
              >
                {submitting ? 'Enviando...' : 'Confirmar Pedido'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
