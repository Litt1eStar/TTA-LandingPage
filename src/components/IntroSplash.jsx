import React, { useEffect, useState } from 'react';

export default function IntroSplash({ onComplete }) {
  const [stage, setStage] = useState('in'); // 'in', 'out', 'done'

  useEffect(() => {
    // Stage 1: Entrance animation runs for 1200ms
    const timer1 = setTimeout(() => {
      setStage('out');
    }, 1500);

    // Stage 2: Exit fade out completes at 2100ms
    const timer2 = setTimeout(() => {
      setStage('done');
      onComplete?.();
    }, 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <div
      onClick={() => {
        setStage('done');
        onComplete?.();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#ffffff',
        display: 'grid',
        placeItems: 'center',
        opacity: stage === 'out' ? 0 : 1,
        transition: 'opacity 0.6s ease-in-out',
        pointerEvents: stage === 'out' ? 'none' : 'auto',
        cursor: 'pointer'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          transform: stage === 'out' ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.6s ease-in-out'
        }}
      >
        <img
          src="/assets/logo.png"
          alt="Thailand Teaching Academy Award"
          style={{
            width: 'min(70vw, 580px)',
            height: 'auto',
            display: 'block',
            animation: 'ttaPop 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#5B6478',
            fontFamily: 'var(--font-family-base)'
          }}
        >
          <span>คลิกที่ใดก็ได้เพื่อข้าม</span>
        </div>
      </div>
    </div>
  );
}
