import React, { useEffect, useState } from 'react';

// Floating "back to top" button, shown once the viewer has scrolled past the hero
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="กลับขึ้นด้านบน"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      // Hidden from keyboard and screen readers while it is not shown
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      style={{
        position: 'fixed',
        // Hugs the corner on phones, a little more breathing room on desktop
        right: 'clamp(12px, 3vw, 24px)',
        bottom: 'clamp(12px, 3vw, 24px)',
        zIndex: 85,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--gradient-primary)',
        color: '#ffffff',
        boxShadow: 'var(--shadow-primary)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.25s ease, transform 0.25s ease'
      }}
    >
      <span className="icon" aria-hidden="true" style={{ fontSize: '26px' }}>arrow_upward</span>
    </button>
  );
}
