import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin, switchToRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
        // Save token to localStorage for persistence
        localStorage.setItem('token', data.token);
        navigate('/main');
      } else {
        if (data.error === 'Invalid credentials') {
          setMessage('Wrong email or password');
        } else {
          setMessage(data.error || 'Error');
        }
      }
    } catch {
      setMessage('Network error');
    }
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      padding: 32,
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      minWidth: 320,
      maxWidth: 400,
      width: '100%',
      marginLeft: 16,
      marginRight: 16
    }}>
      <h2 style={{ marginBottom: 24, fontWeight: 700, letterSpacing: 1 }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
        <button
          type="submit"
          style={{
            padding: 12,
            borderRadius: 8,
            border: 'none',
            background: '#61dafb',
            color: '#222',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            marginTop: 8
          }}
        >
          Login
        </button>
      </form>
      <button
        onClick={switchToRegister}
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
        Create an account
      </button>
      {message && <div style={{ marginTop: 18, color: '#ffbaba', fontWeight: 500 }}>{message}</div>}
    </div>
  );
}
