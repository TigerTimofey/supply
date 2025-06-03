import React, { useEffect, useState, useRef } from 'react';
import { NAV_PAGES } from './constants/navPages';
import { CSV_FIELDS } from './constants/csvFields';
import { csvExample } from './constants/csvExample';
import CatalogueStats from './components/catalogues-logic/CatalogueStats';
import CatalogueHistoryModal from './components/catalogues-logic/CatalogueHistoryModal';
import SupplierDataModal from './components/supplier-modal/SupplierDataModal';
import Orders from './pages/orders/Orders';
import CustomersPage from './pages/customers/Customers';
import PaymentsPage from './pages/paymants/Payments';
import ChatPage from './pages/chat/Chat';
import MarketingPage from './pages/marketing/Marketing';
import SupplierPage from './pages/supplier/SupplierPage';

import {
  catalogueContainerStyle,
  infoIconContainerStyle,
  infoPopupStyle,
  infoCopyBtnStyle,
  infoPreStyle,
  uploadLabelStyle,
  fileNameSpanStyle,
  removeFileBtnStyle,
  dividerLineStyle,
  searchInputStyle,
  tableContainerStyle,
  tableStyle,
  thStyle,
  tdStyle,
  noDataTdStyle,
  sortIconStyle,
  navStyle,
  navBrandStyle,
  navMenuStyle,
  navBtnStyle,
  navDropdownBtnStyle,
  navDropdownMenuStyle,
  navDropdownHeaderStyle,
  navBurgerStyle,
  navBurgerBtnStyle,
  navBurgerCloseBtnStyle,
  navBurgerPageBtnStyle,
  navBurgerProfileBtnStyle,
  navBurgerLogoutBtnStyle,
  navDropdownProfileBtnStyle,
  navDropdownLogoutBtnStyle,
  navBurgerMenuStyle,
  navBurgerHeaderStyle,
  navBurgerBrandStyle,

} from './styles/sharedStyles';


import { saveCatalogue } from './utils/saveCatalogue';
import { handleCopy } from './utils/handleCopy';
import { handleFileChange } from './utils/handleFileChange';
import { removeCatalogue } from './utils/removeCatalogue';
import { revertCatalogue } from './utils/revertCatalogue';
import { clearHistory } from './utils/clearHistory';

function jwt_decode(token) {
  if (!token) return {};
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return {};
  }
}

function Catalogue({ token, setRows, rows }) {
  const [search, setSearch] = useState('');
  const [codeSearch] = useState('');
  const [priceSort, setPriceSort] = useState(null);
  const [codeSort, setCodeSort] = useState(null); 
  const [infoOpen, setInfoOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasHistory, setHasHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const infoTimeout = useRef();

  // Get userId from token
  let userId = '';
  try {
    userId = jwt_decode(token).userId;
  } catch {}

  // Load catalogue from backend on mount
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`https://supply-sooty.vercel.app/users/${userId}`)
      .then(res => res.json())
      .then(user => {
        if (user.catalogueCsv) {
          const text = user.catalogueCsv;
          setFileName(user.catalogueCsvName || 'catalogue.csv');
          const lines = text.trim().split('\n');
          if (lines.length) {
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
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // eslint-disable-next-line
  }, [userId]);

  // Check if user has history
  useEffect(() => {
    if (!userId) return;
    fetch(`https://supply-sooty.vercel.app/users/${userId}/catalogue/history`)
      .then(res => res.json())
      .then(data => setHasHistory(Array.isArray(data) && data.length > 0));
  }, [userId, fileName]);

  // Fetch history for stats card
  useEffect(() => {
    if (!userId) return;
    fetch(`https://supply-sooty.vercel.app/users/${userId}/catalogue/history`)
      .then(res => res.json())
      .then(data => setHistory(Array.isArray(data) ? data : []));
  }, [userId, fileName]);

  // Utility wrappers to inject state/setters as needed
  const handleCopyWrapper = () => handleCopy(csvExample, setCopied);

  const handleFileChangeWrapper = (e) =>
    handleFileChange(e, setFileName, setRows, saveCatalogue, userId);

  const removeCatalogueWrapper = () =>
    removeCatalogue(userId, setFileName, setRows);

  const revertCatalogueWrapper = async (historyEntry) =>
    revertCatalogue(historyEntry, userId, setFileName, setRows, setHistory, setHistoryModalOpen);

  const clearHistoryWrapper = () =>
    clearHistory(userId, setHistory, setHistoryModalOpen);

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
    <div style={catalogueContainerStyle}>
      {/* Info icon, file upload, and file name */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ color: '#213254', marginBottom: 0, marginRight: 12 }}>Catalogue</h2>
          <div
            style={infoIconContainerStyle}
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
                style={infoPopupStyle}
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
                    onClick={handleCopyWrapper}
                    style={infoCopyBtnStyle}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre style={infoPreStyle}>
{csvExample}
                </pre>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <label
            htmlFor="csv-upload"
            style={uploadLabelStyle}
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
              onChange={handleFileChangeWrapper}
              style={{ display: 'none' }}
            />
          </label>
          <span style={fileNameSpanStyle}>
            {fileName ? (
              <>
                {fileName}
                <button
                  onClick={removeCatalogueWrapper}
                  style={removeFileBtnStyle}
                  title="Remove file"
                >
                  ×
                </button>
              </>
            ) : (
              'Only .csv files are supported'
            )}
          </span>
        </div>
      </div>

      <CatalogueStats
        rows={rows}
        history={history}
        onShowHistory={() => setHistoryModalOpen(true)}
      />

      <div style={dividerLineStyle} />

      <div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={searchInputStyle}
          />
        </div>
      </div>

      <div>
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {CSV_FIELDS.map(field => (
                  <th key={field.key} style={thStyle}>
                    {field.label}
                    {field.key === 'code' && (
                      <span style={{ marginLeft: 8, fontSize: 14, cursor: 'pointer', userSelect: 'none' }}>
                        <span
                          style={sortIconStyle(codeSort === 'asc')}
                          onClick={() => setCodeSort(codeSort === 'asc' ? null : 'asc')}
                          title="Sort by code: A-Z"
                        >▲</span>
                        <span
                          style={sortIconStyle(codeSort === 'desc')}
                          onClick={() => setCodeSort(codeSort === 'desc' ? null : 'desc')}
                          title="Sort by code: Z-A"
                        >▼</span>
                      </span>
                    )}
                    {field.key === 'price' && (
                      <span style={{ marginLeft: 8, fontSize: 14, cursor: 'pointer', userSelect: 'none' }}>
                        <span
                          style={sortIconStyle(priceSort === 'asc')}
                          onClick={() => setPriceSort(priceSort === 'asc' ? null : 'asc')}
                          title="Sort by price: low to high"
                        >▲</span>
                        <span
                          style={sortIconStyle(priceSort === 'desc')}
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
                  <td colSpan={CSV_FIELDS.length} style={noDataTdStyle}>
                    <em>No data</em>
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafd' }}>
                    {CSV_FIELDS.map(field => (
                      <td key={field.key} style={tdStyle}>
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
      <CatalogueHistoryModal
        open={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        history={history}
        onRevert={revertCatalogueWrapper}
        onClearHistory={clearHistoryWrapper}
      />
    </div>
  );
}

export default function Main({ token, onLogout }) {
  const [supplierName, setSupplierName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [activePage, setActivePage] = useState('catalogue');
  const [userId, setUserId] = useState('');
  const [supplierModalOpen, setSupplierModalOpen] = useState(false);
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
  const [showSupplierPage, setShowSupplierPage] = useState(true);
  const dropdownRef = useRef();
  const burgerRef = useRef();

  useEffect(() => {

    const payload = token.split('.')[1];
    let userIdDecoded = '';
    try {
      userIdDecoded = JSON.parse(atob(payload)).userId;
    } catch {}
    setUserId(userIdDecoded);

    if (userIdDecoded) {
      fetch(`https://supply-sooty.vercel.app/users/${userIdDecoded}`)
        .then(res => {
          if (!res.ok) return null;
          return res.json();
        })
        .then(user => {
          if (user && user.supplierName) setSupplierName(user.supplierName);
          else setSupplierName('');
        })
        .catch(() => setSupplierName(''));
    } else {
      setSupplierName('');
    }
  }, [token]);


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


  const handleSupplierNav = (target) => {
    setShowSupplierPage(false);
    setActivePage(target);
  };


  return (
    <div>
      <nav
        style={navStyle}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <span
            style={navBrandStyle}
            onClick={() => setShowSupplierPage(true)}
          >
            NOT A REKKI
          </span>
          <div className="main-nav-menu" style={navMenuStyle}>
            {NAV_PAGES.map(page => (
              <button
                key={page.key}
                onClick={() => {
        
                  setActivePage(page.key);
                  setShowSupplierPage(false);
                }}
                style={navBtnStyle(
                  !showSupplierPage && activePage === page.key
                )}
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="main-nav-dropdown"
          style={{ position: 'relative', display: 'inline-block' }}
          ref={dropdownRef}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button
            style={navDropdownBtnStyle}
            className="main-nav-dropdown-btn"
          >
            {supplierName} ▾
          </button>
          {dropdownOpen && (
            <div style={navDropdownMenuStyle}>
              <div style={navDropdownHeaderStyle}>
                {supplierName}
              </div>
              <button
                onClick={() => setSupplierModalOpen(true)}
                style={navDropdownProfileBtnStyle}
                onMouseOver={e => (e.currentTarget.style.background = '#f0f4f8')}
                onMouseOut={e => (e.currentTarget.style.background = 'none')}
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                style={navDropdownLogoutBtnStyle}
                onMouseOver={e => (e.currentTarget.style.background = '#f0f4f8')}
                onMouseOut={e => (e.currentTarget.style.background = 'none')}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="main-nav-burger" ref={burgerRef} style={navBurgerStyle}>
          <button
            onClick={() => setBurgerOpen(b => !b)}
            style={navBurgerBtnStyle}
            aria-label="Menu"
          >
            ☰
          </button>
          {burgerOpen && (
            <div style={navBurgerMenuStyle}>
              <div style={navBurgerHeaderStyle}>
                <span style={navBurgerBrandStyle}>
                  {supplierName}
                </span>
                <button
                  onClick={() => setBurgerOpen(false)}
                  style={navBurgerCloseBtnStyle}
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
                    setShowSupplierPage(false); 
                    setBurgerOpen(false);
                  }}
                  style={navBurgerPageBtnStyle(activePage === page.key)}
                >
                  {page.label}
                </button>
              ))}
              <button
                onClick={() => setSupplierModalOpen(true)}
                style={navBurgerProfileBtnStyle}
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                style={navBurgerLogoutBtnStyle}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <SupplierDataModal open={supplierModalOpen} onClose={() => setSupplierModalOpen(false)} userId={userId} />
      <div style={{ padding: 32 }}>
        {showSupplierPage ? (
          <SupplierPage onNav={handleSupplierNav} />
        ) : activePage === 'catalogue' ? (
          <Catalogue token={token} setRows={setRows} rows={rows} />
        ) : activePage === 'orders' ? (
          <Orders catalogueRows={rows} />
        ) : activePage === 'customers' ? (
          <CustomersPage />
        ) : activePage === 'payments' ? (
          <PaymentsPage />
        ) : activePage === 'chat' ? (
          <ChatPage />
        ) : activePage === 'marketing' ? (
          <MarketingPage />
        ) : activePage === 'supplier-data' ? (

          <></>
        ) : (
          <h2>
            {NAV_PAGES.find(p => p.key === activePage)?.label || 'Welcome'}, {supplierName}!
          </h2>
        )}
      </div>
    </div>
  );
}
