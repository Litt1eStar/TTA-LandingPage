import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        background: 'linear-gradient(120deg, #0B1530 0%, #132A6B 60%, #1747D6 100%)',
        color: '#ffffff',
        overflow: 'hidden'
      }}
    >
      {/* Top Multi-color Accent Bar */}
      <div
        style={{
          position: 'absolute',
          inset: '0 0 auto 0',
          height: '4px',
          background: 'linear-gradient(90deg, #FFB21E, #FF6A1A, #2FA6FF, #2A5BFF)'
        }}
      />

      <div
        className="tta-container"
        style={{
          paddingTop: '46px',
          paddingBottom: '48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src="/assets/logo-white.png"
              alt="TTA KMUTT"
              style={{ height: '42px', width: 'auto', display: 'block', opacity: 0.95 }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '24px',
              font: '500 14px var(--font-family-base)',
              color: 'rgba(255, 255, 255, 0.75)'
            }}
          >
            <a href="#home" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              หน้าหลัก
            </a>
            <a href="#topics" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              หัวข้อการแข่งขัน
            </a>
            <a href="#schedule" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              กำหนดการ
            </a>
            <a href="#news" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              ข่าวสาร
            </a>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.12)', margin: '4px 0' }} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          <div
            style={{
              font: '600 14px var(--font-family-base)',
              letterSpacing: '0.04em',
              color: 'rgba(255, 255, 255, 0.95)'
            }}
          >
            © | THAILAND TEACHING ACADEMY AWARD 2026 (TTA ครั้งที่ 13)
          </div>
          <div
            style={{
              font: '400 14px var(--font-family-base)',
              color: 'rgba(255, 255, 255, 0.78)',
              lineHeight: 1.5
            }}
          >
            คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
            <br />
            126 ถนนประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140
          </div>
        </div>
      </div>
    </footer>
  );
}
