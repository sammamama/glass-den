import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Our Story — The Glass Den',
  description:
    'The story behind The Glass Den — a modern brunch cafe in the historic Pentridge Prison gatehouse, Coburg.',
};

export default function AboutPage() {
  return (
    <div style={{ background: '#faf9f6' }}>
      <Navbar />
      <AboutSection />
      <Footer />
    </div>
  );
}
