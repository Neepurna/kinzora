import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Signature from '@/components/Signature';
import MenuSection from '@/components/MenuSection';
import About from '@/components/About';
import Location from '@/components/Location';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Signature />
        <MenuSection />
        <About />
        <Location />
      </main>
      <Footer />
    </>
  );
}
