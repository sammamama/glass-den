'use client';

import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full"
      style={{ pointerEvents: 'auto' }}
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

      <span
        className="text-2xl tracking-tight relative"
        style={{ fontFamily: "'Instrument Serif', serif", color: 'hsl(var(--foreground))' }}
      >
        Glass Den<sup className="text-xs">®</sup>
      </span>

      <div className="hidden md:flex items-center gap-8 relative">
        {['Home', 'Studio', 'About', 'Journal', 'Reach Us'].map((link, i) => (
          <a
            key={link}
            href="#"
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
            {link}
          </a>
        ))}
      </div>

      <button
        className="liquid-glass relative rounded-full px-5 py-2 text-sm transition-transform duration-200 hover:scale-[1.03]"
        style={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-body)', cursor: 'pointer' }}
      >
        Begin Journey
      </button>
    </motion.nav>
  );
}
