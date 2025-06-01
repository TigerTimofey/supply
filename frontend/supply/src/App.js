import React, { useState } from 'react';
import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';

function App() {
  const [token, setToken] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="App">
      <div className="App-main">
        <div className="App-image" />
        <div className="App-form">
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
        </div>
      </div>
    </div>
  );
}

export default App;
