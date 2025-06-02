import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './auth/login/Login';
import Register from './auth/registration/Register';
import Main from './main/Main';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function AuthWrapper({ setToken, showRegister, setShowRegister }) {
  // Dynamic styles for login/register mode
  const isRegister = showRegister;
  const textColor = isRegister ? '#213254' : '#61dafb';
  const barBg = isRegister
    ? 'linear-gradient(90deg, #213254 0%, #61dafb 100%)'
    : 'linear-gradient(90deg, #61dafb 0%, #3e68bd 100%)';
  const imageBg = isRegister ? '#61dafb' : '#213254';

  return (
    <div className="App-main">
      <div
        className="App-image"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: imageBg
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div className="not-a-ekki-animation">
            <span
              className="not-a-ekki-text"
              style={{ color: textColor }}
            >
              NOT A EKKI
            </span>
            <div
              className="not-a-ekki-bar"
              style={{ background: barBg }}
            />
          </div>
        </div>
      </div>
      <div className="App-form">
        {showRegister ? (
          <Register switchToLogin={() => setShowRegister(false)} />
        ) : (
          <Login onLogin={setToken} switchToRegister={() => setShowRegister(true)} />
        )}
      </div>
    </div>
  );
}

function App() {
  // Persist token in localStorage
  const [token, setTokenState] = useState(() => localStorage.getItem('token') || '');
  const [showRegister, setShowRegister] = useState(false);

  // Save token to localStorage on login
  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  // Optional: logout if token expired (1 hour)
  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && Date.now() / 1000 > payload.exp) {
          setToken('');
        }
      } catch {}
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/main" replace /> : (
              <AuthWrapper setToken={setToken} showRegister={showRegister} setShowRegister={setShowRegister} />
            )
          }
        />
        <Route
          path="/main"
          element={
            token ? <Main token={token} onLogout={() => setToken('')} /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
