import React from 'react';
import { universitiesData } from '../data/universitiesData';

export default function Universities() {
  return (
    <section
      id="universities"
      style={{ position: 'relative', padding: '110px 24px 120px', backgroundColor: 'var(--color-surface-gray)' }}
    >
      <div className="section-header">
        <h2 className="section-title">สถาบันเครือข่าย</h2>
        <div className="section-bar" />
        <p className="section-subtitle">
          {universitiesData.length} สถาบันในเครือข่ายครุศาสตร์อุตสาหกรรมที่ร่วมการแข่งขัน
        </p>
      </div>

      <ul className="university-grid reveal">
        {universitiesData.map((u) => (
          <li key={u.code} className="university-card">
            <div style={{ height: '96px', display: 'grid', placeItems: 'center' }}>
              <img
                src={u.logo}
                alt={`ตราสัญลักษณ์${u.name}`}
                loading="lazy"
                style={{ maxHeight: '96px', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>
            <div style={{ font: '700 16px var(--font-family-base)', color: 'var(--color-primary)', letterSpacing: '0.02em' }}>
              {u.code}
            </div>
            <div style={{ font: '500 13px/1.45 var(--font-family-base)', color: 'var(--color-ink-500)' }}>
              {u.name}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
