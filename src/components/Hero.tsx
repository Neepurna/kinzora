'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const floatingOrbs = [
  { size: 360, x: '72%', y: '10%', delay: 0, duration: 7 },
  { size: 200, x: '80%', y: '55%', delay: 1.5, duration: 9 },
  { size: 120, x: '62%', y: '75%', delay: 0.8, duration: 6 },
  { size: 80, x: '15%', y: '80%', delay: 2, duration: 8 },
  { size: 50, x: '88%', y: '20%', delay: 1, duration: 5 },
];

export default function Hero() {
  const [orderOpen, setOrderOpen] = useState(false);
  const orderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) {
        setOrderOpen(false);
      }
    }
    if (orderOpen) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [orderOpen]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(200,155,82,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Japanese watermark characters */}
      <div
        className="absolute font-jp select-none pointer-events-none"
        style={{
          fontSize: 'clamp(200px, 30vw, 500px)',
          color: 'rgba(200,155,82,0.04)',
          top: '-5%',
          right: '-5%',
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
        aria-hidden="true"
      >
        寿司
      </div>

      {/* Floating orbs */}
      {floatingOrbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: 'translate(-50%, -50%)',
            background:
              i === 0
                ? 'radial-gradient(circle, rgba(200,155,82,0.08) 0%, rgba(200,155,82,0.02) 50%, transparent 70%)'
                : 'radial-gradient(circle, rgba(200,155,82,0.05) 0%, transparent 70%)',
            border: '1px solid rgba(200,155,82,0.08)',
            animation: `orbFloat ${orb.duration}s ease-in-out ${orb.delay}s infinite`,
          }}
        />
      ))}

      {/* Decorative gold line */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{ top: '50%' }}>
        <svg viewBox="0 0 1440 2" xmlns="http://www.w3.org/2000/svg" className="w-full opacity-10">
          <line x1="0" y1="1" x2="1440" y2="1" stroke="#C89B52" strokeWidth="1" />
        </svg>
      </div>

      {/* Main content */}
      <div className="kinzora-container relative z-10 pt-32 pb-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left">
          {/* Japanese accent */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-jp text-[#C89B52] text-sm tracking-[0.4em] mb-6 uppercase"
          >
            金空 — Kinzora
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-heading text-[clamp(2.2rem,5.5vw,5.5rem)] font-800 leading-[1.05] tracking-tight text-[#F8F4EE] mb-6"
          >
            Kinzora{' '}
            <span className="text-gold-gradient">Sushi</span>
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block h-px w-24 bg-gold-gradient mb-8 origin-left"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-[#D6D0C7]/70 text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-10"
          >
            Artesanía japonesa y modernidad culinaria en el corazón de Salamanca, Madrid.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <div ref={orderRef} className="relative">
              <button
                type="button"
                onClick={() => setOrderOpen((v) => !v)}
                aria-expanded={orderOpen}
                aria-haspopup="menu"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-gradient text-[#0A0A0A] font-semibold tracking-wider rounded-full hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer text-sm w-full sm:w-auto"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.63 9.5 19.79 19.79 0 01.56 4.18 2 2 0 012.53 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l.88-.88a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Pedir Ahora
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${orderOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <AnimatePresence>
                {orderOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    role="menu"
                    className="absolute z-30 top-full left-0 right-0 sm:left-0 sm:right-auto sm:min-w-[260px] mt-3 p-2 rounded-2xl bg-[#0A0A0A] border border-[rgba(200,155,82,0.25)] shadow-2xl shadow-black/60 backdrop-blur-sm"
                  >
                    <a
                      href="tel:663108134"
                      role="menuitem"
                      onClick={() => setOrderOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#F8F4EE] hover:bg-[rgba(200,155,82,0.1)] transition-colors cursor-pointer"
                    >
                      <span className="w-9 h-9 rounded-full bg-[rgba(200,155,82,0.12)] border border-[rgba(200,155,82,0.3)] flex items-center justify-center text-[#C89B52]">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.63 9.5 19.79 19.79 0 01.56 4.18 2 2 0 012.53 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l.88-.88a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold">Llamar</span>
                        <span className="block text-xs text-[#D6D0C7]/60">663 108 134</span>
                      </span>
                    </a>
                    <a
                      href="/menu"
                      role="menuitem"
                      onClick={() => setOrderOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#F8F4EE] hover:bg-[rgba(200,155,82,0.1)] transition-colors cursor-pointer"
                    >
                      <span className="w-9 h-9 rounded-full bg-[rgba(200,155,82,0.12)] border border-[rgba(200,155,82,0.3)] flex items-center justify-center text-[#C89B52]">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
                          <path d="M9 7h6M9 11h6M9 15h4" />
                        </svg>
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold">Pedir Online</span>
                        <span className="block text-xs text-[#D6D0C7]/60">Entrega a domicilio o recogida</span>
                      </span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex items-center gap-5 sm:gap-8 mt-10 sm:mt-14 justify-center lg:justify-start"
          >
            {[
              { value: '50+', label: 'Platos' },
              { value: '5★', label: 'Valoración' },
              { value: '2x', label: 'Servicio diario' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="font-heading text-2xl font-700 text-[#C89B52]">{stat.value}</p>
                <p className="text-xs text-[#D6D0C7]/50 tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Sushi visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="relative flex-shrink-0 w-[280px] h-[300px] sm:w-[380px] sm:h-[420px] lg:w-[520px] lg:h-[560px]"
        >
          <Image
            src="/sushi.png"
            alt="Kinzora premium nigiri platter"
            fill
            style={{ objectFit: 'contain', objectPosition: 'center 46%' }}
            priority
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-[10px] tracking-[0.4em] text-[#D6D0C7]/40 uppercase">Scroll</p>
        <div style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}>
          <svg className="w-4 h-4 text-[#C89B52]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
