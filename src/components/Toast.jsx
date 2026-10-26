import React from 'react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: '28px',
        zIndex: 200,
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 22px',
        borderRadius: '16px',
        backgroundColor: '#0E1A33',
        color: '#ffffff',
        font: '500 15px var(--font-family-base)',
        boxShadow: '0 20px 40px -18px rgba(0, 0, 0, 0.6)',
        animation: 'ttaFadeUp 0.25s ease',
        maxWidth: 'calc(100% - 40px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <span
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#FF6A1A',
          flex: 'none',
          boxShadow: '0 0 10px #FF6A1A'
        }}
      />
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            marginLeft: '8px'
          }}
          aria-label="ปิดแจ้งเตือน"
        >
          <span className="icon" style={{ fontSize: '18px' }}>close</span>
        </button>
      )}
    </div>
  );
}
