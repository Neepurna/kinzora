'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuCategories, type MenuItem } from '@/data/menu';

const tagStyles = {
  signature: { label: 'Especial', color: 'text-[#C89B52] border-[#C89B52]/30 bg-[#C89B52]/8' },
  spicy: { label: 'Picante', color: 'text-[#C73B2D] border-[#C73B2D]/30 bg-[#C73B2D]/8' },
  veg: { label: 'Vegetal', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/8' },
};

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group flex items-start justify-between gap-4 py-4 border-b border-[rgba(200,155,82,0.08)] hover:border-[rgba(200,155,82,0.2)] transition-colors duration-200 cursor-default"
    >
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
            <span
              className={`text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider ${tagStyles[item.tag].color}`}
            >
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
      <span className="flex-shrink-0 text-[#C89B52] font-semibold text-sm whitespace-nowrap">
        {item.price.toFixed(2).replace('.', ',')}€
      </span>
    </motion.div>
  );
}

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState(menuCategories[0].id);

  const activeCategory = menuCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="menu" className="py-24 md:py-36 bg-[#0A0A0A] relative">
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #C89B52 0px, #C89B52 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, #C89B52 0px, #C89B52 1px, transparent 1px, transparent 80px)',
        }}
      />

      <div className="kinzora-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="font-jp text-[#C89B52] text-xs tracking-[0.5em] uppercase mb-4">
            メニュー
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-700 text-[#F8F4EE]">
            Nuestra{' '}
            <span className="text-gold-gradient italic">Carta</span>
          </h2>
          <p className="mt-4 text-[#D6D0C7]/60 max-w-sm mx-auto text-sm">
            Abierto todos los días · 12:00–16:30 · 19:00–23:30
          </p>
        </motion.div>

        {/* Tab bar */}
        <div className="mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 md:flex-wrap justify-start md:justify-center min-w-max md:min-w-0">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  activeTab === cat.id
                    ? 'bg-gold-gradient text-[#0A0A0A] border-transparent'
                    : 'text-[#D6D0C7]/60 border-[rgba(200,155,82,0.15)] hover:border-[rgba(200,155,82,0.4)] hover:text-[#C89B52]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu items */}
        <div className="glass-dark rounded-2xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-xl font-600 text-[#C89B52]">
                  {activeCategory.label}
                </h3>
                <span className="text-xs text-[#D6D0C7]/40 uppercase tracking-wider">
                  {activeCategory.items.length} platos
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
                {activeCategory.items.map((item, i) => (
                  <MenuCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-xs text-[#D6D0C7]/35 mt-8 tracking-wide"
        >
          Todos los precios incluyen IVA · Consulte posibles alérgenos
        </motion.p>
      </div>
    </section>
  );
}
