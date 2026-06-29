import CinematicHero from './components/CinematicHero';
import MenuSection from './components/MenuSection';
import TestimonialSection from './components/TestimonialSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg"
        style={{ background: '#fff', color: '#000', fontFamily: 'var(--font-body)' }}
      >
        Skip to content
      </a>
      <Navbar />
      <CinematicHero />
      <div style={{ marginTop: '-100vh', position: 'relative', zIndex: 1 }}>
        <MenuSection />
        <TestimonialSection />
        <Footer />
      </div>
    </div>
  );
}
