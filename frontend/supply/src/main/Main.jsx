import React, { useEffect, useState, useRef } from 'react';
import jwt_decode from "jwt-decode";
import { NAV_PAGES } from './constants/navPages';
import { CSV_FIELDS } from './constants/csvFields';
import { csvExample } from './constants/csvExample';
import { CATEGORY_OPTIONS } from './constants/categoryOptions';
import CatalogueStats from './components/CatalogueStats';
import CatalogueHistoryModal from './components/CatalogueHistoryModal';
// Import shared styles
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
  closeBtnStyle,
  loadingContainerStyle,
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
  navBurgerLogoutBtnStyle
} from './sharedStyles';

// Import utils
import { saveCatalogue } from './utils/saveCatalogue';
import { handleCopy } from './utils/handleCopy';
import { handleFileChange } from './utils/handleFileChange';
import { removeCatalogue } from './utils/removeCatalogue';
import { revertCatalogue } from './utils/revertCatalogue';
import { clearHistory } from './utils/clearHistory';

function Catalogue({ token }) {
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
    fetch(`http://localhost:8080/users/${userId}`)
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
    fetch(`http://localhost:8080/users/${userId}/catalogue/history`)
      .then(res => res.json())
      .then(data => setHasHistory(Array.isArray(data) && data.length > 0));
  }, [userId, fileName]);

  // Fetch history for stats card
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8080/users/${userId}/catalogue/history`)
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
      {/* Sticker cards between file upload and catalogue data */}
      <CatalogueStats
        rows={rows}
        history={history}
        onShowHistory={() => setHistoryModalOpen(true)}
      />
      {/* Divider line */}
      <div style={dividerLineStyle} />
      {/* Search input in its own div */}
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
      {/* Table in its own div */}
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

function SupplierDataModal({ open, onClose, userId }) {
  // Move hooks to top-level, never inside conditions
  const [data, setData] = useState(null);
  const [editField, setEditField] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 600);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (open && userId) {
      fetch(`http://localhost:8080/users/${userId}`)
        .then(res => res.json())
        .then(d => {
          setData(d);
          setForm({
            supplierName: d.supplierName || '',
            email: d.email || '',
            accountEmail: d.accountEmail || '',
            salesEmail: d.salesEmail || '',
            origin: d.origin || '',
            productCategories: Array.isArray(d.productCategories) ? d.productCategories : []
          });
        });
    }
  }, [open, userId]);

  const getMapSrc = (origin) => {
    if (!origin) return '';
    return `https://www.google.com/maps?q=${encodeURIComponent(origin)}&output=embed`;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleCategoryToggle = cat => {
    setForm(f => {
      const arr = f.productCategories.includes(cat)
        ? f.productCategories.filter(c => c !== cat)
        : [...f.productCategories, cat];
      return { ...f, productCategories: arr };
    });
  };

  const handleSave = async (field) => {
    setSaving(true);
    setMessage('');
    try {
      const patch = field === 'productCategories'
        ? { productCategories: form.productCategories }
        : { [field]: form[field] };
      const res = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(patch)
      });
      if (res.ok) {
        const updated = await res.json();
        setData(updated);
        setEditField(null);
        setMessage('Profile updated!');
        setTimeout(() => setMessage(''), 1000);
      } else {
        const err = await res.json();
        setMessage(err.error || 'Update failed');
        setTimeout(() => setMessage(''), 1000);
      }
    } catch {
      setMessage('Network error');
      setTimeout(() => setMessage(''), 1000);
    }
    setSaving(false);
  };

  if (!open) return null;


  const inputStyle = {
    fontWeight: 500,
    border: '1.5px solid #61dafb',
    borderRadius: 8,
    padding: '10px 16px',
    fontSize: 17,
    background: '#f7fafd',
    outline: 'none',
    transition: 'border 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(97,218,251,0.10)',
    width: isMobile ? '90vw' : '100%',
    minWidth: 0,
    maxWidth: isMobile ? '98vw' : undefined,
    boxSizing: 'border-box',
    display: 'block',
    margin: isMobile ? '0 auto' : undefined
  };

  const fieldRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
    minHeight: 54,
    background: 'rgba(97,218,251,0.07)',
    borderRadius: 12,
    padding: '10px 18px'
  };

  const labelStyle = {
    fontWeight: 700,
    color: '#3e68bd',
    minWidth: 170,
    flexShrink: 0,
    fontSize: 16
  };

  const buttonGroupStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginRight: 8
  };

  // Responsive modal style
  const modalStyle = {
    background: 'linear-gradient(120deg, #f7fafd 60%, #e3f0fa 100%)',
    borderRadius: 22,
    boxShadow: '0 12px 48px rgba(33,50,84,0.22)',
    padding: '48px 36px 36px 36px',
    maxWidth: 720,
    width: '90vw',
    minHeight: 700,
    minWidth: 0,
    margin: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    transition: 'width 0.2s, min-height 0.2s',
    boxSizing: 'border-box'
  };

  // For mobile: adjust modal style
  const responsiveModalStyle = isMobile
    ? {
        ...modalStyle,
        padding: '24px 4px 24px 4px',
        maxWidth: '100vw',
        width: '100vw',
        minHeight: 0,
        margin: 0,
        borderRadius: 0,
        top: 0,
        left: 0,
        position: 'fixed'
      }
    : modalStyle;

  // For mobile: field row style
  const mobileFieldRowStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    marginBottom: 18,
    minHeight: 54,
    background: 'rgba(97,218,251,0.07)',
    borderRadius: 12,
    padding: '10px 10px',
  };

  // For mobile: label and edit button row (centered)
  const mobileLabelEditRow = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    marginBottom: 4,
    textAlign: 'center'
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(33,50,84,0.22)',
      zIndex: 4000,
      display: 'flex',
      justifyContent: 'center',
      backdropFilter: 'blur(2px)',
      overflowY: isMobile ? 'auto' : 'unset'
    }}>
      <div style={responsiveModalStyle}>
        <button
          onClick={onClose}
          style={closeBtnStyle}
          aria-label="Close"
        >×</button>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          marginBottom: 24,
          gap: 18
        }}>
          <h1 style={{
            color: '#213254',
            fontWeight: 900,
            fontSize: 34,
            letterSpacing: 1,
            margin: 0
          }}>
            Profile
          </h1>
        </div>
        {!data ? (
          <div style={loadingContainerStyle}>
            <span style={{ fontSize: 22, color: '#888' }}>Loading...</span>
          </div>
        ) : (
          <form
            style={{
              width: '100%',
              marginBottom: 28,
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              minHeight: 420
            }}
          >
            {/* Supplier Name */}
            <div style={isMobile ? mobileFieldRowStyle : fieldRowStyle}>
              {isMobile ? (
                <>
                  <div style={mobileLabelEditRow}>
                    <span style={labelStyle}>Supplier Name:</span>
                    {editField !== 'supplierName' && (
                      <button
                        type="button"
                        onClick={() => setEditField('supplierName')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                  </div>
                  <div style={{ width: '100%' }}>
                    {editField === 'supplierName' ? (
                      <>
                        <input
                          name="supplierName"
                          value={form.supplierName}
                          onChange={handleChange}
                          style={inputStyle}
                          required
                          autoFocus
                        />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleSave('supplierName')}
                            disabled={saving}
                            style={{
                              background: '#61dafb',
                              color: '#213254',
                              border: 'none',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 700,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, supplierName: data.supplierName })); }}
                            style={{
                              background: '#f0f4f8',
                              color: '#213254',
                              border: '1px solid #d1d5db',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 500,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span style={{ fontWeight: 500, display: 'block', textAlign: 'center' }}>{data.supplierName}</span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={buttonGroupStyle}>
                    {editField !== 'supplierName' && (
                      <button
                        type="button"
                        onClick={() => setEditField('supplierName')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                    {editField === 'supplierName' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSave('supplierName')}
                          disabled={saving}
                          style={{
                            background: '#61dafb',
                            color: '#213254',
                            border: 'none',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 700,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Save</button>
                        <button
                          type="button"
                          onClick={() => { setEditField(null); setForm(f => ({ ...f, supplierName: data.supplierName })); }}
                          style={{
                            background: '#f0f4f8',
                            color: '#213254',
                            border: '1px solid #d1d5db',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 500,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Cancel</button>
                      </>
                    )}
                  </div>
                  <span style={labelStyle}>Supplier Name:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'supplierName' ? (
                      <input
                        name="supplierName"
                        value={form.supplierName}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                        autoFocus
                      />
                    ) : (
                      <span style={{ fontWeight: 500, display: 'inline' }}>{data.supplierName}</span>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* Email */}
            <div style={isMobile ? mobileFieldRowStyle : fieldRowStyle}>
              {isMobile ? (
                <>
                  <div style={mobileLabelEditRow}>
                    <span style={labelStyle}>Email:</span>
                    {editField !== 'email' && (
                      <button
                        type="button"
                        onClick={() => setEditField('email')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                  </div>
                  <div style={{ width: '100%' }}>
                    {editField === 'email' ? (
                      <>
                        <input 
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          style={inputStyle}
                          required
                        />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleSave('email')}
                            disabled={saving}
                            style={{
                              background: '#61dafb',
                              color: '#213254',
                              border: 'none',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 700,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, email: data.email })); }}
                            style={{
                              background: '#f0f4f8',
                              color: '#213254',
                              border: '1px solid #d1d5db',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 500,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span style={{ fontWeight: 500, display: 'block', textAlign: 'center' }}>{data.email}</span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={buttonGroupStyle}>
                    {editField !== 'email' && (
                      <button
                        type="button"
                        onClick={() => setEditField('email')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                    {editField === 'email' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSave('email')}
                          disabled={saving}
                          style={{
                            background: '#61dafb',
                            color: '#213254',
                            border: 'none',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 700,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Save</button>
                        <button
                          type="button"
                          onClick={() => { setEditField(null); setForm(f => ({ ...f, email: data.email })); }}
                          style={{
                            background: '#f0f4f8',
                            color: '#213254',
                            border: '1px solid #d1d5db',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 500,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Cancel</button>
                      </>
                    )}
                  </div>
                  <span style={labelStyle}>Email:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'email' ? (
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                    ) : (
                      <span style={{ fontWeight: 500, display: 'inline' }}>{data.email}</span>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* Account Email */}
            <div style={isMobile ? mobileFieldRowStyle : fieldRowStyle}>
              {isMobile ? (
                <>
                  <div style={mobileLabelEditRow}>
                    <span style={labelStyle}>Account Email:</span>
                    {editField !== 'accountEmail' && (
                      <button
                        type="button"
                        onClick={() => setEditField('accountEmail')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                  </div>
                  <div style={{ width: '100%' }}>
                    {editField === 'accountEmail' ? (
                      <>
                        <input
                          name="accountEmail"
                          type="email"
                          value={form.accountEmail}
                          onChange={handleChange}
                          style={inputStyle}
                        />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleSave('accountEmail')}
                            disabled={saving}
                            style={{
                              background: '#61dafb',
                              color: '#213254',
                              border: 'none',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 700,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, accountEmail: data.accountEmail })); }}
                            style={{
                              background: '#f0f4f8',
                              color: '#213254',
                              border: '1px solid #d1d5db',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 500,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span style={{ fontWeight: 500, display: 'block', textAlign: 'center' }}>{data.accountEmail}</span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={buttonGroupStyle}>
                    {editField !== 'accountEmail' && (
                      <button
                        type="button"
                        onClick={() => setEditField('accountEmail')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                    {editField === 'accountEmail' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSave('accountEmail')}
                          disabled={saving}
                          style={{
                            background: '#61dafb',
                            color: '#213254',
                            border: 'none',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 700,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Save</button>
                        <button
                          type="button"
                          onClick={() => { setEditField(null); setForm(f => ({ ...f, accountEmail: data.accountEmail })); }}
                          style={{
                            background: '#f0f4f8',
                            color: '#213254',
                            border: '1px solid #d1d5db',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 500,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Cancel</button>
                      </>
                    )}
                  </div>
                  <span style={labelStyle}>Account Email:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'accountEmail' ? (
                      <input
                        name="accountEmail"
                        type="email"
                        value={form.accountEmail}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    ) : (
                      <span style={{ fontWeight: 500, display: 'inline' }}>{data.accountEmail}</span>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* Sales Email */}
            <div style={isMobile ? mobileFieldRowStyle : fieldRowStyle}>
              {isMobile ? (
                <>
                  <div style={mobileLabelEditRow}>
                    <span style={labelStyle}>Sales Email:</span>
                    {editField !== 'salesEmail' && (
                      <button
                        type="button"
                        onClick={() => setEditField('salesEmail')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                  </div>
                  <div style={{ width: '100%' }}>
                    {editField === 'salesEmail' ? (
                      <>
                        <input
                          name="salesEmail"
                          type="email"
                          value={form.salesEmail}
                          onChange={handleChange}
                          style={inputStyle}
                        />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleSave('salesEmail')}
                            disabled={saving}
                            style={{
                              background: '#61dafb',
                              color: '#213254',
                              border: 'none',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 700,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, salesEmail: data.salesEmail })); }}
                            style={{
                              background: '#f0f4f8',
                              color: '#213254',
                              border: '1px solid #d1d5db',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 500,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span style={{ fontWeight: 500, display: 'block', textAlign: 'center' }}>{data.salesEmail}</span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={buttonGroupStyle}>
                    {editField !== 'salesEmail' && (
                      <button
                        type="button"
                        onClick={() => setEditField('salesEmail')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                    {editField === 'salesEmail' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSave('salesEmail')}
                          disabled={saving}
                          style={{
                            background: '#61dafb',
                            color: '#213254',
                            border: 'none',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 700,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Save</button>
                        <button
                          type="button"
                          onClick={() => { setEditField(null); setForm(f => ({ ...f, salesEmail: data.salesEmail })); }}
                          style={{
                            background: '#f0f4f8',
                            color: '#213254',
                            border: '1px solid #d1d5db',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 500,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Cancel</button>
                      </>
                    )}
                  </div>
                  <span style={labelStyle}>Sales Email:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'salesEmail' ? (
                      <input
                        name="salesEmail"
                        type="email"
                        value={form.salesEmail}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    ) : (
                      <span style={{ fontWeight: 500, display: 'inline' }}>{data.salesEmail}</span>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* Origin */}
            <div style={isMobile ? mobileFieldRowStyle : fieldRowStyle}>
              {isMobile ? (
                <>
                  <div style={mobileLabelEditRow}>
                    <span style={labelStyle}>Origin:</span>
                    {editField !== 'origin' && (
                      <button
                        type="button"
                        onClick={() => setEditField('origin')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                  </div>
                  <div style={{ width: '100%' }}>
                    {editField === 'origin' ? (
                      <>
                        <input
                          name="origin"
                          value={form.origin}
                          onChange={handleChange}
                          style={inputStyle}
                        />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleSave('origin')}
                            disabled={saving}
                            style={{
                              background: '#61dafb',
                              color: '#213254',
                              border: 'none',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 700,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, origin: data.origin })); }}
                            style={{
                              background: '#f0f4f8',
                              color: '#213254',
                              border: '1px solid #d1d5db',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 500,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span style={{ fontWeight: 500, display: 'block', textAlign: 'center' }}>{data.origin}</span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={buttonGroupStyle}>
                    {editField !== 'origin' && (
                      <button
                        type="button"
                        onClick={() => setEditField('origin')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                    {editField === 'origin' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSave('origin')}
                          disabled={saving}
                          style={{
                            background: '#61dafb',
                            color: '#213254',
                            border: 'none',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 700,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Save</button>
                        <button
                          type="button"
                          onClick={() => { setEditField(null); setForm(f => ({ ...f, origin: data.origin })); }}
                          style={{
                            background: '#f0f4f8',
                            color: '#213254',
                            border: '1px solid #d1d5db',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 500,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Cancel</button>
                      </>
                    )}
                  </div>
                  <span style={labelStyle}>Origin:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'origin' ? (
                      <input
                        name="origin"
                        value={form.origin}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    ) : (
                      <span style={{ fontWeight: 500, display: 'inline' }}>{data.origin}</span>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* Product Categories */}
            <div style={isMobile ? mobileFieldRowStyle : fieldRowStyle}>
              {isMobile ? (
                <>
                  <div style={mobileLabelEditRow}>
                    <span style={labelStyle}>Product Categories:</span>
                    {editField !== 'productCategories' && (
                      <button
                        type="button"
                        onClick={() => setEditField('productCategories')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                  </div>
                  <div style={{ width: '100%' }}>
                    {editField === 'productCategories' ? (
                      <span style={{ display: 'inline-block', width: '100%' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                          {CATEGORY_OPTIONS.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => handleCategoryToggle(cat)}
                              style={{
                                padding: '7px 18px',
                                borderRadius: 20,
                                border: form.productCategories.includes(cat) ? '2px solid #61dafb' : '1px solid #ccc',
                                background: form.productCategories.includes(cat) ? '#61dafb' : '#f7fafd',
                                color: form.productCategories.includes(cat) ? '#213254' : '#222',
                                fontWeight: 600,
                                cursor: 'pointer',
                                outline: 'none',
                                fontSize: 15,
                                transition: 'all 0.15s'
                              }}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleSave('productCategories')}
                            disabled={saving}
                            style={{
                              background: '#61dafb',
                              color: '#213254',
                              border: 'none',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 700,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, productCategories: data.productCategories })); }}
                            style={{
                              background: '#f0f4f8',
                              color: '#213254',
                              border: '1px solid #d1d5db',
                              borderRadius: 8,
                              padding: '7px 18px',
                              fontWeight: 500,
                              fontSize: 15,
                              cursor: 'pointer'
                            }}
                          >Cancel</button>
                        </div>
                      </span>
                    ) : (
                      <span>
                        {Array.isArray(data.productCategories) && data.productCategories.length > 0 ? (
                          data.productCategories.map((cat) => (
                            <span key={cat} style={{
                              display: 'inline-block',
                              background: '#e3f0fa',
                              color: '#213254',
                              borderRadius: 14,
                              padding: '4px 14px',
                              marginRight: 6,
                              fontWeight: 600,
                              fontSize: 15
                            }}>{cat}</span>
                          ))
                        ) : (
                          <span style={{ color: '#888' }}>None</span>
                        )}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={buttonGroupStyle}>
                    {editField !== 'productCategories' && (
                      <button
                        type="button"
                        onClick={() => setEditField('productCategories')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3e68bd',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 15,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >Edit</button>
                    )}
                    {editField === 'productCategories' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSave('productCategories')}
                          disabled={saving}
                          style={{
                            background: '#61dafb',
                            color: '#213254',
                            border: 'none',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 700,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Save</button>
                        <button
                          type="button"
                          onClick={() => { setEditField(null); setForm(f => ({ ...f, productCategories: data.productCategories })); }}
                          style={{
                            background: '#f0f4f8',
                            color: '#213254',
                            border: '1px solid #d1d5db',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 500,
                            fontSize: 15,
                            cursor: 'pointer'
                          }}
                        >Cancel</button>
                      </>
                    )}
                  </div>
                  <span style={labelStyle}>Product Categories:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'productCategories' ? (
                      <span style={{ display: 'inline-block' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {CATEGORY_OPTIONS.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => handleCategoryToggle(cat)}
                              style={{
                                padding: '7px 18px',
                                borderRadius: 20,
                                border: form.productCategories.includes(cat) ? '2px solid #61dafb' : '1px solid #ccc',
                                background: form.productCategories.includes(cat) ? '#61dafb' : '#f7fafd',
                                color: form.productCategories.includes(cat) ? '#213254' : '#222',
                                fontWeight: 600,
                                cursor: 'pointer',
                                outline: 'none',
                                fontSize: 15,
                                transition: 'all 0.15s'
                              }}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </span>
                    ) : (
                      <span>
                        {Array.isArray(data.productCategories) && data.productCategories.length > 0 ? (
                          data.productCategories.map((cat) => (
                            <span key={cat} style={{
                              display: 'inline-block',
                              background: '#e3f0fa',
                              color: '#213254',
                              borderRadius: 14,
                              padding: '4px 14px',
                              marginRight: 6,
                              fontWeight: 600,
                              fontSize: 15
                            }}>{cat}</span>
                          ))
                        ) : (
                          <span style={{ color: '#888' }}>None</span>
                        )}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
            {message && (
              <div style={{
                marginTop: 10,
                color: message === 'Profile updated!' ? '#4BB543' : '#ff4d4f',
                fontWeight: 500,
                textAlign: 'center'
              }}>
                {message}
              </div>
            )}
            {(editField === 'origin' ? form.origin : data.origin) && (
              <div style={{
                width: '100%',
                borderRadius: 14,
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(33,50,84,0.10)',
                marginTop: 18
              }}>
                <iframe
                  title="Supplier Location"
                  width="100%"
                  height="220"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={getMapSrc(editField === 'origin' ? form.origin : data.origin)}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                />
              </div>
            )}
          </form>
        )}
      </div>
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
  const dropdownRef = useRef();
  const burgerRef = useRef();

  useEffect(() => {
    // Decode token to get userId
    const payload = token.split('.')[1];
    let userIdDecoded = '';
    try {
      userIdDecoded = JSON.parse(atob(payload)).userId;
    } catch {}
    setUserId(userIdDecoded);
    // Fetch user info
    if (userIdDecoded) {
      fetch(`http://localhost:8080/users/${userIdDecoded}`)
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
        style={navStyle}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <span
            style={navBrandStyle}
            onClick={() => setActivePage('catalogue')}
          >
            NOT A EKKI
          </span>
          <div className="main-nav-menu" style={navMenuStyle}>
            {NAV_PAGES.map(page => (
              <button
                key={page.key}
                onClick={() => setActivePage(page.key)}
                style={navBtnStyle(activePage === page.key)}
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
            style={navDropdownBtnStyle}
            className="main-nav-dropdown-btn"
          >
            {supplierName} ▾
          </button>
          {dropdownOpen && (
            <div
              style={navDropdownMenuStyle}
            >
              <div
                style={navDropdownHeaderStyle}
              >
                {supplierName}
              </div>
              <button
                onClick={() => setSupplierModalOpen(true)}
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
             Profile
              </button>
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
        <div className="main-nav-burger" ref={burgerRef} style={navBurgerStyle}>
          <button
            onClick={() => setBurgerOpen(b => !b)}
            style={navBurgerBtnStyle}
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
        {activePage === 'catalogue' ? (
          <Catalogue token={token} />
        ) : activePage === 'supplier-data' ? (
          // No longer used as a page, keep fallback for safety
          <></>
        ) : (
          <h2>
            {NAV_PAGES.find(p => p.key === activePage)?.label || 'Welcome'}, {supplierName}!
          </h2>
        )}
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
