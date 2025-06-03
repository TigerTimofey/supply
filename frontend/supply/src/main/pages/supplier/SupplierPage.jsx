import React, { useEffect, useState } from 'react';
import {
  catalogueContainerStyle,
  fieldRowStyle,
  labelStyle,
  inputStyle,
  saveBtnStyle,
  cancelBtnStyle,
  mobileFieldRowStyle
} from '../../styles/sharedStyles';
import { CATEGORY_OPTIONS } from '../../constants/categoryOptions';

export default function SupplierPage() {
  const [supplier, setSupplier] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 700 : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 700);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Try to get userId from localStorage, fallback to decode token if missing
    let userId = localStorage.getItem('userId');
    if (!userId) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.userId) {
            userId = payload.userId;
            localStorage.setItem('userId', userId);
          }
        } catch {}
      }
    }
    if (!userId) {
      setError('No userId found. Please log in again.');
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8080/users/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch supplier data');
        return res.json();
      })
      .then(data => {
        setSupplier(data);
        setForm({
          supplierName: data.supplierName || '',
          email: data.email || '',
          accountEmail: data.accountEmail || '',
          salesEmail: data.salesEmail || '',
          origin: data.origin || '',
          productCategories: (data.productCategories || []).join(', ')
        });
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch supplier data.');
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleCategoryToggle = (cat) => {
    setForm(f => {
      const arr = (f.productCategories || '').split(',').map(s => s.trim()).filter(Boolean);
      if (arr.includes(cat)) {
        return { ...f, productCategories: arr.filter(c => c !== cat).join(', ') };
      } else {
        return { ...f, productCategories: [...arr, cat].join(', ') };
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    let userId = localStorage.getItem('userId');
    if (!userId) {
      setError('No userId found. Please log in again.');
      setSaving(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          supplierName: form.supplierName,
          email: form.email,
          accountEmail: form.accountEmail,
          salesEmail: form.salesEmail,
          origin: form.origin,
          productCategories: form.productCategories
            ? form.productCategories.split(',').map(s => s.trim()).filter(Boolean)
            : []
        })
      });
      if (!res.ok) throw new Error('Failed to save');
      const updated = await res.json();
      setSupplier(updated);
      setEdit(false);
    } catch {
      setError('Failed to save changes.');
    }
    setSaving(false);
  };

  if (error) {
    return (
      <div style={catalogueContainerStyle}>
        <h2 style={{ color: '#213254', marginBottom: 24 }}>Supplier Profile</h2>
        <div style={{ color: '#e74c3c', fontSize: 18, marginTop: 32, textAlign: 'center' }}>
          {error}
        </div>
      </div>
    );
  }

  if (loading || !supplier) {
    return (
      <div style={catalogueContainerStyle}>
        <h2 style={{ color: '#213254', marginBottom: 24 }}>Supplier Profile</h2>
        <div style={{ color: '#888', fontSize: 18, marginTop: 32, textAlign: 'center' }}>
          Fetching supplier data...
        </div>
      </div>
    );
  }

  const rowStyle = isMobile ? mobileFieldRowStyle : fieldRowStyle;

  return (
    <div style={catalogueContainerStyle}>
      <h2 style={{ color: '#213254', marginBottom: 24 }}>Supplier Profile</h2>
      <div style={{ marginBottom: 24 }}>
        <div style={rowStyle}>
          <span style={labelStyle}>Supplier Name:</span>
          {edit ? (
            <input
              name="supplierName"
              value={form.supplierName}
              onChange={handleChange}
              style={inputStyle}
              disabled={saving}
            />
          ) : (
            <span style={inputStyle}>{supplier.supplierName}</span>
          )}
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Email:</span>
          {edit ? (
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              disabled={saving}
            />
          ) : (
            <span style={inputStyle}>{supplier.email}</span>
          )}
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Account Email:</span>
          {edit ? (
            <input
              name="accountEmail"
              value={form.accountEmail}
              onChange={handleChange}
              style={inputStyle}
              disabled={saving}
            />
          ) : (
            <span style={inputStyle}>{supplier.accountEmail || '-'}</span>
          )}
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Sales Email:</span>
          {edit ? (
            <input
              name="salesEmail"
              value={form.salesEmail}
              onChange={handleChange}
              style={inputStyle}
              disabled={saving}
            />
          ) : (
            <span style={inputStyle}>{supplier.salesEmail || '-'}</span>
          )}
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Origin:</span>
          {edit ? (
            <input
              name="origin"
              value={form.origin}
              onChange={handleChange}
              style={inputStyle}
              disabled={saving}
            />
          ) : (
            <span style={inputStyle}>{supplier.origin || '-'}</span>
          )}
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Product Categories:</span>
          {edit ? (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginTop: 4
            }}>
              {CATEGORY_OPTIONS.map(cat => {
                const selected = (form.productCategories || '').split(',').map(s => s.trim()).includes(cat);
                return (
                  <span
                    key={cat}
                    onClick={() => handleCategoryToggle(cat)}
                    style={{
                      background: selected ? '#61dafb' : '#f7fafd',
                      color: selected ? '#213254' : '#888',
                      border: selected ? '1.5px solid #61dafb' : '1.5px solid #e0e0e0',
                      borderRadius: 8,
                      padding: '6px 14px',
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'all 0.15s'
                    }}
                  >
                    {cat}
                  </span>
                );
              })}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginTop: 4
            }}>
              {(supplier.productCategories || []).length === 0
                ? <span style={{ color: '#888' }}>-</span>
                : supplier.productCategories.map(cat => (
                  <span
                    key={cat}
                    style={{
                      background: '#61dafb',
                      color: '#213254',
                      borderRadius: 8,
                      padding: '6px 14px',
                      fontWeight: 600,
                      fontSize: 14,
                      marginRight: 4,
                      marginBottom: 4,
                      display: 'inline-block'
                    }}
                  >
                    {cat}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        {edit ? (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              style={saveBtnStyle}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              style={cancelBtnStyle}
              onClick={() => {
                setEdit(false);
                setForm({
                  supplierName: supplier.supplierName || '',
                  email: supplier.email || '',
                  accountEmail: supplier.accountEmail || '',
                  salesEmail: supplier.salesEmail || '',
                  origin: supplier.origin || '',
                  productCategories: (supplier.productCategories || []).join(', ')
                });
                setError('');
                setSuccess('');
              }}
              disabled={saving}
            >
              Cancel
            </button>
            {error && <span style={{ color: '#e74c3c', marginLeft: 12 }}>{error}</span>}
            {success && <span style={{ color: '#1ca21c', marginLeft: 12 }}>{success}</span>}
          </div>
        ) : (
          <button
            style={saveBtnStyle}
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
      <div>
        <h3 style={{ color: '#3e68bd', marginBottom: 12 }}>Location</h3>
        <div style={{
          width: '100%',
          height: isMobile ? 200 : 320,
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(33,50,84,0.10)'
        }}>
          <iframe
            title="Supplier Location"
            width="100%"
            height={isMobile ? 200 : 320}
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${encodeURIComponent(form.origin || supplier.origin || 'London, UK')}&output=embed`}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
