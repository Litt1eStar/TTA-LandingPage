import React from 'react';

// Marks content that still uses placeholder data, so nobody mistakes it for real results.
export default function SampleBadge({ children = 'ข้อมูลตัวอย่าง' }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: '999px',
        backgroundColor: '#FFF4E0',
        border: '1px solid #FFD39A',
        color: '#B45309',
        font: '600 13px var(--font-family-base)'
      }}
    >
      <span className="icon" aria-hidden="true" style={{ fontSize: '16px' }}>info</span>
      {children}
    </span>
  );
}
