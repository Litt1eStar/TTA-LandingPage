import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenLogin, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'หน้าหลัก' },
    { id: 'topics', label: 'หัวข้อการแข่งขัน' },
    { id: 'schedule', label: 'กำหนดการ' },
    { id: 'news', label: 'ข่าวสาร' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollY > 60);

      const sections = ['news', 'schedule', 'topics', 'home'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
    onNavigate?.(id);
  };

  return (
    <>
      {/* Top Standard Header (shown when at the top of the page on larger screens) */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          height: '88px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderBottom: '1px solid #ECEEF3',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
          pointerEvents: scrolled ? 'none' : 'auto'
        }}
      >
        <div
          className="tta-container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            style={{ display: 'flex', alignItems: 'center' }}
            aria-label="TTA 2026 Home"
          >
            <img
              src="/assets/logo.png"
              alt="Thailand Teaching Academy Award 2026"
              style={{ height: '54px', width: 'auto', display: 'block' }}
            />
          </a>

          {/* Desktop Nav Items */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '36px'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  style={{
                    position: 'relative',
                    font: '500 17px var(--font-family-base)',
                    color: isActive ? '#FF6A1A' : 'var(--color-ink-900)',
                    padding: '8px 0',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2.5px',
                        borderRadius: '2px',
                        background: 'var(--gradient-primary)'
                      }}
                    />
                  )}
                </a>
              );
            })}
            <button
              onClick={onOpenLogin}
              style={{
                font: '600 16px var(--font-family-base)',
                color: '#ffffff',
                padding: '12px 28px',
                borderRadius: '14px',
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--shadow-primary)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              เข้าสู่ระบบ
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#F6F8FC',
              color: 'var(--color-ink-900)'
            }}
            aria-label="เมนู"
          >
            <span className="icon" style={{ fontSize: '26px' }}>
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Floating Pill Nav (shown on scroll) */}
      <header
        style={{
          position: 'fixed',
          top: '18px',
          left: 0,
          right: 0,
          zIndex: 90,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 20px',
          transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? 'translateY(0)' : 'translateY(-20px)',
          pointerEvents: scrolled ? 'auto' : 'none'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '860px',
            height: '62px',
            padding: '0 8px 0 20px',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(14, 26, 51, 0.08)',
            boxShadow: '0 14px 34px -12px rgba(14, 26, 51, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px'
          }}
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            style={{ display: 'flex', alignItems: 'center' }}
            aria-label="TTA 2026 Home"
          >
            <img
              src="/assets/logo.png"
              alt="TTA 2026"
              style={{ height: '36px', width: 'auto', display: 'block' }}
            />
          </a>

          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  style={{
                    font: '500 15px var(--font-family-base)',
                    color: isActive ? '#ffffff' : 'var(--color-ink-900)',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    background: isActive ? 'linear-gradient(135deg, #2FA6FF, #2A5BFF)' : 'transparent',
                    boxShadow: isActive ? '0 4px 14px -4px rgba(31, 123, 255, 0.6)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#FF6A1A';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--color-ink-900)';
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onOpenLogin}
              style={{
                font: '600 15px var(--font-family-base)',
                color: '#ffffff',
                height: '46px',
                padding: '0 24px',
                borderRadius: '999px',
                background: 'var(--gradient-primary)',
                boxShadow: '0 8px 18px -8px rgba(255, 106, 26, 0.8)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              เข้าสู่ระบบ
            </button>

            {/* Mobile menu trigger in pill mode */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#F6F8FC',
                color: 'var(--color-ink-900)'
              }}
              aria-label="เมนู"
            >
              <span className="icon" style={{ fontSize: '22px' }}>
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 95,
            backgroundColor: 'rgba(9, 18, 40, 0.5)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'ttaFade 0.2s ease'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '80%',
              maxWidth: '320px',
              height: '100%',
              backgroundColor: '#ffffff',
              padding: '30px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.2)',
              animation: 'ttaFadeUp 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <img src="/assets/logo.png" alt="TTA 2026" style={{ height: '44px', width: 'auto' }} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#F2F4F8',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--color-ink-900)'
                }}
              >
                <span className="icon" style={{ fontSize: '20px' }}>close</span>
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  style={{
                    font: '600 17px var(--font-family-base)',
                    color: activeSection === link.id ? '#FF6A1A' : 'var(--color-ink-900)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: activeSection === link.id ? '#FFF1E6' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  {link.label}
                  <span className="icon" style={{ fontSize: '18px' }}>chevron_right</span>
                </a>
              ))}
            </nav>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin?.();
              }}
              style={{
                marginTop: 'auto',
                font: '600 16px var(--font-family-base)',
                color: '#ffffff',
                padding: '14px',
                borderRadius: '14px',
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--shadow-primary)'
              }}
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
