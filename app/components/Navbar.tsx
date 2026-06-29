'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      setMobileOpen(false);
      return;
    }

    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full"
        style={{ pointerEvents: 'auto' }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Floating glass pill */}
        <div
          className="absolute inset-x-4 inset-y-2 rounded-2xl"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            background: 'rgba(10,10,10,0.35)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
            zIndex: -1,
          }}
        />

        <a
          href="/"
          className="text-2xl tracking-tight relative"
          style={{ fontFamily: "'Instrument Serif', serif", color: 'hsl(var(--foreground))' }}
          aria-label="Glass Den — return to home"
        >
          Glass Den<sup className="text-xs">®</sup>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 relative">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm transition-colors duration-200"
              style={{
                color: i === 0 ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'hsl(var(--foreground))')}
              onMouseLeave={(e) => {
                if (i !== 0) (e.target as HTMLElement).style.color = 'hsl(var(--muted-foreground))';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="hidden md:block liquid-glass relative rounded-full px-5 py-2 text-sm transition-transform duration-200 hover:scale-[1.03]"
          style={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-body)', cursor: 'pointer' }}
        >
          Book a Table
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          style={{ color: 'hsl(var(--foreground))', cursor: 'pointer' }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{
              background: 'rgba(5,5,5,0.95)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
            }}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="text-3xl"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  color: 'hsl(var(--foreground))',
                  letterSpacing: '-0.5px',
                }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: NAV_LINKS.length * 0.08 }}
              className="liquid-glass rounded-full px-8 py-3 text-base mt-4"
              style={{
                color: 'hsl(var(--foreground))',
                fontFamily: 'var(--font-body)',
              }}
            >
              Book a Table
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
