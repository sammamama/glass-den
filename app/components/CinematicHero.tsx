'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import Lenis from 'lenis';

const TOTAL_FRAMES = 242;
const ZOOM_FACTOR = 1.05;

// Frame thresholds
const OVERLAY_FADE_END   = 70;   // overlay fully gone
const HERO_FADE_START    = 50;   // hero text starts fading
const HERO_FADE_END      = 72;   // hero text fully gone
const GLASS_FADE_START   = 68;   // glass box starts appearing
const GLASS_FADE_END     = 95;   // glass box fully visible

function padNum(n: number) {
  return String(n).padStart(3, '0');
}

function getFrameSrc(index: number) {
  return `/frames/frame_${padNum(index + 1)}.jpg`;
}

function mapRange(val: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.min(Math.max((val - inMin) / (inMax - inMin), 0), 1);
  return outMin + (outMax - outMin) * t;
}

export default function CinematicHero() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef       = useRef<number | null>(null);
  const lenisRef     = useRef<Lenis | null>(null);
  // Parallax offset drawn into canvas — no CSS transform on canvas
  const parallaxRef  = useRef({ x: 0, y: 0 });

  // DOM refs for scroll-driven opacity (no re-renders)
  const overlayRef   = useRef<HTMLDivElement>(null);
  const heroTextRef  = useRef<HTMLDivElement>(null);
  const glassBoxRef  = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images[i] = img;
    }
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.naturalWidth) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasAspect = cw / ch;
    const imageAspect  = iw / ih;

    let drawW: number, drawH: number;

    if (canvasAspect > imageAspect) {
      drawW = cw * ZOOM_FACTOR;
      drawH = drawW / imageAspect;
    } else {
      drawH = ch * ZOOM_FACTOR;
      drawW = drawH * imageAspect;
    }

    const dx = (cw - drawW) / 2 + parallaxRef.current.x;
    const dy = (ch - drawH) / 2 + parallaxRef.current.y;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  // Handle canvas resize
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded, drawFrame]);

  // Lenis smooth scroll + frame mapping + scroll-driven UI
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenisRef.current = lenis;

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      const container = containerRef.current;
      if (!container) return;

      const maxScroll = container.scrollHeight - window.innerHeight;
      const fraction  = Math.min(Math.max(scroll / maxScroll, 0), 1);
      const frameIndex = Math.min(
        Math.floor(fraction * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      // Draw frame
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }

      // Scroll-driven opacity — direct DOM, no re-render
      const f = frameIndex;

      if (overlayRef.current) {
        const op = mapRange(f, 0, OVERLAY_FADE_END, 0.55, 0);
        overlayRef.current.style.opacity = String(op);
      }

      if (heroTextRef.current) {
        const op = mapRange(f, HERO_FADE_START, HERO_FADE_END, 1, 0);
        heroTextRef.current.style.opacity = String(op);
        heroTextRef.current.style.pointerEvents = op < 0.05 ? 'none' : 'auto';
      }

      if (glassBoxRef.current) {
        const op = mapRange(f, GLASS_FADE_START, GLASS_FADE_END, 0, 1);
        const translateY = mapRange(f, GLASS_FADE_START, GLASS_FADE_END, 32, 0);
        glassBoxRef.current.style.opacity = String(op);
        glassBoxRef.current.style.transform = `translateY(${translateY}px)`;
        glassBoxRef.current.style.pointerEvents = op < 0.05 ? 'none' : 'auto';
      }
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [loaded, drawFrame]);

  // Mouse parallax
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouse = (e: MouseEvent) => {
      const xFraction = (e.clientX / window.innerWidth  - 0.5) * 2;
      const yFraction = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(parallaxRef.current, {
        x: -xFraction * 14,
        y: -yFraction * 14,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => drawFrame(currentFrameRef.current),
      });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [loaded]);

  return (
    <>
      {/* Loading Screen */}
      {!loaded && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: '#000' }}
        >
          <p
            className="text-sm tracking-[0.25em] uppercase mb-8"
            style={{ color: 'hsl(240 4% 66%)', fontFamily: 'var(--font-body)' }}
          >
            Loading Den Experience
          </p>
          <div className="w-48 h-px" style={{ background: 'hsl(0 0% 18%)' }}>
            <div
              className="h-full transition-all duration-150"
              style={{ width: `${progress}%`, background: 'hsl(0 0% 66%)' }}
            />
          </div>
          <p className="mt-4 text-xs tabular-nums" style={{ color: 'hsl(0 0% 40%)' }}>
            {progress}%
          </p>
        </div>
      )}

      {/* Main scrollable container */}
      <div ref={containerRef} style={{ height: '500vh', background: '#000' }}>

        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: '#000' }}
          />

          {/* Dark overlay — fades out by frame 70 */}
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.35) 100%)',
              opacity: 0.55,
            }}
          />

          {/* UI layer */}
          {loaded && (
            <div className="relative z-10 flex flex-col h-full">

              {/* Navigation */}
              <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="flex flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full"
              >
                <span
                  className="text-3xl tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif", color: 'hsl(var(--foreground))' }}
                >
                  Velorah<sup className="text-xs">®</sup>
                </span>

                <div className="hidden md:flex items-center gap-8">
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
                  className="liquid-glass rounded-full px-6 py-2.5 text-sm transition-transform duration-200 hover:scale-[1.03]"
                  style={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-body)', cursor: 'pointer' }}
                >
                  Begin Journey
                </button>
              </motion.nav>

              {/* Center area — hero text + glass box stacked */}
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">

                {/* Hero text — fades out at frame 50-72 */}
                <div
                  ref={heroTextRef}
                  className="flex flex-col items-center"
                  style={{ transition: 'opacity 0.1s linear' }}
                >
                  <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="text-5xl sm:text-7xl md:text-8xl font-normal max-w-7xl"
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      lineHeight: 0.95,
                      letterSpacing: '-2.46px',
                      color: 'hsl(var(--foreground))',
                    }}
                  >
                    Glass Den.
                  </motion.h1>

                  <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.35 }}
                    className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
                    style={{ color: 'hsl(var(--muted-foreground))', fontFamily: 'var(--font-body)' }}
                  >
                    Prison Experience in a Cafe
                  </motion.p>
                </div>

                {/* Glassmorphic reveal box — fades in at frame 68-95 */}
                <div
                  ref={glassBoxRef}
                  className="absolute inset-x-0 flex justify-center  px-6 h-[50%]"
                  style={{
                    opacity: 0,
                    pointerEvents: 'none',
                    transform: 'translateY(32px)',
                  }}
                >
                  <div
                    className="liquid-glass rounded-3xl px-14 py-16 flex flex-col items-center justify-center text-center max-w-2xl w-full"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      backdropFilter: 'blur(64px)',
                      WebkitBackdropFilter: 'blur(64px)',
                      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.12), 0 32px 80px rgba(0,0,0,0.55)',
                    }}
                  >
                    <h1
                      className="font-normal pb-10"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                        lineHeight: 1.25,
                        color: 'hsl(var(--foreground))',
                        letterSpacing: '-1.5px',
                      }}
                    >
                      Prison Experience <br /> in a Cafe
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4 mt-14 w-full sm:w-auto">
                      {/* Primary — solid white */}
                      <button
                        className="group relative rounded-full text-base font-medium overflow-hidden"
                        style={{
                          background: 'hsl(var(--foreground))',
                          color: 'hsl(var(--primary-foreground))',
                          fontFamily: 'var(--font-body)',
                          cursor: 'pointer',
                          padding: '1rem 3rem',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(255,255,255,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        }}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)';
                        }}
                        onMouseUp={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                        }}
                      >
                        Book a Table
                      </button>

                      {/* Secondary — glass */}
                      <button
                        className="liquid-glass rounded-full text-base font-medium"
                        style={{
                          color: 'hsl(var(--foreground))',
                          fontFamily: 'var(--font-body)',
                          cursor: 'pointer',
                          padding: '1rem 3rem',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                          (e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 1px 1px rgba(255,255,255,0.2), 0 0 32px rgba(255,255,255,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                          (e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 1px 1px rgba(255,255,255,0.1)';
                        }}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)';
                        }}
                        onMouseUp={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                        }}
                      >
                        Explore Cafe
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
