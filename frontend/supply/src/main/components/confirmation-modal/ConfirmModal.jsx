import React from 'react';
import {
  confirmModalOverlayStyle,
  confirmModalBoxStyle,
  confirmModalTitleStyle,
  confirmModalTextStyle,
  confirmModalBtnGroupStyle,
  confirmModalCancelBtnStyle,
  confirmModalConfirmBtnStyle
} from '../../styles/sharedStyles';

export default function ConfirmModal({ open, onClose, onConfirm, text, confirmLabel = "Yes, clear history" }) {
  if (!open) return null;
  return (
    <div style={confirmModalOverlayStyle}>
      <div style={confirmModalBoxStyle}>
        <h3 style={confirmModalTitleStyle}>Are you sure?</h3>
        <div style={confirmModalTextStyle}>{text}</div>
        <div style={confirmModalBtnGroupStyle}>
          <button
            onClick={onClose}
            style={confirmModalCancelBtnStyle}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={confirmModalConfirmBtnStyle}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
