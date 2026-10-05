import React, { useState, useEffect, useRef } from 'react';
import { statsData } from '../data/topicsData';

export default function Stats() {
  const containerRef = useRef(null);
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const targets = statsData.map((s) => s.target);

    const runCountAnimation = () => {
      const startTime = performance.now();
      const duration = 1600;

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Cubic ease out
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        setCounts(targets.map((target) => Math.round(target * easeProgress)));

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      runCountAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          runCountAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const cardStyles = [
    {
      // 01: รายการแข่งขัน
      className: 'stat-card-0',
      desktopTransform: 'translateY(80px) rotate(-18deg)',
      hoverTransform: 'translateY(40px) rotate(-6deg) scale(1.05)',
      background: 'linear-gradient(150deg, #FFC23A, #FF7A1A 55%, #FF4D1A)',
      boxShadow: '0 30px 50px -24px rgba(255, 90, 26, 0.75)',
      textColor: '#ffffff',
      numColor: '#ffffff',
      zIndex: 1
    },
    {
      // 02: ผู้แข่งขัน
      className: 'stat-card-1',
      desktopTransform: 'translateY(16px) rotate(-8deg)',
      hoverTransform: 'translateY(-6px) rotate(-2deg) scale(1.05)',
      background: '#ffffff',
      boxShadow: '0 30px 50px -26px rgba(14, 26, 51, 0.35)',
      border: '1px solid #EDEFF4',
      textColor: '#3A4560',
      numGradient: 'linear-gradient(135deg, #FF8A1F, #FF4D1A)',
      zIndex: 2
    },
    {
      // 03: ผู้ควบคุมทีม (Centerpiece)
      className: 'stat-card-2',
      desktopTransform: 'translateY(-6px)',
      hoverTransform: 'translateY(-24px) scale(1.06)',
      background: 'linear-gradient(150deg, #45BBFF, #1F7BFF 55%, #2A55F0)',
      boxShadow: '0 30px 50px -22px rgba(31, 123, 255, 0.75)',
      textColor: '#ffffff',
      numColor: '#ffffff',
      zIndex: 3
    },
    {
      // 04: ลงทะเบียนเข้าร่วม
      className: 'stat-card-3',
      desktopTransform: 'translateY(16px) rotate(8deg)',
      hoverTransform: 'translateY(-6px) rotate(2deg) scale(1.05)',
      background: '#ffffff',
      boxShadow: '0 30px 50px -26px rgba(14, 26, 51, 0.35)',
      border: '1px solid #EDEFF4',
      textColor: '#3A4560',
      numGradient: 'linear-gradient(135deg, #2FA6FF, #2A5BFF)',
      zIndex: 2
    },
    {
      // 05: รวมทั้งหมด
      className: 'stat-card-4',
      desktopTransform: 'translateY(80px) rotate(18deg)',
      hoverTransform: 'translateY(40px) rotate(6deg) scale(1.05)',
      background: 'linear-gradient(150deg, #1D2F66, #0E1A33)',
      boxShadow: '0 30px 50px -22px rgba(14, 26, 51, 0.7)',
      textColor: '#ffffff',
      numGradient: 'linear-gradient(135deg, #FFD34D, #FF8A1F 60%, #FF5A1F)',
      zIndex: 1
    }
  ];

  return (
    <section
      id="stats"
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '110px 24px 140px',
        backgroundColor: '#ffffff',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '48%',
          width: '1100px',
          height: '560px',
          transform: 'translate(-50%, -10%)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255, 178, 30, 0.16), rgba(31, 123, 255, 0.08) 45%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="section-header">
        <h2 className="section-title">สถิติการสมัครและลงทะเบียนเข้าร่วมการแข่งขัน</h2>
        <div className="section-bar" />
      </div>

      <div className="stats-card-container">
        {statsData.map((item, index) => {
          const cfg = cardStyles[index];
          return (
            <div
              key={item.id}
              className={`stat-card ${cfg.className}`}
              style={{
                width: '220px',
                height: '236px',
                margin: '0 -10px',
                borderRadius: '28px',
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                background: cfg.background,
                border: cfg.border || 'none',
                boxShadow: cfg.boxShadow,
                zIndex: cfg.zIndex,
                cursor: 'pointer',
                transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease'
              }}
            >
              <div
                style={{
                  font: '600 24px var(--font-family-base)',
                  color: cfg.textColor,
                  whiteSpace: 'nowrap',
                  textAlign: 'center'
                }}
              >
                {item.label}
              </div>

              <div
                style={{
                  font: '700 92px/1 var(--font-family-base)',
                  letterSpacing: '-0.03em',
                  fontVariantNumeric: 'tabular-nums',
                  color: cfg.numColor || 'inherit',
                  ...(cfg.numGradient
                    ? {
                        background: cfg.numGradient,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent'
                      }
                    : {})
                }}
              >
                {counts[index]}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .stats-card-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          max-width: 1180px;
          margin: 0 auto;
          gap: 16px;
        }

        @media (min-width: 1040px) {
          .stats-card-container {
            gap: 0;
            flex-wrap: nowrap;
          }
          .stat-card-0 { transform: translateY(80px) rotate(-18deg); }
          .stat-card-0:hover { transform: translateY(40px) rotate(-6deg) scale(1.05); }

          .stat-card-1 { transform: translateY(16px) rotate(-8deg); }
          .stat-card-1:hover { transform: translateY(-6px) rotate(-2deg) scale(1.05); }

          .stat-card-2 { transform: translateY(-6px); }
          .stat-card-2:hover { transform: translateY(-24px) scale(1.06); }

          .stat-card-3 { transform: translateY(16px) rotate(8deg); }
          .stat-card-3:hover { transform: translateY(-6px) rotate(2deg) scale(1.05); }

          .stat-card-4 { transform: translateY(80px) rotate(18deg); }
          .stat-card-4:hover { transform: translateY(40px) rotate(6deg) scale(1.05); }
        }

        @media (max-width: 1039px) {
          .stat-card {
            margin: 0 !important;
            transform: none !important;
          }
          .stat-card:hover {
            transform: translateY(-8px) scale(1.02) !important;
          }
        }
      `}</style>
    </section>
  );
}
