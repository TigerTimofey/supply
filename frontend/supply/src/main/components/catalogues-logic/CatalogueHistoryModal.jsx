import  { useState } from 'react';
import ConfirmModal from '../confirmation-modal/ConfirmModal';
import {
  catalogueHistoryModalOverlayStyle,
  catalogueHistoryModalStyle,
  catalogueHistoryCloseBtnStyle,
  catalogueHistoryTitleStyle,
  catalogueHistoryNoHistoryStyle,
  catalogueHistoryListStyle,
  catalogueHistoryListItemStyle,
  catalogueHistoryListItemActionStyle,
  catalogueHistoryListItemDateStyle,
  catalogueHistoryRevertBtnStyle,
  catalogueHistoryClearBtnStyle
} from '../../styles/sharedStyles';

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
    <div style={catalogueHistoryModalOverlayStyle}>
      <div style={catalogueHistoryModalStyle}>
        <button onClick={onClose} style={catalogueHistoryCloseBtnStyle}>×</button>
        <h3 style={catalogueHistoryTitleStyle}>Catalogue History</h3>
        {(!history || history.length === 0) ? (
          <div style={catalogueHistoryNoHistoryStyle}>No history available.</div>
        ) : (
          <>
            <ul style={catalogueHistoryListStyle}>
              {history.slice().reverse().map((h, i) => (
                <li key={i} style={catalogueHistoryListItemStyle}>
                  <span>
                    <b style={catalogueHistoryListItemActionStyle}>
                      {h.action.charAt(0).toUpperCase() + h.action.slice(1)}
                    </b>
                    {h.fileName ? ` "${h.fileName}"` : ''}
                    <span style={catalogueHistoryListItemDateStyle}>
                      {h.date ? new Date(h.date).toLocaleString() : ''}
                    </span>
                  </span>
                  {h.action === 'added' && (
                    <button
                      onClick={() => handleRevert(h)}
                      style={catalogueHistoryRevertBtnStyle}
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
              style={catalogueHistoryClearBtnStyle}
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
