import React, { useState } from 'react';
import Navbar from './components/Navbar';
import IntroSplash from './components/IntroSplash';
import Hero from './components/Hero';
import BannerSlider from './components/BannerSlider';
import Stats from './components/Stats';
import StatsTable from './components/StatsTable';
import Topics from './components/Topics';
import TopicModal from './components/TopicModal';
import Schedule from './components/Schedule';
import Venues from './components/Venues';
import NewsDownloads from './components/NewsDownloads';
import Universities from './components/Universities';
import Toast from './components/Toast';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';

const PORTAL_URL = 'https://tta.portal.cmm.works/';
const SPLASH_SEEN_KEY = 'tta-splash-seen';

// The intro splash plays once per browser session, and never for viewers who prefer less motion.
// Storage can throw (private mode, blocked site data); then the splash simply plays.
function shouldShowSplash() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(SPLASH_SEEN_KEY) !== '1';
  } catch {
    return true;
  }
}

function markSplashSeen() {
  try {
    sessionStorage.setItem(SPLASH_SEEN_KEY, '1');
  } catch {
    // Not remembered; the splash will play again next time, which is harmless
  }
}

export default function App() {
  const [showSplash, setShowSplash] = useState(shouldShowSplash);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastTimer, setToastTimer] = useState(null);

  const showToast = (msg) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage('');
    }, 3000);
    setToastTimer(timer);
  };

  const handleOpenLogin = () => {
    window.open(PORTAL_URL, '_blank', 'noopener');
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseTopic = () => {
    setSelectedTopic(null);
  };

  const handleShowResults = () => {
    showToast('การแข่งขันเสร็จสิ้นจะประกาศผลและมอบรางวัลอย่างเป็นทางการในวันที่ 7 กุมภาพันธ์ 2027');
  };

  const handleOpenNews = (newsItem) => {
    if (newsItem.downloadUrl && newsItem.downloadUrl !== '#') {
      showToast(`กำลังดาวน์โหลด "${newsItem.title}"`);
      window.open(newsItem.downloadUrl, '_blank');
    } else {
      showToast(`กำลังเปิดเอกสารข่าวสาร "${newsItem.title}"`);
    }
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <a href="#main" className="skip-link">
        ข้ามไปยังเนื้อหาหลัก
      </a>

      {/* Intro Reveal Animation on First Load */}
      {showSplash && (
        <IntroSplash
          onComplete={() => {
            markSplashSeen();
            setShowSplash(false);
          }}
        />
      )}

      {/* Dual Mode Navbar */}
      <Navbar onOpenLogin={handleOpenLogin} />

      {/* Main Content Sections */}
      <main id="main" tabIndex={-1}>
        <Hero onOpenLogin={handleOpenLogin} onShowResults={handleShowResults} />
        <BannerSlider />
        <Stats />
        <StatsTable />
        <Topics onSelectTopic={handleSelectTopic} />
        <Schedule />
        <Venues />
        <NewsDownloads onOpenNews={handleOpenNews} />
        <Universities />
        <Sponsors />
      </main>

      {/* Footer */}
      <Footer />

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <TopicModal
          topic={selectedTopic}
          onClose={handleCloseTopic}
          onToast={showToast}
        />
      )}

      {/* Toast Feedback Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
