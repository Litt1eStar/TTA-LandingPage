import React, { useCallback, useEffect, useRef, useState } from 'react';
import { bannersData } from '../data/bannersData';

const AUTOPLAY_MS = 6000;

// Placeholder backgrounds per theme; the mourning banner stays in black and grey
const themes = {
  brand: {
    background: 'linear-gradient(120deg, #FFB21E 0%, #FF6A1A 45%, #1F7BFF 100%)',
    color: '#ffffff'
  },
  gold: {
    background: 'linear-gradient(120deg, #3A2A06 0%, #8A6416 45%, #E6B94A 100%)',
    color: '#FFF6DC'
  },
  mourning: {
    background: 'linear-gradient(120deg, #0B0B0D 0%, #26272B 60%, #46474D 100%)',
    color: '#EDEDEF'
  }
};

function BannerPlaceholder({ banner }) {
  const theme = themes[banner.theme] || themes.brand;
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '24px',
        textAlign: 'center',
        background: theme.background,
        color: theme.color,
        overflow: 'hidden'
      }}
    >
      {/* Diagonal stripes mark this as a placeholder, not a finished design */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 18px, transparent 18px 36px)'
        }}
      />
      <span className="icon" aria-hidden="true" style={{ position: 'relative', fontSize: 'clamp(34px, 5vw, 64px)' }}>
        {banner.icon}
      </span>
      <div style={{ position: 'relative', font: '700 clamp(22px, 3.4vw, 44px)/1.2 var(--font-family-base)' }}>
        {banner.title}
      </div>
      <div style={{ position: 'relative', font: '500 clamp(13px, 1.5vw, 18px)/1.4 var(--font-family-base)', opacity: 0.9 }}>
        {banner.subtitle}
      </div>
      <span
        className="banner-size-tag"
        style={{
          position: 'relative',
          marginTop: '6px',
          padding: '4px 12px',
          borderRadius: '999px',
          border: '1px dashed currentColor',
          font: '600 12px var(--font-family-base)',
          opacity: 0.8
        }}
      >
        Banner placeholder · 1920 × 600
      </span>
    </div>
  );
}

export default function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const count = bannersData.length;

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count]);

  // Autoplay, unless paused (hover or focus) or the viewer prefers reduced motion
  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduceMotion || count < 2) return undefined;
    const timer = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, count, goTo]);

  const arrowStyle = (side) => ({
    position: 'absolute',
    top: '50%',
    [side]: '16px',
    transform: 'translateY(-50%)',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    color: '#0E1A33',
    boxShadow: '0 8px 20px -8px rgba(14, 26, 51, 0.5)',
    zIndex: 2
  });

  return (
    <section
      aria-roledescription="carousel"
      className="on-dark"
      aria-label="แบนเนอร์ประชาสัมพันธ์"
      style={{ padding: '24px 24px 0', backgroundColor: '#ffffff' }}
    >
      <div
        style={{
          position: 'relative',
          // An explicit width stops minHeight from widening the box through the aspect ratio
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          aspectRatio: '16 / 5',
          // Phones get a taller box; a real banner image is cropped to fit (object-fit: cover)
          minHeight: '180px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 24px 50px -30px rgba(14, 26, 51, 0.45)'
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
          touchStartX.current = null;
        }}
      >
        {/* Slides track */}
        <div
          style={{
            display: 'flex',
            height: '100%',
            transform: `translateX(-${index * 100}%)`,
            transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          {bannersData.map((banner, i) => (
            <div
              key={banner.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} จาก ${count}: ${banner.title}`}
              aria-hidden={i !== index}
              style={{ flex: '0 0 100%', height: '100%' }}
            >
              {banner.image ? (
                <img
                  src={banner.image}
                  alt={banner.alt}
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <BannerPlaceholder banner={banner} />
              )}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button type="button" aria-label="แบนเนอร์ก่อนหน้า" onClick={() => goTo(index - 1)} style={arrowStyle('left')} className="banner-arrow">
              <span className="icon" aria-hidden="true" style={{ fontSize: '26px' }}>chevron_left</span>
            </button>
            <button type="button" aria-label="แบนเนอร์ถัดไป" onClick={() => goTo(index + 1)} style={arrowStyle('right')} className="banner-arrow">
              <span className="icon" aria-hidden="true" style={{ fontSize: '26px' }}>chevron_right</span>
            </button>

            {/* Dots */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '14px',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 2
              }}
            >
              {bannersData.map((banner, i) => (
                <button
                  key={banner.id}
                  type="button"
                  aria-label={`ไปที่แบนเนอร์ ${banner.title}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === index ? '28px' : '10px',
                    height: '10px',
                    padding: 0,
                    borderRadius: '999px',
                    backgroundColor: i === index ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
                    transition: 'width 0.3s ease, background-color 0.3s ease'
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
