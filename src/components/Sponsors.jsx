import React from 'react';
import { sponsorsData } from '../data/sponsorsData';

export default function Sponsors() {
  return (
    <section
      aria-labelledby="sponsors-title"
      style={{ padding: '36px 24px 44px', backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border-subtle)' }}
    >
      <h2
        id="sponsors-title"
        style={{
          margin: '0 0 24px',
          textAlign: 'center',
          font: '700 18px var(--font-family-base)',
          letterSpacing: '0.04em',
          color: '#E3122B'
        }}
      >
        OFFICIAL SPONSORS
      </h2>

      <ul
        style={{
          listStyle: 'none',
          margin: '0 auto',
          padding: 0,
          maxWidth: '1400px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px 32px'
        }}
      >
        {sponsorsData.map((s) => (
          <li key={s.name} style={{ display: 'flex', alignItems: 'center', height: '56px' }}>
            {s.logo ? (
              <img src={s.logo} alt={s.name} style={{ maxHeight: '56px', maxWidth: '150px', objectFit: 'contain' }} />
            ) : (
              // Placeholder until the logo file arrives
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '44px',
                  padding: '0 16px',
                  borderRadius: '10px',
                  border: '1.5px dashed var(--color-border)',
                  color: 'var(--color-ink-400)',
                  font: '600 13px var(--font-family-base)',
                  whiteSpace: 'nowrap'
                }}
              >
                {s.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
