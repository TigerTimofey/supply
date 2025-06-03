import  { useState, useEffect } from 'react';
import {
  modalOverlayStyle,
  modalStyle,
  closeBtnStyle,
  dividerLineStyleModal,
  smsInviteModalContainerStyle,
  smsInviteModalTitleStyle,
  smsInviteModalInputStyle,
  smsInviteModalTextareaStyle,
  smsInviteModalInfoStyle,
  smsInviteModalSendBtnStyle,
  inviteCustomersInfoBoxStyle,
  inviteCustomersBtnStyle,
  inviteCustomersLinkInputStyle,
  inviteCustomersLinkBtnStyle,
  inviteCustomersCustomerSeeStyle,
  inviteCustomersWelcomeBoxStyle,
  inviteCustomersWelcomeTitleStyle,
  inviteCustomersWelcomeSubtitleStyle,
  inviteCustomersWelcomeSupplierStyle,
  inviteCustomersConnectBtnStyle,
  inviteCustomersModalTitleStyle,
  inviteCustomersModalSectionTitleStyle
} from '../styles/sharedStyles';

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
    <div style={{ ...modalOverlayStyle(), alignItems: 'center', justifyContent: 'center' }}>
      <div style={smsInviteModalContainerStyle}>
        <button onClick={onClose} style={{ ...closeBtnStyle, top: 10, right: 10 }} aria-label="Close">×</button>
        <h3 style={smsInviteModalTitleStyle}>
          Invite customer via SMS
        </h3>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          style={smsInviteModalInputStyle}
        />
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={5}
          style={smsInviteModalTextareaStyle}
        />
        <div style={smsInviteModalInfoStyle}>
          This is the SMS text your customer will receive (editable).
        </div>
        <button
          style={smsInviteModalSendBtnStyle(isSendDisabled)}
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

  useEffect(() => {
    if (propSupplierId && propSupplierName) {
      setSupplierId(propSupplierId);
      setSupplierName(propSupplierName);
      return;
    }

    const localId = localStorage.getItem('userId');
    const localName = localStorage.getItem('supplierName');
    if (localId && localName) {
      setSupplierId(localId);
      setSupplierName(localName);
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      let userId = '';
      try {
        userId = JSON.parse(atob(token.split('.')[1])).userId;
      } catch {}
      if (userId) {
        fetch(`https://supply-sooty.vercel.app/users/${userId}`)
          .then(res => res.json())
          .then(user => {
            setSupplierId(user._id || userId);
            setSupplierName(user.supplierName || '');
          });
      }
    }
  }, [propSupplierId, propSupplierName]);

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
        <h2 style={inviteCustomersModalTitleStyle}>
          Invite customers
        </h2>
        <h3 style={inviteCustomersModalSectionTitleStyle}>
          VIA SMS
        </h3>
        <div style={inviteCustomersInfoBoxStyle}>
          <b>Add customer to NOT A REKKI via SMS</b>
          <br />
          <span style={{ color: '#3e68bd', fontWeight: 600 }}>
            add your customer’s details and product list to help them onboard faster – it’s free
          </span>
        </div>
        <div style={{ margin: '18px 0 10px 0', width: '100%' }}>
          <button
            style={inviteCustomersBtnStyle}
            onClick={() => setSmsModalOpen(true)}
          >
            Invite customers
          </button>
        </div>
        <SmsInviteModal open={smsModalOpen} onClose={() => setSmsModalOpen(false)} inviteLink={INVITE_LINK} />
        <div style={dividerLineStyleModal} />
        <h3 style={inviteCustomersModalSectionTitleStyle}>
          VIA LINK
        </h3>
        <div style={inviteCustomersInfoBoxStyle}>
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
              style={inviteCustomersLinkInputStyle}
            />
            <button
              style={inviteCustomersLinkBtnStyle(copied)}
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>
        </div>
        <div style={inviteCustomersCustomerSeeStyle}>
          This is what your customer will see when they join
        </div>
        <div style={inviteCustomersWelcomeBoxStyle}>
          <div style={inviteCustomersWelcomeTitleStyle}>
            Welcome to <span style={{ color: '#61dafb' }}>NOT A REKKI</span>
          </div>
          <div style={inviteCustomersWelcomeSubtitleStyle}>
            The free ordering app for chefs
          </div>
          <div style={{ margin: '12px 0 0 0', fontSize: 16, color: '#213254' }}>
            <span style={{ color: '#888' }}>You have been added by</span>
            <br />
            <span style={inviteCustomersWelcomeSupplierStyle}>{supplierName || 'Supplier'}</span>
            <br />
            <button
              style={inviteCustomersConnectBtnStyle}
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

