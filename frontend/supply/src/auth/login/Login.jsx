import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  inputStyle,
  saveBtnStyle,
  messageStyle,
  buttonGroupStyle,
  linkBtnStyle
} from '../../main/styles/sharedStyles';

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
      const res = await fetch('https://supply-sooty.vercel.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Login successful!');
        onLogin && onLogin(data.token);
        localStorage.setItem('token', data.token);

        try {
          const payload = JSON.parse(atob(data.token.split('.')[1]));
          if (payload.userId) {
            localStorage.setItem('userId', payload.userId);
            fetch(`https://supply-sooty.vercel.app/users/${payload.userId}`)
              .then(res => res.json())
              .then(user => {
                localStorage.setItem('supplierName', user.supplierName || '');
              });
          }
        } catch {}

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
      <h2 style={{ marginBottom: 24, fontWeight: 700, letterSpacing: 1 }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
        <div style={{ ...buttonGroupStyle, justifyContent: 'center' }}>
          <button
            type="submit"
            style={{ ...saveBtnStyle, flex: 1 }}
          >
            Login
          </button>
        </div>
      </form>
      <button
        onClick={switchToRegister}
        style={linkBtnStyle}
      >
        Create an account
      </button>
      {message && <div style={messageStyle(false)}>{message}</div>}
    </div>
  );
}
