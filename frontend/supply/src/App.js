import React, { useState } from 'react';
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
  const [token, setToken] = useState('');
  const [showRegister, setShowRegister] = useState(false);

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
            token ? <Main token={token} /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
