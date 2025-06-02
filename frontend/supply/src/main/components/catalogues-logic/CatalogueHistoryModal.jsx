import React, { useState } from 'react';
import ConfirmModal from '../confirmation-modal/ConfirmModal';

export default function CatalogueHistoryModal({ open, onClose, history, onRevert, onClearHistory }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingRevert, setPendingRevert] = useState(null);

  const handleRevert = (h) => {
    setPendingRevert(h);
  };

  const handleConfirmRevert = () => {
    if (pendingRevert) {
      onRevert(pendingRevert);
      setPendingRevert(null);
    }
  };

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.25)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 32, minWidth: 340, maxWidth: 500, boxShadow: '0 4px 32px rgba(0,0,0,0.15)', position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#213254', cursor: 'pointer'
        }}>×</button>
        <h3 style={{ marginTop: 0, color: '#213254' }}>Catalogue History</h3>
        {(!history || history.length === 0) ? (
          <div style={{ color: '#888' }}>No history available.</div>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {history.slice().reverse().map((h, i) => (
                <li key={i} style={{ marginBottom: 18, borderBottom: '1px solid #eee', paddingBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>
                    <b>{h.action.charAt(0).toUpperCase() + h.action.slice(1)}</b>
                    {h.fileName ? ` "${h.fileName}"` : ''}
                    <span style={{ color: '#888', marginLeft: 8, fontSize: 13 }}>
                      {h.date ? new Date(h.date).toLocaleString() : ''}
                    </span>
                  </span>
                  {h.action === 'added' && (
                    <button
                      onClick={() => handleRevert(h)}
                      style={{
                        marginLeft: 10,
                        background: '#61dafb',
                        color: '#213254',
                        border: 'none',
                        borderRadius: 5,
                        padding: '2px 10px',
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer'
                      }}
                      title="Revert to this version"
                    >
                      Revert
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowConfirm(true)}
              style={{
                marginTop: 8,
                background: '#f0f4f8',
                color: '#213254',
                border: '1px solid #d1d5db',
                borderRadius: 5,
                padding: '4px 12px',
                fontWeight: 500,
                fontSize: 13,
                cursor: 'pointer',
                width: '100%',
                marginBottom: 8,
                transition: 'background 0.15s, color 0.15s, border 0.15s'
              }}
              title="Clear all history"
            >
              Clear History
            </button>
            <ConfirmModal
              open={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={() => {
                setShowConfirm(false);
                onClearHistory();
              }}
              text="This will permanently remove all catalogue history for this user. Are you sure?"
            />
            <ConfirmModal
              open={!!pendingRevert}
              onClose={() => setPendingRevert(null)}
              onConfirm={handleConfirmRevert}
              text={
                pendingRevert
                  ? `Are you sure you want to revert to "${pendingRevert.fileName}" from ${pendingRevert.date ? new Date(pendingRevert.date).toLocaleString() : ''}?`
                  : ''
              }
              confirmLabel="Yes, revert"
            />
          </>
        )}
      </div>
    </div>
  );
}
