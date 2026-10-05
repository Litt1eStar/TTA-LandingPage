import React, { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'done'

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('done');
    }, 900);
  };

  const handleForgot = (e) => {
    e.preventDefault();
    onToast?.('ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    onClose();
    onToast?.('ระบบลงทะเบียนผู้เข้าแข่งขันจะเปิดอย่างเป็นทางการในวันที่ 30 ตุลาคม 2026');
  };

  const handleDoneConfirm = () => {
    setStatus('idle');
    setEmail('');
    setPassword('');
    onClose();
    onToast?.('เข้าสู่ระบบสำเร็จ ยินดีต้อนรับสู่ระบบ TTA');
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        backgroundColor: 'rgba(9, 18, 40, 0.6)',
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
        aria-label="เข้าสู่ระบบ"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          borderRadius: '28px',
          backgroundColor: '#ffffff',
          boxShadow: '0 40px 80px -30px rgba(0, 0, 0, 0.5)',
          padding: '36px 32px 30px',
          animation: 'ttaPop 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="ปิดหน้าต่างเข้าสู่ระบบ"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#F2F4F8',
            color: '#0E1A33',
            display: 'grid',
            placeItems: 'center',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5E9F2')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F2F4F8')}
        >
          <span className="icon" style={{ fontSize: '22px' }}>close</span>
        </button>

        {/* Logo */}
        <img
          src="/assets/logo.png"
          alt="TTA 2026"
          style={{ height: '52px', width: 'auto', display: 'block', marginBottom: '8px' }}
        />

        {/* State: Form & Loading */}
        {status !== 'done' ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <div>
              <div style={{ font: '700 26px var(--font-family-base)', color: '#0E1A33' }}>เข้าสู่ระบบ</div>
              <div style={{ font: '400 15px var(--font-family-base)', color: '#5B6478', marginTop: '4px' }}>
                สำหรับผู้เข้าแข่งขันและผู้ควบคุมทีม
              </div>
            </div>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', font: '500 14px var(--font-family-base)', color: '#3A4560' }}>
              อีเมล
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.ac.th"
                disabled={status === 'loading'}
                style={{
                  height: '50px',
                  borderRadius: '14px',
                  border: '1.5px solid #E1E6EF',
                  padding: '0 16px',
                  fontSize: '16px',
                  color: '#0E1A33',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#1F7BFF';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(31, 123, 255, 0.14)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E1E6EF';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', font: '500 14px var(--font-family-base)', color: '#3A4560' }}>
              รหัสผ่าน
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={status === 'loading'}
                style={{
                  height: '50px',
                  borderRadius: '14px',
                  border: '1.5px solid #E1E6EF',
                  padding: '0 16px',
                  fontSize: '16px',
                  color: '#0E1A33',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#1F7BFF';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(31, 123, 255, 0.14)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E1E6EF';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a href="#" onClick={handleForgot} style={{ font: '500 14px var(--font-family-base)' }}>
                ลืมรหัสผ่าน?
              </a>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                height: '52px',
                borderRadius: '14px',
                border: 'none',
                background: 'var(--gradient-primary)',
                color: '#ffffff',
                font: '600 16px var(--font-family-base)',
                cursor: status === 'loading' ? 'default' : 'pointer',
                boxShadow: 'var(--shadow-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: status === 'loading' ? 0.8 : 1,
                transition: 'opacity 0.2s ease'
              }}
            >
              {status === 'loading' ? (
                <>
                  <span className="icon" style={{ animation: 'spin 1s linear infinite' }}>progress_activity</span>
                  <span>กำลังตรวจสอบข้อมูล…</span>
                </>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>

            <div style={{ textAlign: 'center', font: '400 14px var(--font-family-base)', color: '#5B6478', marginTop: '4px' }}>
              ยังไม่มีบัญชี?{' '}
              <a href="#" onClick={handleRegister} style={{ fontWeight: 600, color: '#FF6A1A' }}>
                ลงทะเบียน
              </a>
            </div>
          </form>
        ) : (
          /* State: Done */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'center',
              padding: '28px 0 10px',
              animation: 'ttaFadeUp 0.3s ease'
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2FA6FF, #2A5BFF)',
                color: '#ffffff',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 14px 28px -12px rgba(31, 123, 255, 0.8)'
              }}
            >
              <span className="icon" style={{ fontSize: '40px' }}>check</span>
            </div>

            <div style={{ font: '700 24px var(--font-family-base)', color: '#0E1A33' }}>
              เข้าสู่ระบบสำเร็จ
            </div>
            <div style={{ font: '400 15px var(--font-family-base)', color: '#5B6478' }}>
              กำลังพาไปยังแดชบอร์ดจัดการทีม…
            </div>

            <button
              onClick={handleDoneConfirm}
              style={{
                marginTop: '10px',
                height: '48px',
                padding: '0 32px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: '#0E1A33',
                color: '#ffffff',
                font: '600 15px var(--font-family-base)',
                cursor: 'pointer'
              }}
            >
              ตกลง
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
