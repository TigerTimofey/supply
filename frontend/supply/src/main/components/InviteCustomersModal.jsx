import React, { useState, useEffect } from 'react';
import {
  modalOverlayStyle,
  modalStyle,
  closeBtnStyle,
  saveBtnStyle,
  dividerLineStyleModal
} from '../styles/sharedStyles';

// SMS Invite Modal with editable message
function SmsInviteModal({ open, onClose, inviteLink }) {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState(
    `Hi! You have been invited to join NOT A REKKI. Click the link to get started: ${inviteLink}`
  );

  useEffect(() => {
    setMessage(`Hi! You have been invited to join NOT A REKKI. Click the link to get started: ${inviteLink}`);
  }, [inviteLink, open]);

  const isSendDisabled = number.replace(/\D/g, '').length < 8;

  if (!open) return null;
  return (
    <div style={{
      ...modalOverlayStyle(),
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(33,50,84,0.18)',
          padding: 32,
          minWidth: 0,
          width: 400,
          maxWidth: '95vw',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <button onClick={onClose} style={{ ...closeBtnStyle, top: 10, right: 10 }} aria-label="Close">×</button>
        <h3 style={{ color: '#213254', marginBottom: 14, fontWeight: 900, fontSize: 20, width: '100%', textAlign: 'center' }}>
          Invite customer via SMS
        </h3>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 8,
            border: '1.5px solid #61dafb',
            fontSize: 15,
            marginBottom: 12
          }}
        />
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={5}
          style={{
            width: '100%',
            borderRadius: 8,
            border: '1.5px solid #61dafb',
            fontSize: 15,
            padding: '10px 12px',
            marginBottom: 12,
            resize: 'vertical',
            minHeight: 90
          }}
        />
        <div style={{ color: '#888', fontSize: 13, marginBottom: 10, textAlign: 'center' }}>
          This is the SMS text your customer will receive (editable).
        </div>
        <button
          style={{
            ...saveBtnStyle,
            width: '100%',
            fontSize: 16,
            opacity: isSendDisabled ? 0.5 : 1,
            cursor: isSendDisabled ? 'not-allowed' : 'pointer'
          }}
          onClick={onClose}
          disabled={isSendDisabled}
        >
          Send invite
        </button>
      </div>
    </div>
  );
}

export default function InviteCustomersModal({ open, onClose, supplierId: propSupplierId, supplierName: propSupplierName }) {
  const [copied, setCopied] = useState(false);
  const [supplierId, setSupplierId] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [smsModalOpen, setSmsModalOpen] = useState(false);

  // Fetch supplier data if not provided via props
  useEffect(() => {
    if (propSupplierId && propSupplierName) {
      setSupplierId(propSupplierId);
      setSupplierName(propSupplierName);
      return;
    }
    // Try to get from localStorage
    const localId = localStorage.getItem('userId');
    const localName = localStorage.getItem('supplierName');
    if (localId && localName) {
      setSupplierId(localId);
      setSupplierName(localName);
      return;
    }
    // Try to get from backend if not present
    const token = localStorage.getItem('token');
    if (token) {
      let userId = '';
      try {
        userId = JSON.parse(atob(token.split('.')[1])).userId;
      } catch {}
      if (userId) {
        fetch(`https://supply-navy.vercel.app/users/${userId}`)
          .then(res => res.json())
          .then(user => {
            setSupplierId(user._id || userId);
            setSupplierName(user.supplierName || '');
          });
      }
    }
  }, [propSupplierId, propSupplierName]);

  // Compose invite link using supplierId (first 6 chars)
  const inviteCode = supplierId ? supplierId.slice(0, 6) : 'supplier';
  const INVITE_LINK = `https://notaekki.com/${inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(INVITE_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  if (!open) return null;
  return (
    <div style={modalOverlayStyle()}>
      <div
        style={{
          ...modalStyle,
          maxWidth: 480,
          minHeight: 0,
          padding: 32,
          alignItems: 'flex-start',
          position: 'relative'
        }}
      >
        <button onClick={onClose} style={closeBtnStyle} aria-label="Close">×</button>
        <h2 style={{ color: '#213254', marginBottom: 12, fontWeight: 900, fontSize: 26, width: '100%', textAlign: 'center' }}>
          Invite customers
        </h2>

       <h3 style={{ color: '#213254', marginBottom: 12, fontWeight: 900, fontSize: 16, width: '100%', textAlign: 'center' }}>
        VIA SMS
        </h3>
        <div style={{
          background: '#f7fafd',
          border: '1.5px solid #61dafb',
          borderRadius: 10,
          padding: '16px 18px',
          marginTop: 18,
          fontSize: 15,
          color: '#213254'
        }}>
          <b>Add customer to NOT A REKKI via SMS</b>
          <br />
          <span style={{ color: '#3e68bd', fontWeight: 600 }}>
            add your customer’s details and product list to help them onboard faster – it’s free
          </span>
        </div>  
        <div style={{ margin: '18px 0 10px 0', width: '100%' }}>
          <button
            style={{ ...saveBtnStyle, width: '100%', fontSize: 16, marginBottom: 40 }}
            onClick={() => setSmsModalOpen(true)}
          >
            Invite customers
          </button>
        </div>
        <SmsInviteModal open={smsModalOpen} onClose={() => setSmsModalOpen(false)} inviteLink={INVITE_LINK} />
        <div style={dividerLineStyleModal} />

         <h3 style={{ color: '#213254', marginBottom: 12, fontWeight: 900, fontSize: 16, width: '100%', textAlign: 'center' }}>
        VIA LINK
        </h3>
        <div style={{
          background: '#f7fafd',
          border: '1.5px solid #61dafb',
          borderRadius: 10,
          padding: '16px 18px',
          marginBottom: 18,
          fontSize: 15,
          color: '#213254'
        }}>
          <b>Share set up link</b>
          <br />
          <span style={{ color: '#3e68bd', fontWeight: 600 }}>
            onboard your customers to NOT A REKKI by sharing this link – you can also paste it in your email signature or share it on social media
          </span>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="text"
              value={INVITE_LINK}
              readOnly
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: 6,
                border: '1px solid #ccc',
                fontSize: 14,
                background: '#fff'
              }}
            />
            <button
              style={{
                ...saveBtnStyle,
                minWidth: 90,
                fontSize: 15
              }}
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>
        </div>
         <div style={{ marginTop: 14, color: '#888', fontSize: 15, textAlign: 'center', width: '100%', marginBottom: 30 }}>   
            This is what your customer will see when they join
          </div>
        <div style={{
          fontSize: 17,
          color: '#213254',
          marginBottom: 22,
          textAlign: 'center',
          width: '100%',
          background: 'linear-gradient(90deg, #f7fafd 60%, #e3f0fa 100%)',
          borderRadius: 12,
          padding: '18px 10px 18px 10px',
          boxShadow: '0 2px 12px rgba(33,50,84,0.07)'
        }}>
          <div style={{ fontWeight: 900, fontSize: 22, color: '#213254', marginBottom: 8 }}>
            Welcome to <span style={{ color: '#61dafb' }}>NOT A REKKI</span>
          </div>
          <div style={{ fontWeight: 600, color: '#3e68bd', fontSize: 16, marginBottom: 8 }}>
            The free ordering app for chefs
          </div>
          <div style={{ margin: '12px 0 0 0', fontSize: 16, color: '#213254' }}>
            <span style={{ color: '#888' }}>You have been added by</span>
            <br />
            <span style={{ fontWeight: 700, fontSize: 18, color: '#213254' }}>{supplierName || 'Supplier'}</span>
            <br />
        <button
              style={{
                ...saveBtnStyle,
                marginTop: 12,
                minWidth: 90,
                fontSize: 15
              }}
              onClick={() => alert('User moved to AppStore')}
            >
             CONNECT
            </button>
          </div>
      
        </div>
      </div>
    </div>
  );
}
