import React from 'react';

export default function ConfirmModal({ open, onClose, onConfirm, text, confirmLabel = "Yes, clear history" }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.25)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 400, boxShadow: '0 4px 32px rgba(0,0,0,0.15)', position: 'relative'
      }}>
        <h3 style={{ marginTop: 0, color: '#213254', fontSize: 20 }}>Are you sure?</h3>
        <div style={{ marginBottom: 24, color: '#444', fontSize: 15 }}>{text}</div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              background: '#f0f4f8',
              color: '#213254',
              border: '1px solid #d1d5db',
              borderRadius: 5,
              padding: '6px 18px',
              fontWeight: 500,
              fontSize: 15,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              background: '#61dafb',
              color: '#213254',
              border: 'none',
              borderRadius: 5,
              padding: '6px 18px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer'
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
