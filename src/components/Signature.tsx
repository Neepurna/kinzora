'use client';

import { motion } from 'framer-motion';
import { signatureItems } from '@/data/menu';

export default function Signature() {
  return (
    <section id="signature" className="py-24 md:py-36 bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,155,82,0.3), transparent)',
        }}
      />

      <div className="kinzora-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24 text-center"
        >
          <p className="font-jp text-[#C89B52] text-xs tracking-[0.5em] uppercase mb-4">
            おすすめ
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-700 text-[#F8F4EE]">
            Signature{' '}
            <span className="text-gold-gradient italic">Collection</span>
          </h2>
          <p className="mt-4 text-[#D6D0C7]/60 max-w-md mx-auto">
            Nuestras creaciones más emblemáticas, elaboradas con la mejor materia prima.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {signatureItems.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`relative group glass-dark rounded-2xl overflow-hidden cursor-pointer ${item.border}`}
              style={{ borderColor: undefined, border: '1px solid rgba(200,155,82,0.12)' }}
            >
              {/* Card gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-60`}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(200,155,82,0.08) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 p-6 flex flex-col h-full min-h-[220px]">
                {/* Number badge */}
                <span className="font-heading text-5xl font-800 text-gold-gradient opacity-30 leading-none mb-auto">
                  {item.number}
                </span>

                <div className="mt-8">
                  <p className="font-heading text-xl font-600 text-[#F8F4EE] mb-2 leading-tight group-hover:text-[#C89B52] transition-colors duration-200">
                    {item.name}
                  </p>
                  <p className="text-xs text-[#D6D0C7]/55 leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#C89B52] font-semibold tracking-wide">
                      {item.price}
                    </span>
                    <span className="text-[10px] text-[#D6D0C7]/40 tracking-widest uppercase">
                      Especial
                    </span>
                  </div>
                </div>
              </div>

              {/* Top gold accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-gold-gradient"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
