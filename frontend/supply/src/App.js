import React, { useState } from 'react';
import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';

function App() {
  const [token, setToken] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          showRegister ? (
            <Register switchToLogin={() => setShowRegister(false)} />
          ) : (
            <Login onLogin={setToken} switchToRegister={() => setShowRegister(true)} />
          )
        ) : (
          <div>
            <h2>Welcome!</h2>
            <div style={{ marginTop: 10, wordBreak: 'break-all' }}>
              <strong>Token:</strong> {token}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
