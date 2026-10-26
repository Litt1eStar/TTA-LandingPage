import React from 'react';
import { sponsorsData } from '../data/sponsorsData';

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-title"
      style={{ position: 'relative', padding: '110px 24px 120px', backgroundColor: '#ffffff' }}
    >
      <div className="section-header">
        <span style={{ font: '700 14px var(--font-family-base)', letterSpacing: '0.12em', color: '#E3122B' }}>
          OFFICIAL SPONSORS
        </span>
        <h2 id="sponsors-title" className="section-title">ผู้สนับสนุน</h2>
        <div className="section-bar" />
        <p className="section-subtitle">ขอขอบคุณผู้สนับสนุนการแข่งขัน TTA 2027</p>
      </div>

      <ul className="sponsor-grid">
        {sponsorsData.map((s) => (
          <li key={s.name} className="sponsor-card">
            <img src={s.logo} alt={s.name} loading="lazy" />
          </li>
        ))}
      </ul>
    </section>
  );
}
