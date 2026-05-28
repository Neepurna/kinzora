'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { signatureItems } from '@/data/menu';

const signatureImages = [
  '/image01.png',
  '/image02.png',
  '/image03.png',
  '/image04.png',
];

export default function Signature() {
  return (
    <section id="signature" className="py-24 md:py-36 bg-[#0A0A0A] relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,155,82,0.3), transparent)',
        }}
      />

      <div className="kinzora-container">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {signatureItems.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group glass-dark rounded-2xl overflow-hidden cursor-pointer"
              style={{ border: '1px solid rgba(200,155,82,0.15)' }}
            >
              {/* Food photo */}
              <div className="relative h-36 sm:h-52 bg-[#0c0c0c] overflow-hidden">
                <Image
                  src={signatureImages[i]}
                  alt={item.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  style={{
                    maskImage:
                      'radial-gradient(ellipse 88% 82% at 50% 48%, black 30%, transparent 75%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 88% 82% at 50% 48%, black 30%, transparent 75%)',
                  }}
                />
              </div>

              {/* Gold accent line */}
              <motion.div
                className="h-px bg-gold-gradient"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              />

              {/* Text */}
              <div className="p-3 sm:p-5">
                <h3 className="font-heading text-[0.85rem] sm:text-[1.05rem] font-600 text-[#F8F4EE] mb-1 sm:mb-1.5 leading-tight group-hover:text-[#C89B52] transition-colors duration-200">
                  {item.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#D6D0C7]/55 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#C89B52] font-semibold text-sm tracking-wide">
                    {item.price}
                  </span>
                  <span className="text-[9px] text-[#D6D0C7]/40 tracking-widest uppercase border border-[rgba(200,155,82,0.2)] px-2 py-0.5 rounded-full">
                    Especial
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
