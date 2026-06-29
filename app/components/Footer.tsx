'use client';

import { motion } from 'motion/react';
import { Camera, Music2, Globe, Mail, Phone, MapPin } from 'lucide-react';

const HOURS = [
  { days: 'Mon – Fri', time: '7:30am – 3:00pm' },
  { days: 'Saturday', time: '8:00am – 3:00pm' },
  { days: 'Sunday', time: '8:30am – 3:00pm' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    icon: Camera,
    href: 'https://instagram.com/theglassden',
  },
  {
    label: 'TikTok',
    icon: Music2,
    href: 'https://tiktok.com/@theglassden',
  },
  {
    label: 'Facebook',
    icon: Globe,
    href: 'https://facebook.com/theglassden',
  },
  {
    label: 'Email',
    icon: Mail,
    href: 'mailto:info@theglassden.com.au',
    text: 'info@theglassden.com.au',
  },
  {
    label: 'Phone',
    icon: Phone,
    href: 'tel:+61393545032',
    text: '(03) 9354 5032',
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{ background: 'hsl(48 30% 6%)', position: 'relative' }}
    >
      {/* Top glass edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.12) 70%, transparent 100%)',
        }}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 pt-20 pb-12">
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8"
        >
          {/* Column 1 -- Brand */}
          <div className="flex flex-col gap-5">
            <h2
              className="text-3xl sm:text-4xl tracking-tight"
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: 'hsl(var(--foreground))',
                lineHeight: 1.1,
              }}
            >
              Glass Den<sup className="text-xs align-super">&reg;</sup>
            </h2>

            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontFamily: 'var(--font-body)',
              }}
            >
              Housed in the historic Pentridge Prison gatehouse.
            </p>

            <div
              className="flex items-start gap-2 text-sm"
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontFamily: 'var(--font-body)',
              }}
            >
              <MapPin size={16} className="mt-0.5 shrink-0" style={{ opacity: 0.6 }} />
              <span>15 Urquhart St, Coburg VIC 3058</span>
            </div>
          </div>

          {/* Column 2 -- Hours */}
          <div className="flex flex-col gap-5">
            <h3
              className="text-lg tracking-wide"
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: 'hsl(var(--foreground))',
              }}
            >
              Hours
            </h3>

            <ul className="flex flex-col gap-2.5">
              {HOURS.map((row) => (
                <li
                  key={row.days}
                  className="flex justify-between text-sm max-w-xs"
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span>{row.days}</span>
                  <span style={{ opacity: 0.8 }}>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 -- Connect */}
          <div className="flex flex-col gap-5">
            <h3
              className="text-lg tracking-wide"
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: 'hsl(var(--foreground))',
              }}
            >
              Connect
            </h3>

            <ul className="flex flex-col gap-3">
              {SOCIALS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2.5 text-sm transition-colors duration-200 group"
                    style={{
                      color: 'hsl(var(--muted-foreground))',
                      fontFamily: 'var(--font-body)',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = 'hsl(var(--foreground))')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = 'hsl(var(--muted-foreground))')
                    }
                  >
                    <item.icon size={16} style={{ opacity: 0.7 }} />
                    <span>{item.text ?? item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p
            className="text-xs"
            style={{
              color: 'hsl(var(--muted-foreground))',
              fontFamily: 'var(--font-body)',
              opacity: 0.5,
            }}
          >
            &copy; 2026 The Glass Den. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{
              color: 'hsl(var(--muted-foreground))',
              fontFamily: 'var(--font-body)',
              opacity: 0.35,
            }}
          >
            Designed &amp; built by Samridh
          </p>
        </div>
      </div>
    </footer>
  );
}
