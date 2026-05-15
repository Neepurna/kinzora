'use client';

import { motion } from 'framer-motion';

const pillars = [
  {
    jp: '鮮度',
    label: 'Frescura',
    desc: 'Ingredientes de la más alta calidad, seleccionados cada mañana.',
  },
  {
    jp: '技術',
    label: 'Técnica',
    desc: 'Años de formación en la tradición culinaria japonesa.',
  },
  {
    jp: '創造',
    label: 'Creatividad',
    desc: 'Fusión de sabores orientales y la esencia mediterránea.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36 bg-[#0A0A0A] relative overflow-hidden">
      {/* Decorative circle */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          border: '1px solid rgba(200,155,82,0.06)',
          left: '-200px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          border: '1px solid rgba(200,155,82,0.04)',
          left: '-100px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />

      <div className="kinzora-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Decorative quote */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Large background character */}
              <p
                className="font-jp select-none pointer-events-none"
                style={{
                  fontSize: 'clamp(100px, 18vw, 280px)',
                  color: 'rgba(200,155,82,0.06)',
                  lineHeight: 1,
                  margin: 0,
                }}
                aria-hidden="true"
              >
                金空
              </p>

              {/* Overlaid quote */}
              <div className="absolute inset-0 flex flex-col justify-center pl-8">
                <div className="h-12 w-px bg-gold-gradient mb-6" />
                <blockquote className="font-heading text-2xl md:text-3xl font-600 italic text-[#F8F4EE] leading-snug">
                  &ldquo;La artesanía japonesa
                  <br />
                  encuentra su hogar
                  <br />
                  en Madrid&rdquo;
                </blockquote>
                <p className="mt-4 text-xs text-[#C89B52] tracking-[0.3em] uppercase">
                  — Kinzora Sushi
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Story text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-jp text-[#C89B52] text-xs tracking-[0.5em] uppercase mb-4">
              私たちについて
            </p>
            <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-700 text-[#F8F4EE] mb-6">
              Nuestra{' '}
              <span className="text-gold-gradient italic">Historia</span>
            </h2>

            <p className="text-[#D6D0C7]/70 leading-relaxed mb-6">
              En Kinzora Sushi, cada pieza es una expresión de dedicación y respeto por la tradición japonesa. Fusionamos técnicas ancestrales con ingredientes frescos y de temporada para ofrecer una experiencia gastronómica única en el barrio de Salamanca, Madrid.
            </p>
            <p className="text-[#D6D0C7]/70 leading-relaxed mb-10">
              Nuestro nombre, Kinzora (金空), significa &quot;cielo dorado&quot; en japonés — una metáfora de nuestra aspiración a elevar cada bocado a su máximo esplendor.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-3 gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass-dark rounded-xl p-4 text-center"
                >
                  <p className="font-jp text-[#C89B52] text-xl mb-2">{p.jp}</p>
                  <p className="font-heading text-sm font-600 text-[#F8F4EE] mb-1">{p.label}</p>
                  <p className="text-[10px] text-[#D6D0C7]/50 leading-snug">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
