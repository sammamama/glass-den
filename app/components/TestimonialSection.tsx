'use client';

export default function TestimonialSection() {
  return (
    <section
      id="testimonials"
      aria-label="Social media testimonials"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: 'url(/test.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 z-10 flex flex-col items-center pointer-events-none pt-28 md:pt-20">
        <h1
          style={{
            fontFamily: "'Instrument Serif', serif",
            color: '#fff',
            fontWeight: 400,
            letterSpacing: '-1px',
            lineHeight: 1.05,
            textAlign: 'center',
          }}
        >
          <span className="text-8xl md:text-9xl">Good Food</span><br />
          <span className="text-4xl md:text-6xl" style={{ opacity: 0.85 }}>
            and a lifetime of memories
          </span>
        </h1>
      </div>
    </section>
  );
}
