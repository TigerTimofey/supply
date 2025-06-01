import React, { useState } from 'react';

export default function Register({ switchToLogin }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    accountEmail: '',
    salesEmail: '',
    origin: '',
    productCategories: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const body = {
      email: form.email,
      password: form.password,
      accountEmail: form.accountEmail,
      salesEmail: form.salesEmail,
      origin: form.origin,
      productCategories: form.productCategories
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    };
    try {
      const res = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! You can now log in.');
        setTimeout(switchToLogin, 1000);
      } else {
        setMessage(data.error || 'Error');
      }
    } catch {
      setMessage('Network error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ minWidth: 300 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ margin: 4, width: '100%' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ margin: 4, width: '100%' }}
        />
        <input
          type="email"
          name="accountEmail"
          placeholder="Account Email"
          value={form.accountEmail}
          onChange={handleChange}
          style={{ margin: 4, width: '100%' }}
        />
        <input
          type="email"
          name="salesEmail"
          placeholder="Sales Email"
          value={form.salesEmail}
          onChange={handleChange}
          style={{ margin: 4, width: '100%' }}
        />
        <input
          type="text"
          name="origin"
          placeholder="Origin (Country, City)"
          value={form.origin}
          onChange={handleChange}
          style={{ margin: 4, width: '100%' }}
        />
        <input
          type="text"
          name="productCategories"
          placeholder="Product Categories (comma separated)"
          value={form.productCategories}
          onChange={handleChange}
          style={{ margin: 4, width: '100%' }}
        />
        <button type="submit" style={{ margin: 8 }}>
          Register
        </button>
      </form>
      <button onClick={switchToLogin} style={{ margin: 8 }}>
        Back to login
      </button>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </div>
  );
}
