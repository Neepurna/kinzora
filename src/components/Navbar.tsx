'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Carta', href: '#menu' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Ubicación', href: '#location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[rgba(200,155,82,0.12)]'
            : 'bg-transparent'
        }`}
      >
        <div className="kinzora-container flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/Kinzora-Sushi-Logo.png"
              alt="Kinzora Sushi"
              width={52}
              height={52}
              quality={100}
              className="rounded-full"
              priority
            />
            <div className="hidden sm:block">
              <p className="font-heading text-sm font-700 tracking-[0.15em] text-[#C89B52] leading-none">
                KINZORA
              </p>
              <p className="text-[10px] tracking-[0.3em] text-[#D6D0C7]/60 uppercase">
                Sushi
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-wider text-[#D6D0C7]/70 hover:text-[#C89B52] transition-colors duration-200 uppercase cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:663108134"
              className="text-sm text-[#D6D0C7]/60 hover:text-[#C89B52] transition-colors duration-200 cursor-pointer"
            >
              663 108 134
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Abrir menú"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[#C89B52]"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-[#C89B52]"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[#C89B52]"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-3xl text-[#F8F4EE] hover:text-[#C89B52] transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="tel:663108134"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 bg-gold-gradient text-[#0A0A0A] font-semibold tracking-wider rounded-full cursor-pointer"
            >
              663 108 134
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
