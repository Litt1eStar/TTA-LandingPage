import React from 'react';
import { statsTableBands, statsTableIsSample } from '../data/statsTableData';
import SampleBadge from './SampleBadge';

// Colours per group, taken from the site's brand gradients
const tones = {
  orange: { header: 'var(--gradient-primary)', tint: '#FFF3EA', ink: '#E2550F' },
  blue: { header: 'var(--gradient-blue)', tint: '#ECF4FF', ink: '#1747D6' },
  gold: { header: 'linear-gradient(135deg, #FFD34D, #FF8A1F)', tint: '#FFF8E3', ink: '#C26A00' },
  navy: { header: 'linear-gradient(135deg, #1D2F66, #0E1A33)', tint: '#F1F4FA', ink: '#1D2F66' }
};

const line = '1px solid rgba(255, 255, 255, 0.35)';
const gridLine = '1px solid var(--color-border-subtle)';

const headerCell = (tone, first) => ({
  padding: '14px 10px',
  background: tones[tone].header,
  color: '#ffffff',
  font: '700 15px var(--font-family-base)',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  borderLeft: first ? 'none' : line
});

// One card holding a two-row-header table for a set of groups
function StatsBand({ groups }) {
  const cells = groups.flatMap((g) =>
    g.columns
      ? g.columns.map((c, i) => ({ count: c.count, tone: g.tone, first: i === 0 }))
      : [{ count: g.count, tone: 'navy', first: true }]
  );

  return (
    <div
      style={{
        borderRadius: '24px',
        backgroundColor: '#ffffff',
        boxShadow: '0 24px 50px -30px rgba(14, 26, 51, 0.35)',
        border: gridLine,
        overflow: 'hidden'
      }}
    >
      {/* Fits on desktop; scrolls sideways on phones instead of squeezing the columns */}
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '820px' }}>
          <thead>
            <tr>
              {groups.map((g, i) =>
                g.columns ? (
                  <th key={g.label} colSpan={g.columns.length} style={headerCell(g.tone, i === 0)}>
                    {g.label}
                  </th>
                ) : (
                  <th key={g.label} rowSpan={2} style={headerCell('navy', i === 0)}>
                    {g.label}
                  </th>
                )
              )}
            </tr>
            <tr>
              {groups
                .filter((g) => g.columns)
                .flatMap((g) =>
                  g.columns.map((c, i) => (
                    <th
                      key={`${g.label}-${c.label}`}
                      style={{
                        padding: '10px 10px',
                        backgroundColor: tones[g.tone].tint,
                        color: tones[g.tone].ink,
                        font: '600 14px/1.35 var(--font-family-base)',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        // Thai has no spaces, so never let the browser break inside a word;
                        // long names carry an explicit \n instead
                        whiteSpace: 'pre',
                        borderLeft: i === 0 ? 'none' : gridLine
                      }}
                    >
                      {g.columnPrefix && (
                        <span style={{ display: 'block', font: '500 11px var(--font-family-base)', opacity: 0.75 }}>
                          {g.columnPrefix}
                        </span>
                      )}
                      {c.label}
                    </th>
                  ))
                )}
            </tr>
          </thead>
          <tbody>
            <tr>
              {cells.map((cell, i) => (
                <td
                  key={i}
                  style={{
                    padding: '18px 8px',
                    color: tones[cell.tone].ink,
                    font: '800 26px var(--font-family-base)',
                    textAlign: 'center',
                    borderTop: gridLine,
                    // A heavier rule marks where each group starts
                    borderLeft: i === 0 ? 'none' : cell.first ? '2px solid var(--color-border)' : gridLine
                  }}
                >
                  {cell.count}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function StatsTable() {
  return (
    <section style={{ position: 'relative', padding: '10px 24px 110px', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '22px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span
              aria-hidden="true"
              style={{
                display: 'grid',
                placeItems: 'center',
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'var(--gradient-primary)',
                color: '#ffffff',
                boxShadow: 'var(--shadow-primary)'
              }}
            >
              <span className="icon" aria-hidden="true" style={{ fontSize: '24px' }}>leaderboard</span>
            </span>
            <div>
              <h3 style={{ margin: 0, font: '700 22px var(--font-family-base)', color: 'var(--color-ink-900)' }}>
                สถิติการสมัครแยกตามประเภท
              </h3>
              <p style={{ margin: '2px 0 0', font: '400 15px var(--font-family-base)', color: 'var(--color-ink-400)' }}>
                จำนวนสถาบันที่ส่งเข้าแข่งขันในแต่ละประเภท
              </p>
            </div>
          </div>
          {statsTableIsSample && <SampleBadge />}
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {statsTableBands.map((groups) => (
            <StatsBand key={groups[0].label} groups={groups} />
          ))}
        </div>
      </div>
    </section>
  );
}
