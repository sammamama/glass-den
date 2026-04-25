'use client';

import { useState } from 'react';
import { Music2, Camera } from 'lucide-react';

type EmbedType = 'tiktok' | 'instagram';

type EmbedConfig = {
  type: EmbedType;
  src: string;
  left: string;
  top: string;
  rotate: number;
  width: string;
  height: string;
};

const EMBEDS: EmbedConfig[] = [
  // top-left, leaning out
  {
    type: 'tiktok',
    src: 'https://www.tiktok.com/embed/v2/7551323573407763719?autoplay=1&muted=1',
    left: '-3%', top: '4%', rotate: -8, width: '40vh', height: '50vh',
  },
  // left side, lower
  {
    type: 'tiktok',
    src: 'https://www.tiktok.com/embed/v2/7482356083118411016?autoplay=1&muted=1',
    left: '7%', top: '44%', rotate: 5, width: '25vh', height: '30vh',
  },
  // bottom-left, partially cut off
  {
    type: 'instagram',
    src: 'https://www.instagram.com/reel/DXN40iOgZTM/embed/?autoplay=1&muted=true',
    left: '26%', top: '62%', rotate: -3, width: '35vh', height: '40vh',
  },
  // bottom-right, partially cut off
  {
    type: 'tiktok',
    src: 'https://www.tiktok.com/embed/v2/7630366673492512020?autoplay=1&muted=1',
    left: '56%', top: '58%', rotate: 4, width: '30vh', height: '30vh',
  },
  // right side, mid
  {
    type: 'tiktok',
    src: 'https://www.tiktok.com/embed/v2/7618500623365246228?autoplay=1&muted=1',
    left: '74%', top: '36%', rotate: -6, width: '25vh', height: '40vh',
  },
  // top-right, leaning
  {
    type: 'instagram',
    src: 'https://www.instagram.com/reel/DPUtL9iE1tv/embed/?autoplay=1&muted=true',
    left: '82%', top: '2%', rotate: 9, width: '40vh', height: '50vh',
  },
];

function EmbedCard({ embed }: { embed: EmbedConfig }) {
  const [loaded, setLoaded] = useState(false);
  const Icon = embed.type === 'tiktok' ? Music2 : Camera;

  return (
    <div
      style={{
        position: 'absolute',
        left: embed.left,
        top: embed.top,
        width: embed.width,
        height: embed.height,
        borderRadius: 12,
        overflow: 'hidden',
        transform: `rotate(${embed.rotate}deg)`,
        boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
        transition: 'transform 0.3s',
      }}
    >
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse flex flex-col items-center justify-center gap-3"
          style={{ background: 'rgba(15,15,15,0.9)' }}
        >
          <Icon size={24} color="rgba(255,255,255,0.55)" strokeWidth={1.5} />
          <div style={{ width: '55%', height: 6, borderRadius: 4, background: 'rgba(255,255,255,0.14)' }} />
          <div style={{ width: '35%', height: 6, borderRadius: 4, background: 'rgba(255,255,255,0.09)' }} />
        </div>
      )}

      <iframe
        src={embed.src}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          overflow: 'hidden',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s',
          display: 'block',
        }}
        allow="autoplay; muted; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: 'url(/test.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Title */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center pointer-events-none pt-28 md:pt-20">
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

      {/* Mobile — horizontal snap scroll strip */}
      <div
        className="md:hidden absolute inset-0 z-2 flex items-end"
        style={{ paddingBottom: '2vh' }}
      >
        <div
          className="flex gap-4 overflow-x-auto w-full px-5"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '12px',
          }}
        >
          {EMBEDS.map((embed, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: '68vw',
                height: '52vw',
                borderRadius: 12,
                overflow: 'hidden',
                scrollSnapAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                transform: `rotate(${embed.rotate * 0.4}deg)`,
              }}
            >
              <iframe
                src={embed.src}
                style={{ width: '100%', height: '100%', border: 'none', overflow: 'hidden', display: 'block' }}
                allow="autoplay; muted; clipboard-write; encrypted-media; web-share"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop — scattered absolute layout */}
      <div className="hidden md:block absolute inset-0 z-2">
        {EMBEDS.map((embed, i) => (
          <EmbedCard key={i} embed={embed} />
        ))}
      </div>
    </section>
  );
}
