import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';
import Main from './main/Main';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function AuthWrapper({ setToken, showRegister, setShowRegister }) {
  return (
    <div className="App-main">
      <div className="App-image" />
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
