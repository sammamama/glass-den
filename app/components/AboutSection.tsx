'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const STATS = [
  { value: 'Est. 2015', label: 'Serving Coburg' },
  { value: '100+', label: 'Seats indoor & alfresco' },
  { value: 'Pentridge', label: 'Heritage listed site' },
] as const;

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const textInView = useInView(textRef, { once: true, margin: '-60px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        background: '#faf9f6',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '45%',
          background: 'radial-gradient(ellipse at bottom center, rgba(180,140,60,0.06) 0%, rgba(180,140,60,0.02) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="max-w-6xl mx-auto px-6 sm:px-10"
        style={{ paddingTop: '10rem', paddingBottom: '7rem' }}
      >
        <div ref={headingRef} style={{ marginBottom: '4rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs tracking-[0.3em] uppercase"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(0,0,0,0.4)',
              marginBottom: '1rem',
            }}
          >
            Curated Heritage
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-normal"
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#1a1a1a',
              letterSpacing: '-1.5px',
              lineHeight: 1,
            }}
          >
            Our Story.
          </motion.h2>
        </div>

        <div
          className="flex flex-col lg:flex-row gap-12 lg:gap-16"
          style={{ alignItems: 'flex-start' }}
        >
          <div ref={textRef} className="flex-1 lg:max-w-[55%]">
            {[
              'Nestled within the imposing sandstone walls of the former Pentridge Prison gatehouse, The Glass Den transforms over a century of history into a space where light, greenery, and exceptional food converge.',
              'The 120-year-old prison doors that once sealed inmates’ fates now serve as our tables. Light fixtures rescued from the old prison laundry cast warm shadows across polished concrete. Every detail honours the building’s past while looking firmly forward.',
              'We source from socially conscious suppliers, serve Code Black coffee, and welcome everyone — vegan, vegetarian, halal-friendly, kids, and dogs. Because the best meals are shared without barriers.',
            ].map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: i * 0.15,
                }}
                className="text-sm sm:text-base leading-relaxed"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'rgba(0,0,0,0.55)',
                  marginBottom: i < 2 ? '1.5rem' : 0,
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div ref={statsRef} className="w-full lg:w-auto lg:flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 28 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: i * 0.12,
                  }}
                  className="rounded-2xl px-6 py-6"
                  style={{
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  <p
                    className="text-2xl sm:text-3xl font-normal"
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      color: '#1a1a1a',
                      letterSpacing: '-0.5px',
                      lineHeight: 1.1,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'rgba(0,0,0,0.4)',
                    }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
