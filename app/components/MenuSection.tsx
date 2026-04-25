'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import Image from 'next/image';

// Light theme tokens (self-contained — doesn't touch globals)
const L = {
  bg:      '#f5f2ed',
  surface: 'rgba(255,255,255,0.72)',
  text:    '#0d0c09',
  muted:   '#7a756f',
  border:  'rgba(0,0,0,0.08)',
  rule:    'rgba(0,0,0,0.1)',
} as const;

type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: string;
  image?: string;
};

type Category = {
  label: string;
  items: MenuItem[];
};

const MENU: Category[] = [
  {
    label: 'Starters',
    items: [
      {
        name: "The Warden's Welcome",
        description: 'Chilled burrata, roasted cherry tomatoes, basil oil, grilled sourdough. Served the way the warden likes it — without conversation.',
        price: '₹480',
        tag: "Chef's Pick",
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/52/8d/c4/avocado-garden.jpg?w=1400&h=-1&s=1',
      },
      {
        name: 'Solitary Soup',
        description: 'Slow-cooked French onion, aged Gruyère crust, toasted baguette. Forty-eight hours in isolation never tasted so good.',
        price: '₹340',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/53/7b/ec/photo0jpg.jpg?w=1400&h=-1&s=1',
      },
      {
        name: 'Cell Block Crostini',
        description: 'Whipped ricotta, fig preserve, candied walnuts, micro herbs. Four on the plate — one for each wall.',
        price: '₹420',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/8e/93/4d/photo0jpg.jpg?w=1400&h=-1&s=1',
      },
      {
        name: 'Contraband Tartare',
        description: 'Hand-cut beef tenderloin, capers, cornichon, quail yolk, rye crisps. Smuggled in at great personal risk.',
        price: '₹680',
        tag: 'Signature',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop&auto=format',
      },
    ],
  },
  {
    label: 'Mains',
    items: [
      {
        name: 'The Rehabilitation',
        description: 'Pan-seared salmon, saffron beurre blanc, wilted spinach, crushed potatoes. A second chance on a plate.',
        price: '₹920',
        tag: 'Best Seller',
      },
      {
        name: 'Hard Labour Risotto',
        description: 'Slow-stirred porcini risotto, aged parmesan, truffle oil, crispy shallots. Twenty-two minutes of unbroken effort.',
        price: '₹780',
      },
      {
        name: 'Maximum Security Steak',
        description: '200g prime wagyu striploin, bone marrow butter, roasted garlic jus, hand-cut fries. No parole. No exceptions.',
        price: '₹1,840',
        tag: 'Premium',
      },
      {
        name: 'The Accomplice',
        description: 'Slow-braised lamb shank, rosemary jus, pomme purée, roasted root vegetables. Partners in flavour.',
        price: '₹1,100',
      },
    ],
  },
  {
    label: 'Desserts',
    items: [
      {
        name: 'Midnight Craving',
        description: 'Warm dark chocolate fondant, salted caramel core, vanilla bean ice cream. What everyone thinks about after lights out.',
        price: '₹380',
        tag: "Chef's Pick",
      },
      {
        name: 'Good Behaviour Panna Cotta',
        description: 'Vanilla panna cotta, passionfruit coulis, sesame brittle. Reserved only for those who behave.',
        price: '₹320',
      },
      {
        name: 'The Last Meal',
        description: 'Tasting plate of miniature desserts — chosen by you. Because some choices should remain yours.',
        price: '₹560',
        tag: 'Signature',
      },
    ],
  },
  {
    label: 'Drinks',
    items: [
      {
        name: 'Yard Time',
        description: 'Cold brew concentrate, oat milk, brown sugar syrup, a single ice cube. Fifteen minutes of calm.',
        price: '₹280',
        tag: 'Best Seller',
      },
      {
        name: 'The Informant',
        description: 'Matcha, yuzu, honey, sparkling water. Disarmingly good. Never to be trusted.',
        price: '₹320',
      },
      {
        name: 'Sentence Suspended',
        description: 'Espresso tonic, grapefruit zest, rosemary sprig. Served cold. Case closed.',
        price: '₹340',
        tag: 'Signature',
      },
      {
        name: 'Classified',
        description: 'Rotating seasonal special. Ask your server. Details are on a need-to-know basis.',
        price: '₹360',
      },
    ],
  },
];

const TAG_STYLES: Record<string, { border: string; color: string }> = {
  "Chef's Pick": { border: 'rgba(0,0,0,0.18)', color: '#3a3630' },
  'Signature':   { border: 'rgba(180,130,40,0.45)', color: '#8a6820' },
  'Best Seller': { border: 'rgba(40,140,80,0.35)', color: '#2a7a48' },
  'Premium':     { border: 'rgba(180,40,60,0.35)', color: '#a02838' },
};

function Tag({ label }: { label: string }) {
  const s = TAG_STYLES[label] ?? { border: 'rgba(0,0,0,0.15)', color: L.muted };
  return (
    <span
      className="self-start text-[10px] tracking-widest uppercase rounded-full px-3 py-1"
      style={{
        fontFamily: 'var(--font-body)',
        border: `1px solid ${s.border}`,
        color: s.color,
      }}
    >
      {label}
    </span>
  );
}

// Card with image (Starters)
function ImageCard({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.08 }}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: L.surface,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${L.border}`,
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      {/* Image */}
      <div className="relative w-full" style={{ aspectRatio: '16/7', overflow: 'hidden' }}>
        <Image
          src={item.image!}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-base leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif", color: L.text }}
          >
            {item.name}
          </h3>
          <span
            className="text-sm shrink-0 tabular-nums mt-0.5"
            style={{ fontFamily: 'var(--font-body)', color: L.text, opacity: 0.85 }}
          >
            {item.price}
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: L.muted }}>
          {item.description}
        </p>
        {item.tag && <Tag label={item.tag} />}
      </div>
    </motion.div>
  );
}

// Text-only card (Mains / Desserts / Drinks)
function TextCard({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.07 }}
      className="rounded-xl px-5 py-4 flex flex-col gap-2"
      style={{
        background: L.surface,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${L.border}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className="text-base leading-tight"
          style={{ fontFamily: "'Instrument Serif', serif", color: L.text }}
        >
          {item.name}
        </h3>
        <span
          className="text-sm shrink-0 tabular-nums mt-0.5"
          style={{ fontFamily: 'var(--font-body)', color: L.text, opacity: 0.85 }}
        >
          {item.price}
        </span>
      </div>
      <p className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: L.muted }}>
        {item.description}
      </p>
      {item.tag && <Tag label={item.tag} />}
    </motion.div>
  );
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  const activeItems = MENU[activeCategory].items;
  const isStarters = activeCategory === 0;

  return (
    <section
      className="relative w-full py-24 px-4 sm:px-10 bg-white"
      style={{
        background: 'url(/menu.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Glass box */}
        <div
          className="rounded-3xl"
          style={{
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            background: 'rgba(245,242,237,0.72)',
            boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.05), 0 24px 64px rgba(0,0,0,0.18)',
            border: '1px solid rgba(255,255,255,0.45)',
            willChange: 'backdrop-filter',
            transform: 'translateZ(0)',
          }}
        >
          {/* Sticky header — heading + tabs */}
          <div
            ref={headingRef}
            className="sticky top-[72px] z-20 px-6 pt-10 pb-6 sm:px-10 sm:pt-12"
            style={{
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              background: 'rgba(245,242,237,0.92)',
              borderBottom: `1px solid ${L.border}`,
            }}
          >
            {/* Heading row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6"
            >
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: 'var(--font-body)', color: L.muted }}
                >
                  Curated offerings
                </p>
                <h2
                  className="text-5xl sm:text-6xl font-normal leading-none"
                  style={{ fontFamily: "'Instrument Serif', serif", color: L.text, letterSpacing: '-1.5px' }}
                >
                  The Menu.
                </h2>
              </div>
              <p
                className="text-sm max-w-xs leading-relaxed text-right hidden sm:block"
                style={{ fontFamily: 'var(--font-body)', color: L.muted }}
              >
                Crafted for those who have earned their appetite. Every dish carries a sentence of its own.
              </p>
            </motion.div>

            {/* Category tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap gap-2"
            >
              {MENU.map((cat, i) => {
                const active = activeCategory === i;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(i)}
                    className="rounded-full px-6 py-2.5 text-sm transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-body)',
                      cursor: 'pointer',
                      color: active ? L.text : L.muted,
                      background: active ? 'rgba(0,0,0,0.08)' : 'transparent',
                      border: active ? '1px solid rgba(0,0,0,0.14)' : '1px solid rgba(0,0,0,0.07)',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = L.text;
                    }}
                    onMouseLeave={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = L.muted;
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Scrollable content */}
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {/* Item count */}
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: 'var(--font-body)', color: L.muted, opacity: 0.55 }}
            >
              {activeItems.length} items &mdash; {MENU[activeCategory].label}
            </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {isStarters
                ? activeItems.map((item, i) => <ImageCard key={item.name} item={item} index={i} />)
                : activeItems.map((item, i) => <TextCard key={item.name} item={item} index={i} />)
              }
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-12 w-full h-px" style={{ background: L.rule }} />
          <div className="mt-5 flex flex-col sm:flex-row justify-between gap-2">
            <p className="text-xs" style={{ fontFamily: 'var(--font-body)', color: L.muted, opacity: 0.5 }}>
              All prices inclusive of taxes. Sentence subject to change.
            </p>
            <p className="text-xs" style={{ fontFamily: 'var(--font-body)', color: L.muted, opacity: 0.5 }}>
              Velorah &copy; {new Date().getFullYear()}
            </p>
          </div>
          </div>{/* end scrollable content */}
        </div>{/* end glass box */}

      </div>
    </section>
  );
}
