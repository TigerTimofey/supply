import React, { useEffect, useState, useRef } from 'react';

const NAV_PAGES = [
  { label: 'Catalogue', key: 'catalogue' },
  { label: 'Marketing', key: 'marketing' },
  { label: 'Orders', key: 'orders' },
  { label: 'Customers', key: 'customers' },
  { label: 'Payments', key: 'payments' },
  { label: 'Chat', key: 'chat' }
];

const CSV_FIELDS = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'size', label: 'Size' },
  { key: 'order_unit', label: 'Order Unit' },
  { key: 'price', label: 'Price' },
  { key: 'price_per_measure', label: 'Price per Measure' },
  { key: 'price_measure_unit', label: 'Price Measure Unit' },
  { key: 'optional_hide_from_market', label: 'Hide from Market' }
];

function Catalogue() {
  const [rows, setRows] = useState([
    {
      code: '',
      name: '',
      description: '',
      size: '',
      order_unit: '',
      price: '',
      price_per_measure: '',
      price_measure_unit: '',
      optional_hide_from_market: ''
    }
  ]);
  const [search, setSearch] = useState('');
  const [codeSearch, setCodeSearch] = useState('');
  const [priceSort, setPriceSort] = useState(null);
  const [codeSort, setCodeSort] = useState(null); 
  const [infoOpen, setInfoOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');
  let infoTimeout = useRef();

  const csvExample = `code;name;description;size;order_unit;price;price_per_measure;price_measure_unit;optional_hide_from_market
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(csvExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  // CSV upload handler
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const text = await file.text();
    const lines = text.trim().split('\n');
    if (!lines.length) return;
    const headers = lines[0].split(';').map(h => h.trim());
    const newRows = lines.slice(1).map(line => {
      const cells = line.split(';').map(cell => cell.trim());
      const row = {};
      headers.forEach((h, i) => {
        row[h] = cells[i] || '';
      });
      return row;
    });
    setRows(newRows);
  };

  // Filtering logic
  let filteredRows = rows.filter(row =>
    row.name?.toLowerCase().includes(search.toLowerCase()) &&
    row.code?.toLowerCase().includes(codeSearch.toLowerCase())
  );

  // Sorting logic for price and code
  if (priceSort) {
    filteredRows = [...filteredRows].sort((a, b) => {
      const priceA = parseFloat((a.price || '').replace(',', '.')) || 0;
      const priceB = parseFloat((b.price || '').replace(',', '.')) || 0;
      return priceSort === 'asc' ? priceA - priceB : priceB - priceA;
    });
  } else if (codeSort) {
    filteredRows = [...filteredRows].sort((a, b) => {
      const codeA = (a.code || '').toLowerCase();
      const codeB = (b.code || '').toLowerCase();
      if (codeA < codeB) return codeSort === 'asc' ? -1 : 1;
      if (codeA > codeB) return codeSort === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: 32, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#213254', marginBottom: 0, marginRight: 12 }}>Catalogue</h2>
        <div
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => {
            clearTimeout(infoTimeout.current);
            setInfoOpen(true);
          }}
          onMouseLeave={() => {
            infoTimeout.current = setTimeout(() => setInfoOpen(false), 150);
          }}
          tabIndex={0}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="#61dafb" style={{ cursor: 'pointer', verticalAlign: 'middle' }}>
            <circle cx="10" cy="10" r="9" stroke="#61dafb" strokeWidth="2" fill="none"/>
            <text x="10" y="15" textAnchor="middle" fontSize="13" fill="#61dafb" fontWeight="bold">i</text>
          </svg>
          {infoOpen && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '120%',
                transform: 'translateX(-50%)',
                background: '#fff',
                color: '#23272f',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                padding: '14px 18px',
                fontSize: 14,
                minWidth: 340,
                maxWidth: 340,
                zIndex: 100,
                whiteSpace: 'pre-line',
                pointerEvents: 'auto'
              }}
              onMouseEnter={() => {
                clearTimeout(infoTimeout.current);
                setInfoOpen(true);
              }}
              onMouseLeave={() => {
                infoTimeout.current = setTimeout(() => setInfoOpen(false), 150);
              }}
            >
              <div style={{ marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <b>Example CSV:</b>
                <button
                  onClick={handleCopy}
                  style={{
                    marginLeft: 12,
                    background: '#61dafb',
                    color: '#213254',
                    border: 'none',
                    borderRadius: 5,
                    padding: '4px 12px',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre style={{
                background: '#f7fafd',
                borderRadius: 6,
                padding: 10,
                margin: 0,
                fontSize: 13,
                overflowX: 'auto'
              }}>
{csvExample}
              </pre>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <label
          htmlFor="csv-upload"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#f7fafd',
            color: '#213254',
            border: '1px solid #61dafb',
            borderRadius: 8,
            padding: '10px 22px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'background 0.15s, color 0.15s, border 0.15s'
          }}
        >
          <svg width="18" height="18" fill="#61dafb" style={{ marginRight: 8 }} viewBox="0 0 20 20">
            <path d="M16.5 10.5a.75.75 0 0 0-.75.75v3.25a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1v-3.25a.75.75 0 0 0-1.5 0v3.25A2.5 2.5 0 0 0 5.25 17h9.5A2.5 2.5 0 0 0 17.25 14.5v-3.25a.75.75 0 0 0-.75-.75z"/>
            <path d="M10.75 13.25V4.81l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 1 0 1.06 1.06l2.22-2.22v8.44a.75.75 0 0 0 1.5 0z"/>
          </svg>
          Choose CSV file
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
        <span style={{ fontSize: 14, color: '#666' }}>
          {fileName ? fileName : 'Only .csv files are supported'}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #ccc',
            fontSize: 15,
            minWidth: 180
          }}
        />
      </div>
      <div style={{ overflowX: 'auto', marginTop: 24 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', background: '#fff', color: '#23272f', fontSize: 15 }}>
          <thead>
            <tr>
              {CSV_FIELDS.map(field => (
                <th key={field.key} style={{ border: '1px solid #e0e0e0', padding: 10, background: '#f7fafd', fontWeight: 700, position: 'relative' }}>
                  {field.label}
                  {field.key === 'code' && (
                    <span style={{ marginLeft: 8, fontSize: 14, cursor: 'pointer', userSelect: 'none' }}>
                      <span
                        style={{
                          color: codeSort === 'asc' ? '#61dafb' : '#bbb',
                          marginRight: 2
                        }}
                        onClick={() => setCodeSort(codeSort === 'asc' ? null : 'asc')}
                        title="Sort by code: A-Z"
                      >▲</span>
                      <span
                        style={{
                          color: codeSort === 'desc' ? '#61dafb' : '#bbb'
                        }}
                        onClick={() => setCodeSort(codeSort === 'desc' ? null : 'desc')}
                        title="Sort by code: Z-A"
                      >▼</span>
                    </span>
                  )}
                  {field.key === 'price' && (
                    <span style={{ marginLeft: 8, fontSize: 14, cursor: 'pointer', userSelect: 'none' }}>
                      <span
                        style={{
                          color: priceSort === 'asc' ? '#61dafb' : '#bbb',
                          marginRight: 2
                        }}
                        onClick={() => setPriceSort(priceSort === 'asc' ? null : 'asc')}
                        title="Sort by price: low to high"
                      >▲</span>
                      <span
                        style={{
                          color: priceSort === 'desc' ? '#61dafb' : '#bbb'
                        }}
                        onClick={() => setPriceSort(priceSort === 'desc' ? null : 'desc')}
                        title="Sort by price: high to low"
                      >▼</span>
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={CSV_FIELDS.length} style={{ color: '#888', padding: 20, textAlign: 'center' }}>
                  <em>No data</em>
                </td>
              </tr>
            ) : (
              filteredRows.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafd' }}>
                  {CSV_FIELDS.map(field => (
                    <td key={field.key} style={{ border: '1px solid #e0e0e0', padding: 10 }}>
                      {row[field.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
        {activePage === 'catalogue' ? (
          <Catalogue />
        ) : (
          <h2>
            {NAV_PAGES.find(p => p.key === activePage)?.label || 'Welcome'}, {supplierName}!
          </h2>
        )}
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
