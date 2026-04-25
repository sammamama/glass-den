'use client';

import React, { useId } from 'react';

interface GlowButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  small?: boolean;
  fullWidth?: boolean;
}

// Default: 120×60. Small (mobile): 84×42 (0.7×)
const SIZES = {
  default: {
    btnW: 134, btnH: 67,
    outerPath: 'path("M 100.5 0 C 135.3 0 141.1 5.6 141.1 36.9 C 141.1 68.2 135.3 73.8 100.5 73.8 L 36.9 73.8 C 5.6 73.8 0 68.2 0 36.9 C 0 5.6 5.6 0 36.9 0 Z")',
    innerPath: 'path("M 100.5 0 C 128.8 0 134 5.6 134 33.5 C 134 61.4 128.8 67 100.5 67 L 33.5 67 C 5.6 67 0 61.4 0 33.5 C 0 5.6 5.6 0 33.5 0 Z")',
  },
  small: {
    btnW: 84, btnH: 42,
    outerPath: 'path("M 63 0 C 84.7 0 88.2 3.5 88.2 23.1 C 88.2 42.7 84.7 46.2 63 46.2 L 23.1 46.2 C 3.5 46.2 0 42.7 0 23.1 C 0 3.5 3.5 0 23.1 0 Z")',
    innerPath: 'path("M 63 0 C 80.5 0 84 3.5 84 21 C 84 38.5 80.5 42 63 42 L 21 42 C 3.5 42 0 38.5 0 21 C 0 3.5 3.5 0 21 0 Z")',
  },
};

const GlowButton = ({ children = 'Register', onClick, small = false, fullWidth = false }: GlowButtonProps) => {
  const id = useId().replace(/:/g, '');
  const s = small ? SIZES.small : SIZES.default;
  const filters = {
    unopaq:  `unopaq-${id}`,
    unopaq2: `unopaq2-${id}`,
    unopaq3: `unopaq3-${id}`,
  };

  const btnH = s.btnH;
  const radius = fullWidth ? '9999px' : '0.875em';

  return (
    <div className={`relative group${fullWidth ? ' w-full' : ''}`}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter width="300%" x="-100%" height="300%" y="-100%" id={filters.unopaq}>
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 9 0" />
        </filter>
        <filter width="300%" x="-100%" height="300%" y="-100%" id={filters.unopaq2}>
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0" />
        </filter>
        <filter width="300%" x="-100%" height="300%" y="-100%" id={filters.unopaq3}>
          <feColorMatrix values="1 0 0 0.2 0 0 1 0 0.2 0 0 0 1 0.2 0 0 0 0 2 0" />
        </filter>
      </svg>

      <button
        onClick={onClick}
        className="absolute z-20 outline-none border-none cursor-pointer opacity-0"
        style={{
          width: fullWidth ? '100%' : s.btnW,
          height: btnH,
          borderRadius: radius,
        }}
      />

      <div className="relative">
        <div
          className="absolute inset-0 -z-20 opacity-40 overflow-hidden transition-opacity duration-300 group-hover:opacity-70 group-active:opacity-100"
          style={{ filter: `blur(2em) url(#${filters.unopaq})` }}
        >
          <div
            className="absolute inset-[-150%] group-hover:animate-[speen_8s_cubic-bezier(0.56,0.15,0.28,0.86)_infinite,woah_4s_infinite]"
            style={{ background: 'linear-gradient(90deg, #ffffff88 30%, #0000 50%, #ffffff88 70%)' }}
          />
        </div>

        <div
          className="absolute inset-[-0.125em] -z-20 opacity-40 overflow-hidden transition-opacity duration-300 group-hover:opacity-70 group-active:opacity-100"
          style={{ filter: `blur(0.25em) url(#${filters.unopaq2})`, borderRadius: radius }}
        >
          <div
            className="absolute inset-[-150%] group-hover:animate-[speen_8s_cubic-bezier(0.56,0.15,0.28,0.86)_infinite,woah_4s_infinite]"
            style={{ background: 'linear-gradient(90deg, #ffffffcc 20%, #0000 45% 55%, #ffffffcc 80%)' }}
          />
        </div>

        <div
          className="p-0.5"
          style={{
            background: 'rgba(255,255,255,0.08)',
            borderRadius: radius,
            ...(fullWidth ? {} : { clipPath: s.outerPath }),
          }}
        >
          <div className="relative">
            <div
              className="absolute -inset-0.5 -z-10 opacity-50 overflow-hidden transition-opacity duration-300 group-hover:opacity-80 group-active:opacity-100"
              style={{ filter: `blur(2px) url(#${filters.unopaq3})`, borderRadius: radius }}
            >
              <div
                className="absolute inset-[-150%] group-hover:animate-[speen_8s_cubic-bezier(0.56,0.15,0.28,0.86)_infinite,woah_4s_infinite]"
                style={{ background: 'linear-gradient(90deg, #ffffff 30%, #0000 45% 55%, #ffffff 70%)' }}
              />
            </div>

            <div
              className="flex items-center justify-center font-medium text-sm overflow-hidden"
              style={{
                width: fullWidth ? '100%' : s.btnW,
                height: btnH,
                background: '#ffffff',
                color: '#111',
                borderRadius: radius,
                ...(fullWidth ? {} : { clipPath: s.innerPath }),
                fontFamily: 'var(--font-body)',
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { GlowButton };
