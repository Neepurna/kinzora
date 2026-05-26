import Image from 'next/image';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Carta', href: '#menu' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Ubicación', href: '#location' },
];

export default function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-[rgba(200,155,82,0.1)]">
      <div className="kinzora-container py-14">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/sushi.png"
                alt="Kinzora Sushi"
                width={44}
                height={44}
                className="rounded-full opacity-90"
              />
              <div>
                <p className="font-heading text-xs font-700 tracking-[0.2em] text-[#C89B52]">
                  KINZORA SUSHI
                </p>
                <p className="text-[9px] tracking-[0.35em] text-[#D6D0C7]/40 uppercase">
                  Fresh Taste · Happy Moments
                </p>
              </div>
            </div>
            <p className="text-xs text-[#D6D0C7]/40 max-w-[240px] text-center md:text-left leading-relaxed">
              Experiencia gastronómica japonesa en el corazón de Salamanca, Madrid.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-[10px] text-[#C89B52] tracking-[0.3em] uppercase mb-1">Navegación</p>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-[#D6D0C7]/50 hover:text-[#C89B52] transition-colors duration-200 cursor-pointer tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-[10px] text-[#C89B52] tracking-[0.3em] uppercase mb-1">Contacto</p>
            <a
              href="tel:663108134"
              className="text-xs text-[#D6D0C7]/50 hover:text-[#C89B52] transition-colors duration-200 cursor-pointer"
            >
              663 108 134
            </a>
            <p className="text-xs text-[#D6D0C7]/50">
              Calle del Vizconde de Matamala 5
            </p>
            <p className="text-xs text-[#D6D0C7]/50">Salamanca, 28028 Madrid</p>
            <p className="text-xs text-[#D6D0C7]/50 mt-1">
              12:00–16:30 · 19:00–23:30
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[rgba(200,155,82,0.08)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#D6D0C7]/25 tracking-wider">
            © 2026 Kinzora Sushi
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[#D6D0C7]/25">Diseñado con</span>
            <span className="text-[#C89B52]/60 text-xs">♦</span>
            <span className="text-[10px] text-[#D6D0C7]/25">en Madrid</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
