import React from 'react';
import { topicsData } from '../data/topicsData';

export default function Topics({ onSelectTopic }) {
  return (
    <section
      id="topics"
      style={{
        position: 'relative',
        padding: '110px 24px 120px',
        background: 'linear-gradient(180deg, #FFF7EE 0%, #FFFFFF 55%, #EEF5FF 100%)',
        overflow: 'hidden'
      }}
    >
      <div className="section-header">
        <h2 className="section-title">หัวข้อการแข่งขัน</h2>
        <div className="section-bar" />
        <p className="section-subtitle">คลิกที่การ์ดเพื่อดูรายละเอียด กติกา เกณฑ์ และกำหนดการแต่ละรายการ</p>
      </div>

      {/* Desktop Circuit Map Layout (screen width >= 992px) */}
      <div className="topics-desktop-circuit">
        <div
          style={{
            position: 'relative',
            maxWidth: '1100px',
            margin: '0 auto',
            aspectRatio: '1100 / 680'
          }}
        >
          {/* SVG Circuit Line */}
          <svg
            viewBox="0 0 1100 680"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible'
            }}
            aria-hidden="true"
          >
            <path
              d="M98 30 C 180 40, 240 105, 324 105 C 420 105, 480 40, 550 35 C 620 40, 690 100, 776 100 C 870 100, 930 30, 1002 20 C 1080 20, 1170 100, 1160 200 C 1150 300, 1060 330, 1002 360 C 930 360, 850 455, 776 455 C 700 455, 620 360, 550 360 C 470 360, 400 455, 324 455 C 250 455, 170 360, 98 360 C 20 360, -70 300, -60 200 C -50 100, 20 20, 98 30"
              fill="none"
              stroke="#FF8A1F"
              strokeWidth="2.5"
              strokeDasharray="6 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Plotted Category Cards */}
          {topicsData.map((topic) => {
            const isOrange = topic.tone === 'orange';
            const frameBg = isOrange
              ? 'linear-gradient(150deg, #FFC23A, #FF7A1A 55%, #FF4D1A)'
              : 'linear-gradient(150deg, #45BBFF, #1F7BFF 55%, #2A55F0)';
            const shadow = isOrange
              ? '0 22px 36px -22px rgba(255, 90, 26, 0.8)'
              : '0 22px 36px -22px rgba(31, 123, 255, 0.8)';
            const iconColor = isOrange ? '#E4561A' : '#1F6FE8';
            const pinShade = isOrange ? '#C9480F' : '#1A55C4';

            return (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectTopic(topic)}
                style={{
                  position: 'absolute',
                  left: topic.leftPct,
                  top: topic.topPct,
                  width: '17.82%',
                  height: '29.41%',
                  containerType: 'inline-size',
                  cursor: 'pointer',
                  transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
                className="circuit-card-node"
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '12cqw',
                    padding: '21cqw 5cqw 5cqw',
                    background: frameBg,
                    boxShadow: shadow
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      overflow: 'hidden',
                      borderRadius: '8.5cqw',
                      backgroundColor: '#ffffff',
                      padding: '5.5cqw 5.5cqw 5cqw',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1.5cqw',
                      boxShadow: 'inset 0 -3px 0 rgba(14, 26, 51, 0.05)'
                    }}
                  >
                    <div
                      style={{
                        font: '700 10cqw/1.15 var(--font-family-base)',
                        color: '#0E1A33',
                        textAlign: 'center',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {topic.name}
                    </div>
                    <span
                      className="icon"
                      style={{
                        fontSize: '25cqw',
                        color: iconColor
                      }}
                    >
                      {topic.icon}
                    </span>
                    <div
                      style={{
                        flex: 'none',
                        width: '100%',
                        height: '14cqw',
                        borderRadius: '999px',
                        display: 'grid',
                        placeItems: 'center',
                        background: frameBg,
                        color: '#ffffff',
                        font: '600 6.6cqw var(--font-family-base)',
                        transition: 'filter 0.2s ease'
                      }}
                    >
                      ดูเพิ่มเติม
                    </div>
                  </div>
                </div>

                {/* Metallic Pin on top */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '-12cqw',
                    width: '27cqw',
                    height: '27cqw',
                    marginLeft: '-13.5cqw',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 38% 32%, #FFFFFF, #E9EEF7 45%, #B9C4D8)',
                    boxShadow: `0 3cqw 0 ${pinShade}, 0 12px 18px -6px rgba(14, 26, 51, 0.45)`
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet Grid View (screen width < 992px) */}
      <div className="topics-mobile-grid">
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '32px 20px',
            paddingTop: '20px'
          }}
        >
          {topicsData.map((topic) => {
            const isOrange = topic.tone === 'orange';
            const frameBg = isOrange
              ? 'linear-gradient(150deg, #FFC23A, #FF7A1A 55%, #FF4D1A)'
              : 'linear-gradient(150deg, #45BBFF, #1F7BFF 55%, #2A55F0)';
            const shadow = isOrange
              ? '0 16px 28px -14px rgba(255, 90, 26, 0.6)'
              : '0 16px 28px -14px rgba(31, 123, 255, 0.6)';
            const iconColor = isOrange ? '#E4561A' : '#1F6FE8';
            const pinShade = isOrange ? '#C9480F' : '#1A55C4';

            return (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic)}
                role="button"
                tabIndex={0}
                style={{
                  position: 'relative',
                  paddingTop: '16px',
                  cursor: 'pointer'
                }}
              >
                {/* Pin on top */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '2px',
                    width: '32px',
                    height: '32px',
                    marginLeft: '-16px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 38% 32%, #FFFFFF, #E9EEF7 45%, #B9C4D8)',
                    boxShadow: `0 3px 0 ${pinShade}, 0 8px 14px -4px rgba(14, 26, 51, 0.45)`,
                    zIndex: 2
                  }}
                />

                <div
                  style={{
                    borderRadius: '20px',
                    padding: '24px 8px 8px',
                    background: frameBg,
                    boxShadow: shadow,
                    transition: 'transform 0.25s ease'
                  }}
                  className="mobile-topic-inner"
                >
                  <div
                    style={{
                      borderRadius: '14px',
                      backgroundColor: '#ffffff',
                      padding: '16px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ font: '700 17px var(--font-family-base)', color: '#0E1A33' }}>
                      {topic.name}
                    </div>
                    <span className="icon" style={{ fontSize: '40px', color: iconColor }}>
                      {topic.icon}
                    </span>
                    <div
                      style={{
                        width: '100%',
                        padding: '6px 0',
                        borderRadius: '999px',
                        background: frameBg,
                        color: '#ffffff',
                        font: '600 13px var(--font-family-base)'
                      }}
                    >
                      ดูเพิ่มเติม
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .circuit-card-node:hover {
          transform: translateY(-8px) rotate(-1deg);
        }

        .mobile-topic-inner:hover {
          transform: translateY(-6px);
        }

        @media (min-width: 992px) {
          .topics-desktop-circuit {
            display: block;
          }
          .topics-mobile-grid {
            display: none;
          }
        }

        @media (max-width: 991px) {
          .topics-desktop-circuit {
            display: none;
          }
          .topics-mobile-grid {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
