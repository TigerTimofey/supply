import React, { useEffect, useState } from 'react';

export default function Main({ token }) {
  const [supplierName, setSupplierName] = useState('');

  useEffect(() => {
    // Decode token to get userId
    const payload = token.split('.')[1];
    let userId = '';
    try {
      userId = JSON.parse(atob(payload)).userId;
    } catch {}
    // Fetch user info
    if (userId) {
      fetch(`http://localhost:8080/users/${userId}`)
        .then(res => res.json())
        .then(user => setSupplierName(user.supplierName || user.email || 'Supplier'));
    }
  }, [token]);

  return (
    <div>
      <nav style={{
        width: '100%',
        background: '#23272f',
        color: '#fff',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: 18
      }}>
        <span>Supply</span>
        <span>{supplierName}</span>
      </nav>
      <div style={{ padding: 32 }}>
        <h2>Welcome, {supplierName}!</h2>
        {/* Main content goes here */}
      </div>
    </div>
  );
}
