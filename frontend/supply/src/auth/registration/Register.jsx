import React, { useState } from 'react';

const CATEGORY_OPTIONS = [
  'alcohol',
  'bakery',
  'coffe and tea',
  'fish and seafood',
  'dairy',
  'drinks',
  'pallets',
  'supplies',
  'frozen meat',
  'toys'
];

export default function Register({ switchToLogin }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    supplierName: '',
    origin: '',
    productCategories: [],
    accountEmail: '',
    salesEmail: ''
  });
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [checking, setChecking] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryClick = cat => {
    setForm(f => {
      const arr = f.productCategories.includes(cat)
        ? f.productCategories.filter(c => c !== cat)
        : [...f.productCategories, cat];
      return { ...f, productCategories: arr };
    });
  };

  const checkUserExists = async () => {
    setChecking(true);
    try {
      const res = await fetch(`https://supply-sooty.vercel.app/users?email=${encodeURIComponent(form.email)}`);
      if (res.ok) {
        const users = await res.json();
        if (Array.isArray(users) && users.some(u => u.email === form.email)) {
          setMessage('User already exists');
          setChecking(false);
          return true;
        }
      }
      setChecking(false);
      return false;
    } catch {
      setMessage('Network error');
      setChecking(false);
      return true;
    }
  };

  const handleNext = async e => {
    e.preventDefault();
    setMessage('');
    if (step === 1) {
      if (!form.email || !form.password) {
        setMessage('Please fill in email and password');
        return;
      }
      if (form.password.length < 8) {
        setMessage('Password must be at least 8 characters');
        return;
      }
      const exists = await checkUserExists();
      if (exists) return;
    }
    if (step === 2 && (!form.supplierName || !form.origin)) {
      setMessage('Please fill in supplier name and origin');
      return;
    }
    if (step === 3 && (!form.productCategories || form.productCategories.length === 0)) {
      setMessage('Please select at least one product category');
      return;
    }
    setStep(step + 1);
  };

  const handleBack = e => {
    e.preventDefault();
    setMessage('');
    setStep(step - 1);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const body = {
      email: form.email,
      password: form.password,
      supplierName: form.supplierName,
      origin: form.origin,
      productCategories: form.productCategories,
      accountEmail: form.accountEmail,
      salesEmail: form.salesEmail
    };
    try {
      const res = await fetch('https://supply-sooty.vercel.app/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! You can now log in.');
        setTimeout(switchToLogin, 2000);
      } else {
        setMessage(data.error || 'Error');
      }
    } catch {
      setMessage('Network error');
    }
  };

  const buttonStyle = {
    padding: 12,
    borderRadius: 8,
    border: 'none',
    background: '#61dafb',
    color: '#222',
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 8,
    flex: 1
  };

  const backButtonStyle = {
    ...buttonStyle,
    background: '#ccc',
    color: '#222'
  };

  return (
    <div style={{
      background: 'rgba(247, 247, 247, 0.09)',
      padding: 32,
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      minWidth: 320,
      maxWidth: 400,
      width: '100%',
      marginLeft: 16,
      marginRight: 16
    }}>
      <h2 style={{ marginBottom: 24, fontWeight: 700, letterSpacing: 1 }}>Register</h2>
      <form
        onSubmit={step === 4 ? handleSubmit : handleNext}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        {step === 1 && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid #ccc',
                fontSize: 16
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid #ccc',
                fontSize: 16
              }}
            />
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="text"
              name="supplierName"
              placeholder="Supplier Name"
              value={form.supplierName}
              onChange={handleChange}
              required
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid #ccc',
                fontSize: 16
              }}
            />
            <input
              type="text"
              name="origin"
              placeholder="Origin (Country, City)"
              value={form.origin}
              onChange={handleChange}
              required
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid #ccc',
                fontSize: 16
              }}
            />
          </>
        )}
        {step === 3 && (
          <>
            <div style={{ marginBottom: 8, fontWeight: 700}}>Select Product Categories:</div>
            <div style={{
              display: 'flex',
              alignItems: "center",
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 8,
              justifyContent: 'center' 
            }}>
              {CATEGORY_OPTIONS.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 20,
                    border: form.productCategories.includes(cat) ? '2px solid #61dafb' : '1px solid #ccc',
                    background: form.productCategories.includes(cat) ? '#61dafb' : '#fff',
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
            {form.productCategories.length > 0 && (
              <div style={{ fontSize: 13, color: '#888', textAlign: 'center' }}>
                Selected: {form.productCategories.join(', ')}
              </div>
            )}
          </>
        )}
        {step === 4 && (
          <>
            <input
              type="email"
              name="accountEmail"
              placeholder="Account Email"
              value={form.accountEmail}
              onChange={handleChange}
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid #ccc',
                fontSize: 16
              }}
            />
            <input
              type="email"
              name="salesEmail"
              placeholder="Sales Email"
              value={form.salesEmail}
              onChange={handleChange}
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid #ccc',
                fontSize: 16
              }}
            />
          </>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          {step > 1 && (
            <button
              onClick={handleBack}
              style={backButtonStyle}
              type="button"
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button
              type="submit"
              style={buttonStyle}
              disabled={checking}
            >
              {checking && step === 1 ? 'Checking...' : 'Next'}
            </button>
          )}
          {step === 4 && (
            <button
              type="submit"
              style={buttonStyle}
            >
              Register
            </button>
          )}
        </div>
      </form>
      <button
        onClick={switchToLogin}
        style={{
          marginTop: 16,
          background: 'none',
          border: 'none',
          color: '#61dafb',
          cursor: 'pointer',
          fontSize: 15,
          textDecoration: 'underline'
        }}
      >
        Back to login
      </button>
      {message && (
        <div
          style={{
            marginTop: 18,
            color: message === 'Registration successful! You can now log in.' ? '#4BB543' : '#ffbaba',
            fontWeight: 500,
            textAlign: 'center'
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
