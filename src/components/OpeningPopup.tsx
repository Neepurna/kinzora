'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OpeningPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-md w-full rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #111008 0%, #0A0A0A 60%, #12100A 100%)',
              border: '1px solid rgba(200,155,82,0.25)',
              boxShadow: '0 0 80px rgba(200,155,82,0.12), 0 40px 80px rgba(0,0,0,0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gold bar */}
            <div
              className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, transparent, #C89B52, #E8C97A, #C89B52, transparent)' }}
            />

            {/* Glow orb behind content */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,155,82,0.1) 0%, transparent 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            <div className="relative px-8 pt-8 pb-10 text-center">
              {/* Japanese accent */}
              <p className="font-jp text-[#C89B52]/60 text-xs tracking-[0.5em] uppercase mb-1">
                金空 開店
              </p>

              {/* Grand Opening label */}
              <p className="text-[10px] tracking-[0.4em] text-[#D6D0C7]/40 uppercase mb-5">
                Gran Inauguración
              </p>

              {/* Discount badge */}
              <div className="flex items-center justify-center mb-6">
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(200,155,82,0.35)',
                    background: 'radial-gradient(circle, rgba(200,155,82,0.12) 0%, transparent 70%)',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: '1px solid rgba(200,155,82,0.15)',
                      transform: 'scale(1.12)',
                    }}
                  />
                  <div className="flex flex-col items-center leading-none">
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '3.2rem',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #C89B52 0%, #E8C97A 50%, #C89B52 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1,
                      }}
                    >
                      10%
                    </span>
                    <span className="text-[10px] tracking-[0.35em] text-[#C89B52]/70 uppercase mt-1">
                      descuento
                    </span>
                  </div>
                </div>
              </div>

              {/* Headline */}
              <h2
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}
                className="text-[#F8F4EE] text-2xl leading-tight mb-3"
              >
                Abrimos el{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #C89B52 0%, #E8C97A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  28 de Mayo
                </span>
              </h2>

              {/* Divider */}
              <div
                className="mx-auto mb-4"
                style={{
                  height: 1,
                  width: 80,
                  background: 'linear-gradient(90deg, transparent, rgba(200,155,82,0.5), transparent)',
                }}
              />

              {/* Body copy */}
              <p className="text-[#D6D0C7]/60 text-sm leading-relaxed mb-8 px-2">
                Celebra nuestra apertura con un{' '}
                <span className="text-[#C89B52] font-semibold">10% de descuento</span>{' '}
                en tu primer pedido. Sushi artesanal, sabores únicos.
              </p>

              {/* CTA */}
              <a
                href="tel:663108134"
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-full font-semibold tracking-wider text-[#0A0A0A] text-sm mb-3 transition-opacity duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #C89B52 0%, #E8C97A 50%, #C89B52 100%)',
                  boxShadow: '0 8px 32px rgba(200,155,82,0.3)',
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.63 9.5 19.79 19.79 0 01.56 4.18 2 2 0 012.53 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l.88-.88a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Llámanos — 663 108 134
              </a>

              <button
                onClick={() => setVisible(false)}
                className="text-[#D6D0C7]/30 text-xs tracking-widest uppercase hover:text-[#D6D0C7]/60 transition-colors duration-200 cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            {/* Bottom gold bar */}
            <div
              className="h-px w-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(200,155,82,0.3), transparent)' }}
            />

            {/* Close X */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#D6D0C7]/40 hover:text-[#C89B52] hover:bg-[rgba(200,155,82,0.08)] transition-all duration-200 cursor-pointer"
              aria-label="Cerrar"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
