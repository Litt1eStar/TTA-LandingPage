import React from 'react';

export default function Hero({ onOpenLogin, onShowResults }) {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '760px',
        paddingTop: '100px',
        paddingBottom: '60px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #FFF3E6 0%, #FFFFFF 42%, #E6F1FF 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient lighting orbs */}
      <div
        style={{
          position: 'absolute',
          width: '820px',
          height: '820px',
          right: '-160px',
          top: '-180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 150, 40, 0.45), rgba(255, 106, 26, 0.15) 45%, rgba(255, 106, 26, 0) 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '760px',
          height: '760px',
          left: '-240px',
          bottom: '-340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(47, 140, 255, 0.4), rgba(47, 140, 255, 0.12) 45%, rgba(47, 140, 255, 0) 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '520px',
          height: '520px',
          right: '22%',
          bottom: '-300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 210, 60, 0.35), rgba(255, 210, 60, 0) 68%)',
          pointerEvents: 'none'
        }}
      />

      {/* Decorative dot matrix pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(14, 26, 51, 0.08) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)',
          maskImage: 'linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)',
          pointerEvents: 'none'
        }}
      />

      <div className="tta-container" style={{ position: 'relative', width: '100%', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Headlines and CTAs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              animation: 'ttaFadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
            }}
          >
            {/* Pill Badge */}
            <div style={{ display: 'flex' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '7px 16px 7px 8px',
                  borderRadius: '999px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 6px 18px -8px rgba(14, 26, 51, 0.25)',
                  font: '600 14px var(--font-family-base)',
                  color: 'var(--color-ink-900)',
                  border: '1px solid rgba(14, 26, 51, 0.04)'
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFB21E, #FF4D1A)',
                    color: '#ffffff',
                    display: 'grid',
                    placeItems: 'center',
                    font: '700 12px var(--font-family-base)'
                  }}
                >
                  13
                </span>
                การแข่งขันระดับประเทศ ครั้งที่ 13
              </span>
            </div>

            {/* Main Title */}
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(2.5rem, 5.2vw, 3.85rem)',
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink-900)'
              }}
            >
              Thailand Teaching Academy Award{' '}
              <span
                style={{
                  background: 'linear-gradient(100deg, #FFB21E, #FF6A1A 50%, #FF4D1A)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'inline-block'
                }}
              >
                2026
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                lineHeight: 1.6,
                fontWeight: 400,
                color: 'var(--color-ink-500)',
                maxWidth: '560px'
              }}
            >
              การแข่งขันทักษะทางวิชาการระดับประเทศ
              <br />
              ของเครือข่ายครุศาสตร์อุตสาหกรรม ครั้งที่ 13
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '8px' }}>
              <button
                onClick={onOpenLogin}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  font: '600 17px var(--font-family-base)',
                  color: '#ffffff',
                  height: '56px',
                  padding: '0 32px',
                  borderRadius: '16px',
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--shadow-primary)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-primary-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-primary)';
                }}
              >
                <span>เข้าสู่ระบบ</span>
                <span className="icon" style={{ fontSize: '22px' }}>arrow_forward</span>
              </button>

              <button
                onClick={onShowResults}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  font: '600 17px var(--font-family-base)',
                  color: '#ffffff',
                  height: '56px',
                  padding: '0 30px',
                  borderRadius: '16px',
                  background: 'var(--gradient-blue)',
                  boxShadow: 'var(--shadow-blue)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-blue-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-blue)';
                }}
              >
                <span className="icon" style={{ fontSize: '22px' }}>trophy</span>
                <span>สรุปผลรางวัล</span>
              </button>
            </div>
          </div>

          {/* Right Column: Floating Logo Visual */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Soft Radial Glow */}
            <div
              style={{
                position: 'absolute',
                inset: '6% 6%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 70%)',
                filter: 'blur(10px)',
                zIndex: 1
              }}
            />

            <img
              src="/assets/logo.png"
              alt="Thailand Teaching Academy Award 2026"
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: '560px',
                aspectRatio: '1400/632',
                height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 24px 34px rgba(31, 90, 200, 0.16))',
                animation: 'ttaFloat 6s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
