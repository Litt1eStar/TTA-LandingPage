import React from 'react';

export default function ImagePlaceholder({
  icon = 'image',
  text = 'ภาพประกอบ',
  aspectRatio = '245 / 165',
  height,
  borderRadius = '0px',
  style = {}
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: height || '100%',
        aspectRatio: height ? undefined : aspectRatio,
        borderRadius,
        background: 'repeating-linear-gradient(135deg, #F3F5F9 0 10px, #EAEEF5 10px 20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        color: '#8C97AB',
        overflow: 'hidden',
        border: '1px solid rgba(225, 230, 239, 0.7)',
        userSelect: 'none',
        ...style
      }}
    >
      <div
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 4px 12px rgba(14, 26, 51, 0.06)',
          display: 'grid',
          placeItems: 'center',
          color: '#5B6478'
        }}
      >
        <span className="icon" style={{ fontSize: '24px' }}>
          {icon}
        </span>
      </div>

      <span
        style={{
          font: '500 13px var(--font-family-base)',
          color: '#5B6478',
          letterSpacing: '0.01em',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '2px 10px',
          borderRadius: '999px'
        }}
      >
        {text}
      </span>
    </div>
  );
}
