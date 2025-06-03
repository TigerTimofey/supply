import React, { useState } from 'react';
import {
  inputStyle,
  buttonGroupStyle,
  saveBtnStyle,
  cancelBtnStyle,
  messageStyle,
  linkBtnStyle,
  registerContainerStyle,
  categoryListStyle,
  categoryBtnStyle
} from '../../main/styles/sharedStyles';

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

  return (
    <div style={registerContainerStyle}>
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
              style={inputStyle}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={inputStyle}
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
              style={inputStyle}
            />
            <input
              type="text"
              name="origin"
              placeholder="Origin (Country, City)"
              value={form.origin}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </>
        )}
        {step === 3 && (
          <>
            <div style={{ marginBottom: 8, fontWeight: 700 }}>Select Product Categories:</div>
            <div style={categoryListStyle}>
              {CATEGORY_OPTIONS.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  style={categoryBtnStyle(form.productCategories.includes(cat))}
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
              style={inputStyle}
            />
            <input
              type="email"
              name="salesEmail"
              placeholder="Sales Email"
              value={form.salesEmail}
              onChange={handleChange}
              style={inputStyle}
            />
          </>
        )}
        <div style={{
          ...buttonGroupStyle,
          justifyContent: step > 1 ? 'space-between' : 'center'
        }}>
          {step > 1 && (
            <button
              onClick={handleBack}
              style={{
                ...cancelBtnStyle,
                flex: 1
              }}
              type="button"
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button
              type="submit"
              style={{
                ...saveBtnStyle,
                flex: step > 1 ? 1 : 1
              }}
              disabled={checking}
            >
              {checking && step === 1 ? 'Checking...' : 'Next'}
            </button>
          )}
          {step === 4 && (
            <button
              type="submit"
              style={{
                ...saveBtnStyle,
                flex: 1
              }}
            >
              Register
            </button>
          )}
        </div>
      </form>
      <button
        onClick={switchToLogin}
        style={linkBtnStyle}
      >
        Back to login
      </button>
      {message && (
        <div style={messageStyle(message === 'Registration successful! You can now log in.')}>
          {message}
        </div>
      )}
    </div>
  );
}
