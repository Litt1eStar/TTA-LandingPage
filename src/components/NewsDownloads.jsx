import React from 'react';
import { newsData } from '../data/newsData';
import ImagePlaceholder from './ImagePlaceholder';

export default function NewsDownloads({ onOpenNews }) {
  return (
    <section
      id="news"
      style={{
        position: 'relative',
        padding: '110px 24px 130px',
        backgroundColor: '#ffffff'
      }}
    >
      <div className="section-header">
        <h2 className="section-title">ข่าวสารประชาสัมพันธ์</h2>
        <div className="section-bar" />
        <p className="section-subtitle">เอกสารการแข่งขัน แบบฟอร์ม สูจิบัตร และข้อมูลการเดินทาง</p>
      </div>

      <div
        style={{
          maxWidth: '920px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '28px'
        }}
      >
        {newsData.map((item) => (
          <article
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              border: '1px solid #EDEFF4',
              boxShadow: '0 18px 36px -26px rgba(14, 26, 51, 0.45)',
              transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            className="news-card"
            onClick={() => onOpenNews?.(item)}
          >
            {/* Card Thumbnail Placeholder */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '245 / 165',
                overflow: 'hidden'
              }}
            >
              <ImagePlaceholder
                icon="photo_size_select_actual"
                text="ภาพประกอบข่าว"
                aspectRatio="245 / 165"
              />
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  backgroundColor: item.color,
                  color: '#ffffff',
                  font: '600 12px var(--font-family-base)',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  pointerEvents: 'none'
                }}
              >
                {item.tag}
              </span>
            </div>

            {/* Card Details */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '20px 20px 18px'
              }}
            >
              <h3
                style={{
                  margin: 0,
                  font: '600 18px/1.35 var(--font-family-base)',
                  color: '#0E1A33'
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  font: '400 14px/1.5 var(--font-family-base)',
                  color: '#5B6478'
                }}
              >
                {item.desc}
              </p>

              <div style={{ flex: 1 }} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenNews?.(item);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 14px 8px 16px',
                    borderRadius: '999px',
                    backgroundColor: '#FFF1E6',
                    color: '#E4561A',
                    font: '600 13px var(--font-family-base)',
                    transition: 'all 0.2s ease'
                  }}
                  className="news-open-btn"
                >
                  <span>คลิกเปิด</span>
                  <span className="icon" style={{ fontSize: '18px' }}>arrow_outward</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .news-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 44px -24px rgba(31, 90, 200, 0.45);
        }

        .news-card:hover .news-open-btn {
          background-color: #FF6A1A;
          color: #ffffff;
        }
      `}</style>
    </section>
  );
}
