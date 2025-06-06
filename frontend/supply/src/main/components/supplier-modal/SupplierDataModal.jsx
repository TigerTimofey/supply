import React, { useEffect, useState } from 'react';
import { CATEGORY_OPTIONS } from '../../constants/categoryOptions';
import {
  inputStyle,
  fieldRowStyle,
  labelStyle,
  buttonGroupStyle,
  modalStyle,
  responsiveModalStyle,
  mobileFieldRowStyle,
  mobileLabelEditRow,
  saveBtnStyle,
  cancelBtnStyle,
  closeBtnStyle,
  loadingContainerStyle,
  modalOverlayStyle,
  modalHeaderRowStyle,
  profileHeaderStyle,
  modalFormStyle,
  editBtnStyle,
  supplierModalMapContainerStyle,
  supplierModalCategoryBtnStyle,
  supplierModalCategoryTagStyle,
  supplierModalCategoryListStyle,
  supplierModalMessageStyle,
  supplierModalEditBtnGroupStyle
} from '../../styles/sharedStyles';

export default function SupplierDataModal({ open, onClose, userId }) {
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
      fetch(`https://supply-sooty.vercel.app/users/${userId}`)
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

  // Email validation helper
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = async (field) => {
    setSaving(true);
    setMessage('');
    // Email validation for email fields
    if (
      (field === 'email' && !validateEmail(form.email)) ||
      (field === 'accountEmail' && form.accountEmail && !validateEmail(form.accountEmail)) ||
      (field === 'salesEmail' && form.salesEmail && !validateEmail(form.salesEmail))
    ) {
      setMessage('Please enter a valid email address.');
      setSaving(false);
      return;
    }
    try {
      const patch = field === 'productCategories'
        ? { productCategories: form.productCategories }
        : { [field]: form[field] };
      const res = await fetch(`https://supply-sooty.vercel.app/users/${userId}`, {
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

  function renderEditSaveCancel(field, originalValue) {
    return (
      <div style={buttonGroupStyle}>
        {editField !== field && (
          <button
            type="button"
            onClick={() => setEditField(field)}
            style={editBtnStyle}
          >Edit</button>
        )}
        {editField === field && (
          <>
            <button
              type="button"
              onClick={() => handleSave(field)}
              disabled={saving}
              style={saveBtnStyle}
            >Save</button>
            <button
              type="button"
              onClick={() => { setEditField(null); setForm(f => ({ ...f, [field]: originalValue })); }}
              style={cancelBtnStyle}
            >Cancel</button>
          </>
        )}
      </div>
    );
  }

  if (!open) return null;

  const computedInputStyle = {
    ...inputStyle,
    width: isMobile ? '90vw' : '100%',
    maxWidth: isMobile ? '98vw' : undefined,
    margin: isMobile ? '0 auto' : undefined
  };
  const computedModalStyle = isMobile
    ? { ...responsiveModalStyle }
    : { ...modalStyle };

  return (
    <div style={modalOverlayStyle(isMobile)}>
      <div style={computedModalStyle}>
        <button
          onClick={onClose}
          style={closeBtnStyle}
          aria-label="Close"
        >×</button>
        <div style={modalHeaderRowStyle}>
          <h1 style={profileHeaderStyle}>
            Profile
          </h1>
        </div>
        {!data ? (
          <div style={loadingContainerStyle}>
            <span style={{ fontSize: 22, color: '#888' }}>Loading...</span>
          </div>
        ) : (
          <form style={modalFormStyle}>
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
                        style={editBtnStyle}
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
                          style={computedInputStyle}
                          required
                          autoFocus
                        />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleSave('supplierName')}
                            disabled={saving}
                            style={saveBtnStyle}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, supplierName: data.supplierName })); }}
                            style={cancelBtnStyle}
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
                  {renderEditSaveCancel('supplierName', data.supplierName)}
                  <span style={labelStyle}>Supplier Name:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'supplierName' ? (
                      <input
                        name="supplierName"
                        value={form.supplierName}
                        onChange={handleChange}
                        style={computedInputStyle}
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
                        style={editBtnStyle}
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
                          style={computedInputStyle}
                          required
                        />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleSave('email')}
                            disabled={saving}
                            style={saveBtnStyle}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, email: data.email })); }}
                            style={cancelBtnStyle}
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
                  {renderEditSaveCancel('email', data.email)}
                  <span style={labelStyle}>Email:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'email' ? (
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        style={computedInputStyle}
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
                        style={editBtnStyle}
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
                          style={computedInputStyle}
                        />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleSave('accountEmail')}
                            disabled={saving}
                            style={saveBtnStyle}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, accountEmail: data.accountEmail })); }}
                            style={cancelBtnStyle}
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
                  {renderEditSaveCancel('accountEmail', data.accountEmail)}
                  <span style={labelStyle}>Account Email:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'accountEmail' ? (
                      <input
                        name="accountEmail"
                        type="email"
                        value={form.accountEmail}
                        onChange={handleChange}
                        style={computedInputStyle}
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
                        style={editBtnStyle}
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
                          style={computedInputStyle}
                        />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleSave('salesEmail')}
                            disabled={saving}
                            style={saveBtnStyle}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, salesEmail: data.salesEmail })); }}
                            style={cancelBtnStyle}
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
                  {renderEditSaveCancel('salesEmail', data.salesEmail)}
                  <span style={labelStyle}>Sales Email:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'salesEmail' ? (
                      <input
                        name="salesEmail"
                        type="email"
                        value={form.salesEmail}
                        onChange={handleChange}
                        style={computedInputStyle}
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
                        style={editBtnStyle}
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
                          style={computedInputStyle}
                        />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleSave('origin')}
                            disabled={saving}
                            style={saveBtnStyle}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, origin: data.origin })); }}
                            style={cancelBtnStyle}
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
                  {renderEditSaveCancel('origin', data.origin)}
                  <span style={labelStyle}>Origin:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'origin' ? (
                      <input
                        name="origin"
                        value={form.origin}
                        onChange={handleChange}
                        style={computedInputStyle}
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
                        style={editBtnStyle}
                      >Edit</button>
                    )}
                  </div>
                  <div style={{ width: '100%' }}>
                    {editField === 'productCategories' ? (
                      <span style={{ display: 'inline-block', width: '100%' }}>
                        <div style={supplierModalCategoryListStyle}>
                          {CATEGORY_OPTIONS.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => handleCategoryToggle(cat)}
                              style={supplierModalCategoryBtnStyle(form.productCategories.includes(cat))}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                        <div style={supplierModalEditBtnGroupStyle}>
                          <button
                            type="button"
                            onClick={() => handleSave('productCategories')}
                            disabled={saving}
                            style={saveBtnStyle}
                          >Save</button>
                          <button
                            type="button"
                            onClick={() => { setEditField(null); setForm(f => ({ ...f, productCategories: data.productCategories })); }}
                            style={cancelBtnStyle}
                          >Cancel</button>
                        </div>
                      </span>
                    ) : (
                      <span>
                        {Array.isArray(data.productCategories) && data.productCategories.length > 0 ? (
                          data.productCategories.map((cat) => (
                            <span key={cat} style={supplierModalCategoryTagStyle}>{cat}</span>
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
                  {renderEditSaveCancel('productCategories', data.productCategories)}
                  <span style={labelStyle}>Product Categories:</span>
                  <div style={{ flex: 1, width: '100%' }}>
                    {editField === 'productCategories' ? (
                      <span style={{ display: 'inline-block' }}>
                        <div style={supplierModalCategoryListStyle}>
                          {CATEGORY_OPTIONS.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => handleCategoryToggle(cat)}
                              style={supplierModalCategoryBtnStyle(form.productCategories.includes(cat))}
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
                            <span key={cat} style={supplierModalCategoryTagStyle}>{cat}</span>
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
              <div style={supplierModalMessageStyle(message === 'Profile updated!')}>
                {message}
              </div>
            )}
            {(editField === 'origin' ? form.origin : data.origin) && (
              <div style={supplierModalMapContainerStyle}>
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
