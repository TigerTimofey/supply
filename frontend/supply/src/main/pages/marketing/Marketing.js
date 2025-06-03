import React, { useState } from 'react';
import { catalogueContainerStyle, saveBtnStyle } from '../../styles/sharedStyles';

const IDEA_COLOR = "#61dafb";
const ideas = [
  {
    title: "Grow your baskets",
    description: "Increase your average order value by encouraging customers to add more products to their baskets.",
    modal: {
      title: "Grow your baskets",
      offer: "Encourage your customers to add more products to their baskets by showing them popular or complementary items during checkout. This helps increase your average order value and boosts your sales."
    }
  },
  {
    title: "'Did you forget?' reminders",
    description: "Prevent customers forgetting products from their orders by sending timely reminders.",
    modal: {
      title: "'Did you forget?' reminders",
      offer: "Automatically remind your customers about products they frequently order but forgot to add this time. Reduce missed sales and keep your customers happy!"
    }
  },
  {
    title: "Recommended products",
    description: "Choose products that will be recommended to your customers at checkout to boost sales.",
    modal: {
      title: "Recommended products",
      offer: "Select products to recommend at checkout. Help your customers discover new items and increase your sales with personalized suggestions."
    }
  },
  {
    title: "Broadcasts",
    description: "Advertise new products or send special offers to selected customers with a single message.",
    modal: {
      title: "Broadcasts",
      offer: "Send out special offers or announce new products to all or selected customers at once. Keep your customers engaged and informed."
    }
  }
];

function PhoneModal({ open, onClose, idea }) {
  if (!open || !idea) return null;

  // Demo UI for each idea
  function renderDemo() {
    if (idea.title === "Grow your baskets") {
      return (
        <div style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 12px rgba(33,50,84,0.08)',
          padding: 18,
          marginTop: 10,
          width: '100%',
          maxWidth: 240,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#213254' }}>
            Add more to your basket!
          </div>
          <div style={{ color: '#3e68bd', fontSize: 14, marginBottom: 10, textAlign: 'center' }}>
            Customers who bought "Tomatoes" also bought:
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <div style={{
              background: '#f7fafd',
              border: '1.5px solid #61dafb',
              borderRadius: 8,
              padding: '8px 12px',
              fontWeight: 600,
              color: '#213254',
              fontSize: 14
            }}>Cucumbers</div>
            <div style={{
              background: '#f7fafd',
              border: '1.5px solid #61dafb',
              borderRadius: 8,
              padding: '8px 12px',
              fontWeight: 600,
              color: '#213254',
              fontSize: 14
            }}>Salad Mix</div>
          </div>
          <button style={{
            ...saveBtnStyle,
            background: '#61dafb',
            color: '#213254',
            fontWeight: 700,
            fontSize: 15,
            borderRadius: 8,
            marginTop: 6
          }}>
            Add to basket
          </button>
        </div>
      );
    }
    if (idea.title === "'Did you forget?' reminders") {
      return (
        <div style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 12px rgba(33,50,84,0.08)',
          padding: 18,
          marginTop: 10,
          width: '100%',
          maxWidth: 240,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#e6b800' }}>
            Did you forget?
          </div>
          <div style={{ color: '#213254', fontSize: 14, marginBottom: 10, textAlign: 'center' }}>
            You usually order <b>Milk</b> and <b>Bread</b>.<br />Add them to your order?
          </div>
          <button style={{
            ...saveBtnStyle,
            background: '#e6b800',
            color: '#213254',
            fontWeight: 700,
            fontSize: 15,
            borderRadius: 8,
            marginTop: 6
          }}>
            Add missing items
          </button>
        </div>
      );
    }
    if (idea.title === "Recommended products") {
      return (
        <div style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 12px rgba(33,50,84,0.08)',
          padding: 18,
          marginTop: 10,
          width: '100%',
          maxWidth: 240,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#1ca21c' }}>
            Recommended for you
          </div>
          <div style={{ color: '#213254', fontSize: 14, marginBottom: 10, textAlign: 'center' }}>
            Try our new <b>Organic Eggs</b> and <b>Fresh Basil</b>!
          </div>
          <button style={{
            ...saveBtnStyle,
            background: '#1ca21c',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            borderRadius: 8,
            marginTop: 6
          }}>
            Add to basket
          </button>
        </div>
      );
    }
    if (idea.title === "Broadcasts") {
      return (
        <div style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 12px rgba(33,50,84,0.08)',
          padding: 18,
          marginTop: 10,
          width: '100%',
          maxWidth: 240,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#3e68bd' }}>
            Special offer!
          </div>
          <div style={{ color: '#213254', fontSize: 14, marginBottom: 10, textAlign: 'center' }}>
            10% off all <b>Bakery</b> products this week only.
          </div>
          <button style={{
            ...saveBtnStyle,
            background: '#3e68bd',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            borderRadius: 8,
            marginTop: 6
          }}>
            Shop now
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      zIndex: 9999,
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(33,50,84,0.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: 320,
        height: 600,
        background: '#f7fafd',
        borderRadius: 36,
        boxShadow: '0 8px 48px rgba(33,50,84,0.18)',
        border: `3px solid ${IDEA_COLOR}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Phone notch */}
        <div style={{
          width: 80,
          height: 12,
          background: '#e0e0e0',
          borderRadius: 8,
          margin: '18px auto 0 auto'
        }} />
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: 'none',
            border: 'none',
            fontSize: 28,
            color: '#213254',
            cursor: 'pointer',
            fontWeight: 700,
            opacity: 0.7
          }}
          aria-label="Close"
        >×</button>
        {/* Modal content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '36px 24px 24px 24px'
        }}>
          <div style={{ fontWeight: 800, fontSize: 22, color: IDEA_COLOR, marginBottom: 18, textAlign: 'center' }}>
            {idea.modal.title}
          </div>
          <div style={{ color: '#213254', fontSize: 16, marginBottom: 24, textAlign: 'center' }}>
            {idea.modal.offer}
          </div>
          {renderDemo()}
          <div style={{ marginTop: 18, textAlign: 'center', color: '#888', fontSize: 14 }}>
            This is how your marketing feature will look and work for your customers.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MarketingPage() {
  const [modalIdea, setModalIdea] = useState(null);

  return (
    <div style={catalogueContainerStyle}>
      <h2 style={{ color: '#213254', marginBottom: 24 }}>Marketing Ideas</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        marginBottom: 32
      }}>
        {ideas.map((idea, idx) => (
          <div
            key={idx}
            style={{
              flex: '1 1 320px',
              minWidth: 260,
              maxWidth: 400,
              background: '#f7fafd',
              border: `2.5px solid ${IDEA_COLOR}`,
              borderRadius: 16,
              padding: '28px 24px',
              boxShadow: '0 2px 12px rgba(33,50,84,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 20, color: IDEA_COLOR, marginBottom: 8 }}>
              {idea.title}
            </div>
            <div style={{ color: '#213254', fontSize: 16, marginBottom: 8 }}>
              {idea.description}
            </div>
            <button
              style={{ ...saveBtnStyle, marginTop: 8, background: IDEA_COLOR, color: '#213254' }}
              onClick={() => setModalIdea(idea)}
            >
              Learn more
            </button>
          </div>
        ))}
      </div>
      <PhoneModal open={!!modalIdea} onClose={() => setModalIdea(null)} idea={modalIdea} />
    </div>
  );
}
