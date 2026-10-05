import React, { useState } from 'react';
import { categoryProfiles } from '../data/topicsData';
import ImagePlaceholder from './ImagePlaceholder';

export default function TopicModal({ topic, onClose, onApply, onToast }) {
  const [activeTab, setActiveTab] = useState(0);

  // Close modal when pressing Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!topic) return null;

  const profile = categoryProfiles[topic.kind] || categoryProfiles.teach;

  const frameGradient =
    topic.tone === 'orange'
      ? 'linear-gradient(150deg, #FFC23A, #FF7A1A 55%, #FF4D1A)'
      : 'linear-gradient(150deg, #45BBFF, #1F7BFF 55%, #2A55F0)';

  const tabs = [
    { label: 'กติกาการแข่งขัน', icon: 'gavel' },
    { label: 'สถานที่แข่ง', icon: 'location_on' },
    { label: 'เกณฑ์การให้คะแนน', icon: 'star' },
    { label: 'กำหนดการแข่งขัน', icon: 'schedule' }
  ];

  const handleDownloadRules = () => {
    onToast?.(`กำลังดาวน์โหลดเอกสารกติกา ${topic.name}`);
  };

  const handleOpenMap = () => {
    onToast?.(`กำลังเปิดแผนที่สำหรับ ${topic.venue}`);
    window.open('https://maps.google.com/?q=King+Mongkut%27s+University+of+Technology+Thonburi', '_blank');
  };

  const handleOpenHotels = () => {
    onToast?.('ดูรายชื่อโรงแรมใกล้เคียงในส่วน "ข่าวสารประชาสัมพันธ์"');
    const el = document.getElementById('news');
    if (el) {
      onClose();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        backgroundColor: 'rgba(9, 18, 40, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'grid',
        placeItems: 'center',
        padding: '20px',
        animation: 'ttaFade 0.2s ease'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={topic.name}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '880px',
          maxHeight: 'calc(100vh - 40px)',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '30px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          boxShadow: '0 50px 100px -30px rgba(0, 0, 0, 0.55)',
          animation: 'ttaPop 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            position: 'relative',
            flex: 'none',
            padding: '32px 34px 0',
            background: frameGradient,
            color: '#ffffff',
            overflow: 'hidden'
          }}
        >
          {/* Decorative ambient bubble */}
          <div
            style={{
              position: 'absolute',
              right: '-80px',
              top: '-120px',
              width: '340px',
              height: '340px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="ปิด"
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              zIndex: 10,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              border: 'none',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.38)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)')}
          >
            <span className="icon" style={{ fontSize: '22px' }}>close</span>
          </button>

          {/* Header Metadata */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                style={{
                  font: '600 13px ui-monospace, Menlo, monospace',
                  letterSpacing: '0.1em',
                  opacity: 0.95
                }}
              >
                รายการแข่งขันที่ {topic.n}
              </div>
              <h2
                style={{
                  margin: 0,
                  font: '700 38px/1.15 var(--font-family-base)',
                  letterSpacing: '-0.01em'
                }}
              >
                {topic.name}
              </h2>
              <div style={{ font: '500 16px var(--font-family-base)', opacity: 0.92 }}>
                {topic.sub}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginRight: '40px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.22)',
                  font: '600 13px var(--font-family-base)'
                }}
              >
                <span className="icon" style={{ fontSize: '18px' }}>groups</span>
                {topic.type} · {topic.people}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.22)',
                  font: '600 13px var(--font-family-base)'
                }}
              >
                <span className="icon" style={{ fontSize: '18px' }}>event</span>
                {topic.date}
              </span>
            </div>
          </div>

          <p
            style={{
              position: 'relative',
              margin: '16px 0 22px',
              maxWidth: '640px',
              font: '400 15px/1.6 var(--font-family-base)',
              opacity: 0.96
            }}
          >
            {topic.desc}
          </p>

          {/* Navigation Tabs */}
          <div
            role="tablist"
            style={{
              position: 'relative',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}
          >
            {tabs.map((tab, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={tab.label}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    flex: 'none',
                    padding: '13px 18px 14px',
                    borderRadius: '16px 16px 0 0',
                    backgroundColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.18)',
                    color: isSelected ? '#0E1A33' : '#ffffff',
                    font: '600 15px var(--font-family-base)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span className="icon" style={{ fontSize: '20px' }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Body Contents */}
        <div
          style={{
            flex: 1,
            minHeight: '260px',
            overflowY: 'auto',
            padding: '28px 34px 30px'
          }}
        >
          {/* Tab 0: กติกาการแข่งขัน (Rules) */}
          {activeTab === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'ttaFadeUp 0.3s ease' }}>
              {profile.rules.map((ruleText, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    backgroundColor: '#F6F8FC'
                  }}
                >
                  <span
                    style={{
                      flex: 'none',
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      display: 'grid',
                      placeItems: 'center',
                      background: frameGradient,
                      color: '#ffffff',
                      font: '700 14px var(--font-family-base)'
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span
                    style={{
                      paddingTop: '4px',
                      font: '400 16px/1.55 var(--font-family-base)',
                      color: '#26304A'
                    }}
                  >
                    {ruleText}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 1: สถานที่แข่ง (Venue) */}
          {activeTab === 1 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                animation: 'ttaFadeUp 0.3s ease'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  minHeight: '240px',
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}
              >
                <ImagePlaceholder
                  icon="map"
                  text="แผนที่ / ภาพสถานที่แข่งขัน"
                  height="100%"
                  borderRadius="20px"
                  style={{ minHeight: '240px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span className="icon" style={{ fontSize: '28px', color: '#FF6A1A', marginTop: '2px' }}>
                    location_on
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ font: '700 20px/1.3 var(--font-family-base)', color: '#0E1A33' }}>
                      {topic.venue}
                    </div>
                    <div style={{ font: '400 15px/1.5 var(--font-family-base)', color: '#5B6478' }}>
                      {topic.building}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                  <div style={{ padding: '12px 14px', borderRadius: '14px', backgroundColor: '#F6F8FC' }}>
                    <div style={{ font: '400 12px var(--font-family-base)', color: '#5B6478' }}>วันที่แข่งขัน</div>
                    <div style={{ font: '600 15px var(--font-family-base)', marginTop: '2px' }}>{topic.date}</div>
                  </div>
                  <div style={{ padding: '12px 14px', borderRadius: '14px', backgroundColor: '#F6F8FC' }}>
                    <div style={{ font: '400 12px var(--font-family-base)', color: '#5B6478' }}>เวลาลงทะเบียน</div>
                    <div style={{ font: '600 15px var(--font-family-base)', marginTop: '2px' }}>{profile.checkin}</div>
                  </div>
                </div>

                <div style={{ font: '400 15px/1.6 var(--font-family-base)', color: '#3A4560' }}>
                  มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (บางมด) 126 ถนนประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 'auto' }}>
                  <button
                    onClick={handleOpenMap}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      height: '46px',
                      padding: '0 18px',
                      borderRadius: '14px',
                      backgroundColor: '#0E1A33',
                      color: '#ffffff',
                      font: '600 14px var(--font-family-base)',
                      cursor: 'pointer'
                    }}
                  >
                    <span className="icon" style={{ fontSize: '20px' }}>map</span>
                    <span>เปิดแผนที่ Google Maps</span>
                  </button>
                  <button
                    onClick={handleOpenHotels}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      height: '46px',
                      padding: '0 18px',
                      borderRadius: '14px',
                      border: '1.5px solid #E1E6EF',
                      backgroundColor: '#ffffff',
                      color: '#0E1A33',
                      font: '600 14px var(--font-family-base)',
                      cursor: 'pointer'
                    }}
                  >
                    <span className="icon" style={{ fontSize: '20px' }}>hotel</span>
                    <span>โรงแรมใกล้เคียง</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: เกณฑ์การให้คะแนน (Scoring) */}
          {activeTab === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', animation: 'ttaFadeUp 0.3s ease' }}>
              {profile.scoring.map((criterion, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    backgroundColor: '#F6F8FC'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
                    <span style={{ font: '500 16px/1.4 var(--font-family-base)', color: '#26304A' }}>
                      {criterion.label}
                    </span>
                    <span style={{ flex: 'none', font: '700 20px var(--font-family-base)', color: '#0E1A33' }}>
                      {criterion.pts}
                      <span style={{ font: '500 13px var(--font-family-base)', color: '#5B6478' }}> คะแนน</span>
                    </span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '8px', backgroundColor: '#E4E9F2', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: criterion.pct,
                        borderRadius: '8px',
                        background: frameGradient,
                        transition: 'width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
                      }}
                    />
                  </div>
                </div>
              ))}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  backgroundColor: '#0E1A33',
                  color: '#ffffff'
                }}
              >
                <span style={{ font: '600 16px var(--font-family-base)' }}>คะแนนรวม</span>
                <span style={{ font: '700 24px var(--font-family-base)' }}>
                  100 <span style={{ font: '500 13px var(--font-family-base)', opacity: 0.8 }}>คะแนน</span>
                </span>
              </div>
            </div>
          )}

          {/* Tab 3: กำหนดการแข่งขัน (Agenda) */}
          {activeTab === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', animation: 'ttaFadeUp 0.3s ease' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  font: '600 15px var(--font-family-base)',
                  color: '#0E1A33'
                }}
              >
                <span className="icon" style={{ fontSize: '20px', color: '#FF6A1A' }}>
                  calendar_month
                </span>
                <span>{topic.date}</span>
              </div>

              {profile.agenda.map((slot, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '72px 24px minmax(0, 1fr)',
                    gap: '14px',
                    alignItems: 'stretch'
                  }}
                >
                  <div
                    style={{
                      paddingTop: '12px',
                      font: '700 16px var(--font-family-base)',
                      color: '#0E1A33',
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {slot.time}
                  </div>
                  <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, width: '2px', backgroundColor: '#E4E9F2' }} />
                    <div
                      style={{
                        position: 'relative',
                        marginTop: '15px',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: frameGradient,
                        boxShadow: '0 0 0 4px #ffffff'
                      }}
                    />
                  </div>
                  <div
                    style={{
                      margin: '4px 0',
                      padding: '10px 16px',
                      borderRadius: '14px',
                      backgroundColor: '#F6F8FC',
                      font: '400 16px/1.5 var(--font-family-base)',
                      color: '#26304A'
                    }}
                  >
                    {slot.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Action Bar */}
        <div
          style={{
            flex: 'none',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            padding: '16px 34px 20px',
            borderTop: '1px solid #EDEFF4',
            backgroundColor: '#ffffff'
          }}
        >
          <button
            onClick={handleDownloadRules}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '50px',
              padding: '0 22px',
              borderRadius: '14px',
              border: '1.5px solid #E1E6EF',
              backgroundColor: '#ffffff',
              color: '#0E1A33',
              font: '600 15px var(--font-family-base)',
              cursor: 'pointer'
            }}
          >
            <span className="icon" style={{ fontSize: '20px' }}>download</span>
            <span>ดาวน์โหลดเอกสาร</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onApply?.(topic);
            }}
            style={{
              height: '50px',
              padding: '0 28px',
              borderRadius: '14px',
              border: 'none',
              background: 'var(--gradient-primary)',
              color: '#ffffff',
              font: '600 15px var(--font-family-base)',
              cursor: 'pointer',
              boxShadow: '0 10px 22px -10px rgba(255, 90, 26, 0.8)'
            }}
          >
            สมัครเข้าแข่งขัน
          </button>
        </div>
      </div>
    </div>
  );
}
