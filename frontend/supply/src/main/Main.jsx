import React, { useEffect, useState, useRef } from 'react';

export default function Main({ token, onLogout }) {
  const [supplierName, setSupplierName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

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
        .then(user => setSupplierName(user.supplierName ));
    }
  }, [token]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout();
    window.location.href = '/';
  };

  return (
    <div>
      <nav style={{
        background: '#23272f',
        color: '#fff',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: 18,
        position: 'relative'
      }}>
        <span>NOT A EKKI</span>
        <div
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
            }}
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
                textAlign:'center',
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
      </nav>
      <div style={{ padding: 32 }}>
        <h2>Welcome, {supplierName}!</h2>
        {/* Main content goes here */}
      </div>
    </div>
  );
}
