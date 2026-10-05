import React, { useState } from 'react';
import Navbar from './components/Navbar';
import IntroSplash from './components/IntroSplash';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Topics from './components/Topics';
import TopicModal from './components/TopicModal';
import Schedule from './components/Schedule';
import NewsDownloads from './components/NewsDownloads';
import LoginModal from './components/LoginModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
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
    setLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setLoginOpen(false);
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseTopic = () => {
    setSelectedTopic(null);
  };

  const handleApplyTopic = (topic) => {
    setSelectedTopic(null);
    setLoginOpen(true);
    showToast(`กรุณาเข้าสู่ระบบเพื่อดำเนินการสมัคร "${topic.name}"`);
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
      {/* Intro Reveal Animation on First Load */}
      {showSplash && <IntroSplash onComplete={() => setShowSplash(false)} />}

      {/* Dual Mode Navbar */}
      <Navbar onOpenLogin={handleOpenLogin} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenLogin={handleOpenLogin} onShowResults={handleShowResults} />
        <Stats />
        <Topics onSelectTopic={handleSelectTopic} />
        <Schedule />
        <NewsDownloads onOpenNews={handleOpenNews} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <TopicModal
          topic={selectedTopic}
          onClose={handleCloseTopic}
          onApply={handleApplyTopic}
          onToast={showToast}
        />
      )}

      {/* Login & Authentication Modal */}
      <LoginModal
        isOpen={loginOpen}
        onClose={handleCloseLogin}
        onToast={showToast}
      />

      {/* Toast Feedback Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
