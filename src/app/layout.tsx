import type { Metadata } from 'next';
import { Playfair_Display, Inter, Noto_Serif_JP } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  variable: '--font-noto-jp',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kinzora Sushi | Premium Japanese Dining in Madrid',
  description: 'Luxury sushi dining experience featuring premium rolls, nigiri, sashimi, and Japanese specialties. Located in Salamanca, Madrid.',
  keywords: 'sushi, Japanese restaurant, Madrid, luxury dining, salmón, atún, nigiris, rolls',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} ${notoSerifJP.variable}`}
    >
      <body className="min-h-screen bg-[#0A0A0A] text-[#F8F4EE]">{children}</body>
    </html>
  );
}
