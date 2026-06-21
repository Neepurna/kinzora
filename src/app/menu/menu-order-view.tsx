'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Plus, Minus, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/cart-store'
import type { MenuCategory, MenuItem } from '@/lib/types'

const tagStyles = {
  signature: { label: 'Especial', color: 'text-[#C89B52] border-[#C89B52]/30 bg-[#C89B52]/8' },
  spicy: { label: 'Picante', color: 'text-[#C73B2D] border-[#C73B2D]/30 bg-[#C73B2D]/8' },
  veg: { label: 'Vegetal', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/8' },
}

function MenuItemCard({ item }: { item: MenuItem }) {
  const addItem = useCartStore((s) => s.addItem)
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  const cartItem = items.find((i) => i.menuItem.id === item.id)
  const qty = cartItem?.quantity ?? 0

  return (
    <div className="group flex items-start justify-between gap-4 py-4 border-b border-[rgba(200,155,82,0.08)] hover:border-[rgba(200,155,82,0.2)] transition-colors duration-200">
      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-[rgba(200,155,82,0.05)] border border-[rgba(200,155,82,0.08)] flex items-center justify-center">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-jp text-[#C89B52]/30 text-xl">寿</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#F8F4EE] font-medium text-sm group-hover:text-[#C89B52] transition-colors duration-200">
            {item.name}
          </span>
          {item.unit && (
            <span className="text-[10px] text-[#D6D0C7]/40 uppercase tracking-wider">
              ({item.unit})
            </span>
          )}
          {item.tag && (
            <span className={`text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider ${tagStyles[item.tag].color}`}>
              {tagStyles[item.tag].label}
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-[#D6D0C7]/50 mt-1 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-[#C89B52] font-semibold text-sm whitespace-nowrap">
          {Number(item.price).toFixed(2).replace('.', ',')}€
        </span>

        {qty === 0 ? (
          <button
            onClick={() => addItem(item)}
            className="w-8 h-8 rounded-full border border-[#C89B52]/30 flex items-center justify-center text-[#C89B52] hover:bg-[#C89B52]/10 transition-colors cursor-pointer"
          >
            <Plus size={14} />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => qty === 1 ? removeItem(item.id) : updateQuantity(item.id, qty - 1)}
              className="w-7 h-7 rounded-full border border-[#C89B52]/30 flex items-center justify-center text-[#C89B52] hover:bg-[#C89B52]/10 transition-colors cursor-pointer"
            >
              <Minus size={12} />
            </button>
            <span className="text-[#F8F4EE] text-sm font-medium w-5 text-center">{qty}</span>
            <button
              onClick={() => addItem(item)}
              className="w-7 h-7 rounded-full border border-[#C89B52]/30 flex items-center justify-center text-[#C89B52] hover:bg-[#C89B52]/10 transition-colors cursor-pointer"
            >
              <Plus size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CartSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)
  const subtotal = useCartStore((s) => s.subtotal)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0A0A0A] border-l border-[rgba(200,155,82,0.15)] z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[rgba(200,155,82,0.1)]">
              <h2 className="font-heading text-xl font-semibold text-[#F8F4EE]">Tu Pedido</h2>
              <button onClick={onClose} className="text-[#D6D0C7]/60 hover:text-[#F8F4EE] cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <p className="text-[#D6D0C7]/50 text-sm text-center mt-12">Tu carrito está vacío</p>
              ) : (
                <div className="space-y-4">
                  {items.map((ci) => (
                    <div key={ci.menuItem.id} className="flex items-center justify-between gap-3 py-3 border-b border-[rgba(200,155,82,0.08)]">
                      <div className="flex-1 min-w-0">
                        <p className="text-[#F8F4EE] text-sm font-medium truncate">{ci.menuItem.name}</p>
                        <p className="text-[#C89B52] text-xs mt-0.5">
                          {(Number(ci.menuItem.price) * ci.quantity).toFixed(2).replace('.', ',')}€
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => ci.quantity === 1 ? removeItem(ci.menuItem.id) : updateQuantity(ci.menuItem.id, ci.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-[#C89B52]/30 flex items-center justify-center text-[#C89B52] hover:bg-[#C89B52]/10 cursor-pointer"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-[#F8F4EE] text-sm w-4 text-center">{ci.quantity}</span>
                        <button
                          onClick={() => updateQuantity(ci.menuItem.id, ci.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-[#C89B52]/30 flex items-center justify-center text-[#C89B52] hover:bg-[#C89B52]/10 cursor-pointer"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[rgba(200,155,82,0.1)] space-y-4">
                <div className="flex justify-between text-[#F8F4EE]">
                  <span className="font-medium">Total</span>
                  <span className="font-semibold text-[#C89B52]">{subtotal().toFixed(2).replace('.', ',')}€</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-3 rounded-xl border border-[rgba(200,155,82,0.2)] text-[#D6D0C7]/60 text-sm hover:border-[rgba(200,155,82,0.4)] transition-colors cursor-pointer"
                  >
                    Vaciar
                  </button>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl bg-gold-gradient text-[#0A0A0A] text-sm font-semibold text-center flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Pedir <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function MenuOrderView({
  categories,
  items,
}: {
  categories: MenuCategory[]
  items: MenuItem[]
}) {
  const [activeTab, setActiveTab] = useState(categories[0]?.slug ?? '')
  const [cartOpen, setCartOpen] = useState(false)
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  )

  const activeCategory = categories.find((c) => c.slug === activeTab)
  const categoryItems = items.filter((i) => i.category_id === activeCategory?.id)

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[rgba(200,155,82,0.1)]">
        <div className="kinzora-container flex items-center justify-between py-4">
          <Link href="/" className="font-heading text-xl font-bold text-[#C89B52]">
            Kinzora
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-[#D6D0C7]/60 hover:text-[#C89B52] transition-colors cursor-pointer"
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C89B52] text-[#0A0A0A] text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="kinzora-container py-8">
        {/* Title */}
        <div className="mb-8 text-center">
          <p className="font-jp text-[#C89B52] text-xs tracking-[0.5em] uppercase mb-3">注文</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#F8F4EE]">
            Pedir <span className="text-gold-gradient italic">Online</span>
          </h1>
          <p className="mt-3 text-[#D6D0C7]/60 text-sm">Solo recogida en restaurante</p>
        </div>

        {/* Category tabs */}
        <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 md:flex-wrap justify-start md:justify-center min-w-max md:min-w-0">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveTab(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  activeTab === cat.slug
                    ? 'bg-gold-gradient text-[#0A0A0A] border-transparent'
                    : 'text-[#D6D0C7]/60 border-[rgba(200,155,82,0.15)] hover:border-[rgba(200,155,82,0.4)] hover:text-[#C89B52]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="glass-dark rounded-2xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-semibold text-[#C89B52]">
                  {activeCategory?.name}
                </h2>
                <span className="text-xs text-[#D6D0C7]/40 uppercase tracking-wider">
                  {categoryItems.length} platos
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
                {categoryItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating cart button (mobile) */}
      {itemCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 bg-[#C89B52] text-[#0A0A0A] px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
        >
          <ShoppingBag size={16} />
          Ver pedido ({itemCount})
        </button>
      )}

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
