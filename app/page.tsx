import CinematicHero from './components/CinematicHero';
import MenuSection from './components/MenuSection';
import TestimonialSection from './components/TestimonialSection';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <CinematicHero />
      <div style={{ marginTop: '-100vh', position: 'relative', zIndex: 1 }}>
        <MenuSection />
        <TestimonialSection />
      </div>
    </div>
  );
}
