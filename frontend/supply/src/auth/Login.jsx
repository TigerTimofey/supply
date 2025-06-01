import React, { useState } from 'react';

export default function Login({ onLogin, switchToRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Login successful!');
        onLogin && onLogin(data.token);
      } else {
        setMessage(data.error || 'Error');
      }
    } catch {
      setMessage('Network error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit" style={{ margin: 8 }}>
          Login
        </button>
      </form>
      <button onClick={switchToRegister} style={{ margin: 8 }}>
        Create an account
      </button>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </div>
  );
}
