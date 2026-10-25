import React from 'react';
import { statsTableGroups, statsTableIsSample } from '../data/statsTableData';
import SampleBadge from './SampleBadge';

const border = '2px solid #1D4E9E';
const headerCell = {
  border,
  padding: '12px 10px',
  backgroundColor: '#C9DBF3',
  color: '#0E1A33',
  font: '600 15px var(--font-family-base)',
  textAlign: 'center',
  whiteSpace: 'nowrap'
};
const subHeaderCell = { ...headerCell, backgroundColor: '#ffffff', font: '500 15px var(--font-family-base)' };
const valueCell = {
  border,
  padding: '14px 10px',
  backgroundColor: '#ffffff',
  color: '#0E1A33',
  font: '700 18px var(--font-family-base)',
  textAlign: 'center'
};

export default function StatsTable() {
  const groups = statsTableGroups.filter((g) => g.columns);
  const allCounts = statsTableGroups.flatMap((g) => (g.columns ? g.columns.map((c) => c.count) : [g.count]));

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
            marginBottom: '18px'
          }}
        >
          <h3 style={{ margin: 0, font: '700 22px var(--font-family-base)', color: '#0E1A33' }}>
            จำนวนสถาบันที่ส่งเข้าแข่งขันในแต่ละประเภท
          </h3>
          {statsTableIsSample && <SampleBadge />}
        </div>

        {/* Scrolls sideways on narrow screens instead of squeezing 17 columns */}
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '6px' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '900px' }}>
            <thead>
              <tr>
                {statsTableGroups.map((g) =>
                  g.columns ? (
                    <th key={g.label} colSpan={g.columns.length} style={headerCell}>
                      {g.label}
                    </th>
                  ) : (
                    <th key={g.label} rowSpan={2} style={headerCell}>
                      {g.label}
                    </th>
                  )
                )}
              </tr>
              <tr>
                {groups.flatMap((g) =>
                  g.columns.map((c) => (
                    <th key={`${g.label}-${c.label}`} style={subHeaderCell}>
                      {c.label}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                {allCounts.map((count, i) => (
                  <td key={i} style={valueCell}>
                    {count}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
