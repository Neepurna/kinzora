'use client';

import { motion } from 'framer-motion';

const info = [
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Dirección',
    value: 'Calle del Vizconde de Matamala 5',
    sub: 'Salamanca, 28028 Madrid',
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Horario',
    value: '12:00 – 16:30',
    sub: '19:00 – 23:30 · Abierto todos los días',
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.63 9.5 19.79 19.79 0 01.56 4.18 2 2 0 012.53 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l.88-.88a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Pedidos',
    value: '663 108 134',
    sub: 'Pide online o llámanos',
    href: 'tel:663108134',
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    label: 'Web',
    value: 'www.Kinzora-sushi.com',
    sub: 'Visítanos online',
  },
];

export default function Location() {
  return (
    <section id="location" className="py-24 md:py-36 relative overflow-hidden bg-[#0A0A0A]">
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,155,82,0.3), transparent)',
        }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,155,82,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="kinzora-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-jp text-[#C89B52] text-xs tracking-[0.5em] uppercase mb-4">
            場所
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-700 text-[#F8F4EE]">
            Visítanos en{' '}
            <span className="text-gold-gradient italic">Madrid</span>
          </h2>
        </motion.div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {info.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-dark rounded-2xl p-6 group hover:border-[rgba(200,155,82,0.3)] transition-colors duration-300"
            >
              <div className="text-[#C89B52] mb-4">{item.icon}</div>
              <p className="text-xs text-[#D6D0C7]/40 tracking-widest uppercase mb-2">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="font-heading text-lg font-600 text-[#F8F4EE] group-hover:text-[#C89B52] transition-colors duration-200 cursor-pointer block"
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-heading text-lg font-600 text-[#F8F4EE]">{item.value}</p>
              )}
              <p className="text-xs text-[#D6D0C7]/50 mt-1">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Reservation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center glass-dark rounded-3xl p-10 md:p-16 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(200,155,82,0.06) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10">
            <p className="font-jp text-[#C89B52] text-xs tracking-[0.5em] uppercase mb-4">
              ご予約
            </p>
            <h3 className="font-heading text-3xl md:text-4xl font-700 text-[#F8F4EE] mb-4">
              ¿Listo para una experiencia{' '}
              <span className="text-gold-gradient italic">única?</span>
            </h3>
            <p className="text-[#D6D0C7]/60 max-w-md mx-auto mb-8">
              Reserva tu mesa y disfruta de la mejor cocina japonesa en Madrid. Llámanos o pide directamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:663108134"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-gradient text-[#0A0A0A] font-semibold tracking-wider rounded-full hover:opacity-90 transition-opacity duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.63 9.5 19.79 19.79 0 01.56 4.18 2 2 0 012.53 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l.88-.88a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                663 108 134
              </a>
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[rgba(200,155,82,0.3)] text-[#C89B52] font-semibold tracking-wider rounded-full hover:bg-[rgba(200,155,82,0.08)] transition-all duration-200 cursor-pointer"
              >
                Ver la Carta
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
