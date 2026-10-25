import React, { useState } from 'react';
import { topicsData } from '../data/topicsData';
import { venueBuildings, venuesIsSample } from '../data/venuesData';
import SampleBadge from './SampleBadge';

const buildings = venueBuildings.map((b) => ({
  ...b,
  topics: topicsData.filter((t) => t.buildingCode === b.code)
}));

export default function Venues() {
  const [activeCode, setActiveCode] = useState(null);

  return (
    <section
      id="venues"
      style={{ position: 'relative', padding: '110px 24px 120px', backgroundColor: 'var(--color-surface-gray)' }}
    >
      <div className="section-header">
        <h2 className="section-title">สถานที่แข่งขัน</h2>
        <div className="section-bar" />
        <p className="section-subtitle">ชี้หรือแตะที่รหัสอาคารบนแผนที่เพื่อดูว่าแต่ละอาคารมีการแข่งขันอะไรบ้าง</p>
        {venuesIsSample && <SampleBadge />}
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Campus map with building markers */}
        <div
          style={{
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            boxShadow: '0 24px 50px -30px rgba(14, 26, 51, 0.35)',
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Minimum width keeps markers apart on phones; the map scrolls sideways instead */}
          <div style={{ position: 'relative', minWidth: '720px' }} onMouseLeave={() => setActiveCode(null)}>
            <img
              src="/assets/kmutt-location-3d.svg"
              alt="แผนผังมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (มจธ. บางมด)"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />

            {buildings.map((b) => {
              const active = activeCode === b.code;
              // Keep the tooltip inside the map: open it to the left for buildings on the right half.
              const openLeft = b.x > 55;
              return (
                <div
                  key={b.code}
                  style={{
                    position: 'absolute',
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: active ? 3 : 2
                  }}
                >
                  <button
                    type="button"
                    aria-label={`อาคาร ${b.code}`}
                    aria-expanded={active}
                    onMouseEnter={() => setActiveCode(b.code)}
                    onFocus={() => setActiveCode(b.code)}
                    onBlur={() => setActiveCode(null)}
                    // A tap fires mouseenter before click, so click only ever opens; blur closes it
                    onClick={() => setActiveCode(b.code)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '5px 10px 5px 7px',
                      borderRadius: '999px',
                      background: active ? 'var(--gradient-blue)' : 'var(--gradient-primary)',
                      color: '#ffffff',
                      font: '700 13px var(--font-family-base)',
                      boxShadow: '0 8px 16px -6px rgba(14, 26, 51, 0.55)',
                      border: '2px solid #ffffff',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span className="icon" style={{ fontSize: '16px' }}>location_on</span>
                    {b.code}
                  </button>

                  {active && (
                    <div
                      role="tooltip"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        [openLeft ? 'right' : 'left']: '-8px',
                        width: '240px',
                        padding: '14px 16px',
                        borderRadius: '16px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 20px 40px -16px rgba(14, 26, 51, 0.45)',
                        border: '1px solid var(--color-border)',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ font: '700 16px var(--font-family-base)', color: '#0E1A33', marginBottom: '8px' }}>
                        อาคาร {b.code}
                      </div>
                      {b.topics.length === 0 ? (
                        <div style={{ font: '400 14px var(--font-family-base)', color: 'var(--color-ink-400)' }}>
                          ยังไม่มีการแข่งขัน
                        </div>
                      ) : (
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '8px' }}>
                          {b.topics.map((t) => (
                            <li key={t.id} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                              <span className="icon" style={{ fontSize: '18px', color: 'var(--color-primary)' }}>
                                {t.icon}
                              </span>
                              <span>
                                <span style={{ display: 'block', font: '600 14px var(--font-family-base)', color: '#0E1A33' }}>
                                  {t.name}
                                </span>
                                <span style={{ display: 'block', font: '400 12px var(--font-family-base)', color: 'var(--color-ink-400)' }}>
                                  {t.building} · {t.date}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Overview table of every venue */}
        <div style={{ marginTop: '40px', overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              minWidth: '560px',
              borderCollapse: 'separate',
              borderSpacing: 0,
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px -28px rgba(14, 26, 51, 0.4)'
            }}
          >
            <thead>
              <tr style={{ background: 'var(--gradient-blue)', color: '#ffffff' }}>
                {['อาคาร', 'การแข่งขัน', 'ห้อง / พื้นที่', 'วันที่'].map((h) => (
                  <th key={h} style={{ padding: '14px 18px', textAlign: 'left', font: '600 15px var(--font-family-base)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buildings.flatMap((b) =>
                b.topics.map((t, i) => (
                  <tr key={t.id}>
                    {i === 0 && (
                      <td
                        rowSpan={b.topics.length}
                        style={{
                          padding: '14px 18px',
                          font: '700 16px var(--font-family-base)',
                          color: 'var(--color-primary)',
                          borderTop: '1px solid var(--color-border-subtle)',
                          verticalAlign: 'top'
                        }}
                      >
                        {b.code}
                      </td>
                    )}
                    <td style={{ padding: '14px 18px', font: '600 15px var(--font-family-base)', borderTop: '1px solid var(--color-border-subtle)' }}>
                      {t.name}
                    </td>
                    <td style={{ padding: '14px 18px', font: '400 15px var(--font-family-base)', color: 'var(--color-ink-500)', borderTop: '1px solid var(--color-border-subtle)' }}>
                      {t.building}
                    </td>
                    <td style={{ padding: '14px 18px', font: '400 15px var(--font-family-base)', color: 'var(--color-ink-500)', borderTop: '1px solid var(--color-border-subtle)', whiteSpace: 'nowrap' }}>
                      {t.date}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
