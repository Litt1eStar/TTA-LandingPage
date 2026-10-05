import React, { useState } from 'react';
import { scheduleSteps } from '../data/scheduleData';

export default function Schedule() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section
      id="schedule"
      style={{
        position: 'relative',
        padding: '110px 24px 120px',
        background: 'linear-gradient(135deg, #1747D6 0%, #1F7BFF 48%, #35ADFF 100%)',
        overflow: 'hidden',
        color: '#ffffff'
      }}
    >
      {/* Background ambient lighting orbs */}
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          right: '-220px',
          bottom: '-320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 150, 40, 0.55), rgba(255, 106, 26, 0) 65%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          left: '-240px',
          top: '-260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120, 210, 255, 0.45), rgba(120, 210, 255, 0) 65%)',
          pointerEvents: 'none'
        }}
      />

      <div className="section-header">
        <h2 className="section-title" style={{ color: '#ffffff' }}>
          กำหนดการ
        </h2>
        <div
          className="section-bar"
          style={{ background: 'linear-gradient(90deg, #FFD34D, #FF8A1F)' }}
        />
        <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
          แตะที่แต่ละขั้นตอนเพื่อดูสถานะและรายละเอียด
        </p>
      </div>

      {/* Desktop Wave Track Layout (>= 992px) */}
      <div className="schedule-desktop-view">
        <div style={{ position: 'relative', maxWidth: '1100px', height: '520px', margin: '0 auto' }}>
          {/* SVG Sine Wave Track */}
          <svg
            viewBox="0 0 600 520"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
            aria-hidden="true"
          >
            <path
              d="M50 205 C50 330 110 355 150 355 C190 355 250 330 250 205 C250 330 310 355 350 355 C390 355 450 330 450 205 C450 330 510 355 550 355"
              fill="none"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="12"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
              height: '100%'
            }}
          >
            {scheduleSteps.map((s, i) => {
              const isHigh = i % 2 === 0;
              const isActive = s.step === activeStep;
              const paddingTop = isHigh ? '0px' : '150px';

              return (
                <div
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveStep(s.step)}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop,
                    cursor: 'pointer'
                  }}
                  className="schedule-step-node"
                >
                  {/* Step Card Tower */}
                  <div
                    style={{
                      position: 'relative',
                      width: '114px',
                      height: '190px',
                      borderRadius: '16px 16px 0 0',
                      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0))',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '10px',
                      paddingTop: '18px',
                      transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
                    }}
                    className="step-pillar"
                  >
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-32px',
                          whiteSpace: 'nowrap',
                          padding: '5px 14px',
                          borderRadius: '999px',
                          backgroundColor: '#ffffff',
                          color: '#FF5A1F',
                          font: '700 13px var(--font-family-base)',
                          boxShadow: '0 6px 16px -4px rgba(0, 0, 0, 0.35)',
                          animation: 'ttaPop 0.3s ease forwards'
                        }}
                      >
                        ขณะนี้
                      </span>
                    )}

                    <div
                      style={{
                        position: 'relative',
                        font: '700 48px/1 var(--font-family-base)',
                        color: '#ffffff',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {s.n}
                    </div>

                    <span
                      className="icon"
                      style={{
                        position: 'relative',
                        fontSize: '56px',
                        color: '#ffffff'
                      }}
                    >
                      {s.icon}
                    </span>
                  </div>

                  {/* 3D Round Base with Lighting Rim */}
                  <div style={{ position: 'relative', width: '136px', height: '56px', marginTop: '-26px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '34px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(6, 20, 70, 0.35)',
                        filter: 'blur(6px)'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '12px',
                        height: '42px',
                        borderRadius: '50%',
                        background: isActive
                          ? 'linear-gradient(90deg, #E0480F, #FFB21E 45%, #FF6A1A 70%, #C93D0B)'
                          : 'linear-gradient(90deg, #8FA7D6, #FFFFFF 45%, #C9D6EE 70%, #6F88BD)',
                        transition: 'background 0.3s ease'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: '42px',
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse at 50% 35%, #FFFFFF, #E4ECFA)',
                        border: '1px solid rgba(255, 255, 255, 0.9)',
                        boxShadow: 'inset 0 -3px 6px rgba(31, 90, 200, 0.15)'
                      }}
                    />
                  </div>

                  {/* Title and Date Labels */}
                  {isHigh ? (
                    <div
                      style={{
                        position: 'absolute',
                        top: '22px',
                        left: 'calc(50% + 64px)',
                        width: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}
                    >
                      <div style={{ font: '700 16px/1.35 var(--font-family-base)', color: '#ffffff' }}>
                        {s.title}
                      </div>
                      <div style={{ font: '500 14px var(--font-family-base)', color: 'rgba(255, 255, 255, 0.88)' }}>
                        {s.date}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: '16px',
                        width: '190px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ font: '700 16px/1.35 var(--font-family-base)', color: '#ffffff' }}>
                        {s.title}
                      </div>
                      <div style={{ font: '500 14px var(--font-family-base)', color: 'rgba(255, 255, 255, 0.88)' }}>
                        {s.date}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Timeline (< 992px) */}
      <div className="schedule-mobile-view">
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {scheduleSteps.map((s) => {
            const isActive = s.step === activeStep;
            return (
              <div
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  borderRadius: '20px',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.12)',
                  border: isActive ? '1.5px solid #FFB21E' : '1px solid rgba(255, 255, 255, 0.18)',
                  backdropFilter: 'blur(8px)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: isActive ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.2)',
                    display: 'grid',
                    placeItems: 'center',
                    flex: 'none'
                  }}
                >
                  <span className="icon" style={{ fontSize: '26px', color: '#ffffff' }}>
                    {s.icon}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ font: '700 13px ui-monospace', opacity: 0.85 }}>{s.n}</span>
                    <div style={{ font: '700 17px var(--font-family-base)' }}>{s.title}</div>
                    {isActive && (
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '999px',
                          backgroundColor: '#FF5A1F',
                          color: '#ffffff',
                          font: '700 11px var(--font-family-base)'
                        }}
                      >
                        ขณะนี้
                      </span>
                    )}
                  </div>
                  <div style={{ font: '400 14px var(--font-family-base)', opacity: 0.85, marginTop: '2px' }}>
                    {s.date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .step-pillar:hover {
          transform: translateY(-6px);
        }

        @media (min-width: 992px) {
          .schedule-desktop-view {
            display: block;
          }
          .schedule-mobile-view {
            display: none;
          }
        }

        @media (max-width: 991px) {
          .schedule-desktop-view {
            display: none;
          }
          .schedule-mobile-view {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
