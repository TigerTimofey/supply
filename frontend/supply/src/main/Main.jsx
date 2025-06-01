import React, { useEffect, useState, useRef } from 'react';

const NAV_PAGES = [
  { label: 'Catalogue', key: 'catalogue' },
  { label: 'Marketing', key: 'marketing' },
  { label: 'Orders', key: 'orders' },
  { label: 'Customers', key: 'customers' },
  { label: 'Payments', key: 'payments' },
  { label: 'Chat', key: 'chat' }
];

export default function Main({ token, onLogout }) {
  const [supplierName, setSupplierName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [activePage, setActivePage] = useState('catalogue');
  const dropdownRef = useRef();
  const burgerRef = useRef();

  useEffect(() => {
    // Decode token to get userId
    const payload = token.split('.')[1];
    let userId = '';
    try {
      userId = JSON.parse(atob(payload)).userId;
    } catch {}
    // Fetch user info
    if (userId) {
      fetch(`http://localhost:8080/users/${userId}`)
        .then(res => res.json())
        .then(user => setSupplierName(user.supplierName));
    }
  }, [token]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (burgerRef.current && !burgerRef.current.contains(event.target)) {
        setBurgerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout();
    window.location.href = '/';
  };

  // Responsive: show burger menu on mobile
  return (
    <div>
      <nav
        style={{
          background: '#23272f',
          color: '#fff',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 600,
          fontSize: 18,
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <span
            style={{
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: '0.08em',
              color: '#61dafb',
              cursor: 'pointer'
            }}
            onClick={() => setActivePage('catalogue')}
          >
            NOT A EKKI
          </span>
          <div className="main-nav-menu" style={{
            display: 'flex',
            gap: 24
          }}>
            {NAV_PAGES.map(page => (
              <button
                key={page.key}
                onClick={() => setActivePage(page.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activePage === page.key ? '#61dafb' : '#fff',
                  fontWeight: activePage === page.key ? 700 : 500,
                  fontSize: 17,
                  cursor: 'pointer',
                  padding: '6px 10px',
                  borderBottom: activePage === page.key ? '2px solid #61dafb' : '2px solid transparent',
                  transition: 'color 0.15s, border-bottom 0.15s'
                }}
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>
        {/* Desktop dropdown */}
        <div
          className="main-nav-dropdown"
          style={{ position: 'relative', display: 'inline-block' }}
          ref={dropdownRef}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button
            style={{
              background: '#61dafb',
              color: '#23272f',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              display: 'none'
            }}
            className="main-nav-dropdown-btn"
          >
            {supplierName} ▾
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                background: '#fff',
                color: '#23272f',
                borderRadius: 12,
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                minWidth: 180,
                padding: '8px 0',
                transition: 'all 0.2s',
                overflow: 'hidden',
                textAlign: 'center',
                zIndex: 1000
              }}
            >
              <div
                style={{
                  padding: '12px 24px',
                  fontWeight: 600,
                  fontSize: 17,
                  borderBottom: '1px solid #eee',
                  background: '#f7fafd'
                }}
              >
                {supplierName}
              </div>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '14px 24px',
                  textAlign: 'center',
                  fontSize: 16,
                  color: '#23272f',
                  cursor: 'pointer',
                  borderRadius: 0,
                  fontWeight: 500,
                  transition: 'background 0.15s'
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#f0f4f8')}
                onMouseOut={e => (e.currentTarget.style.background = 'none')}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        {/* Burger menu for mobile */}
        <div className="main-nav-burger" ref={burgerRef} style={{ display: 'none', position: 'relative' }}>
          <button
            onClick={() => setBurgerOpen(b => !b)}
            style={{
              background: 'none',
              border: 'none',
              color: '#61dafb',
              fontSize: 28,
              cursor: 'pointer',
              padding: 6,
              marginLeft: 12
            }}
            aria-label="Menu"
          >
            ☰
          </button>
          {burgerOpen && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '80vw',
                maxWidth: 320,
                height: '100vh',
                background: '#23272f',
                color: '#fff',
                zIndex: 2000,
                boxShadow: '-2px 0 16px rgba(0,0,0,0.18)',
                display: 'flex',
                flexDirection: 'column',
                padding: '32px 16px 16px 16px',
                gap: 16
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 24
              }}>
                <span style={{ fontWeight: 900, fontSize: 22, color: '#61dafb' }}>
                  {supplierName}
                </span>
                <button
                  onClick={() => setBurgerOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#61dafb',
                    fontSize: 32,
                    cursor: 'pointer',
                    marginLeft: 12,
                    padding: 0,
                    lineHeight: 1
                  }}
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>
              {NAV_PAGES.map(page => (
                <button
                  key={page.key}
                  onClick={() => {
                    setActivePage(page.key);
                    setBurgerOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activePage === page.key ? '#61dafb' : '#fff',
                    fontWeight: activePage === page.key ? 700 : 500,
                    fontSize: 18,
                    cursor: 'pointer',
                    padding: '10px 0',
                    borderBottom: activePage === page.key ? '2px solid #61dafb' : '2px solid transparent',
                    textAlign: 'left'
                  }}
                >
                  {page.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                style={{
                  background: '#61dafb',
                  color: '#23272f',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 0',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  marginTop: 24
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <div style={{ padding: 32 }}>
        <h2>
          {NAV_PAGES.find(p => p.key === activePage)?.label || 'Welcome'}, {supplierName}!
        </h2>
        {/* Main content for the selected page can go here */}
      </div>
      <style>
        {`
        @media (max-width: 900px) {
          .main-nav-menu { display: none !important; }
          .main-nav-dropdown-btn { display: none !important; }
          .main-nav-burger { display: block !important; }
        }
        @media (min-width: 901px) {
          .main-nav-menu { display: flex !important; }
          .main-nav-dropdown-btn { display: inline-block !important; }
          .main-nav-burger { display: none !important; }
        }
        `}
      </style>
    </div>
  );
}
