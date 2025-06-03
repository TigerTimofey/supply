import { useState } from 'react';
import {
  catalogueContainerStyle,
  marketingIdeasContainerStyle,
  marketingIdeaCardStyle,
  marketingIdeaTitleStyle,
  marketingIdeaDescStyle,
  marketingIdeaBtnStyle,
  marketingPhoneModalOverlayStyle,
  marketingPhoneModalStyle,
  marketingPhoneModalNotchStyle,
  marketingPhoneModalCloseBtnStyle,
  marketingPhoneModalContentStyle,
  marketingPhoneModalHeaderStyle,
  marketingPhoneModalOfferStyle,
  marketingPhoneModalDemoBoxStyle,
  marketingPhoneModalDemoTitleStyle,
  marketingPhoneModalDemoDescStyle,
  marketingPhoneModalDemoBtnStyle,
  marketingPhoneModalDemoBadgeStyle,
  marketingPhoneModalDemoInfoStyle
} from '../../styles/sharedStyles';

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

  function renderDemo() {
    if (idea.title === "Grow your baskets") {
      return (
        <div style={marketingPhoneModalDemoBoxStyle}>
          <div style={marketingPhoneModalDemoTitleStyle('#213254')}>
            Add more to your basket!
          </div>
          <div style={marketingPhoneModalDemoDescStyle('#3e68bd')}>
            Customers who bought "Tomatoes" also bought:
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <div style={marketingPhoneModalDemoBadgeStyle}>Cucumbers</div>
            <div style={marketingPhoneModalDemoBadgeStyle}>Salad Mix</div>
          </div>
          <button style={marketingPhoneModalDemoBtnStyle('#61dafb', '#213254')}>
            Add to basket
          </button>
        </div>
      );
    }
    if (idea.title === "'Did you forget?' reminders") {
      return (
        <div style={marketingPhoneModalDemoBoxStyle}>
          <div style={marketingPhoneModalDemoTitleStyle('#e6b800')}>
            Did you forget?
          </div>
          <div style={marketingPhoneModalDemoDescStyle('#213254')}>
            You usually order <b>Milk</b> and <b>Bread</b>.<br />Add them to your order?
          </div>
          <button style={marketingPhoneModalDemoBtnStyle('#e6b800', '#213254')}>
            Add missing items
          </button>
        </div>
      );
    }
    if (idea.title === "Recommended products") {
      return (
        <div style={marketingPhoneModalDemoBoxStyle}>
          <div style={marketingPhoneModalDemoTitleStyle('#1ca21c')}>
            Recommended for you
          </div>
          <div style={marketingPhoneModalDemoDescStyle('#213254')}>
            Try our new <b>Organic Eggs</b> and <b>Fresh Basil</b>!
          </div>
          <button style={marketingPhoneModalDemoBtnStyle('#1ca21c', '#fff')}>
            Add to basket
          </button>
        </div>
      );
    }
    if (idea.title === "Broadcasts") {
      return (
        <div style={marketingPhoneModalDemoBoxStyle}>
          <div style={marketingPhoneModalDemoTitleStyle('#3e68bd')}>
            Special offer!
          </div>
          <div style={marketingPhoneModalDemoDescStyle('#213254')}>
            10% off all <b>Bakery</b> products this week only.
          </div>
          <button style={marketingPhoneModalDemoBtnStyle('#3e68bd', '#fff')}>
            Shop now
          </button>
        </div>
      );
    }
    return null;
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;

  return (
    <div style={{
      ...marketingPhoneModalOverlayStyle,
      alignItems: isMobile ? 'flex-start' : 'center'
    }}>
      <div style={{
        ...marketingPhoneModalStyle,
        width: isMobile ? '100vw' : 320,
        height: isMobile ? '100vh' : 600,
        borderRadius: isMobile ? 0 : 36,
        maxWidth: '100vw',
        maxHeight: '100vh'
      }}>
        <div style={marketingPhoneModalNotchStyle} />
        <button
          onClick={onClose}
          style={marketingPhoneModalCloseBtnStyle}
          aria-label="Close"
        >×</button>
        <div style={{
          ...marketingPhoneModalContentStyle,
          padding: isMobile ? '24px 8px 16px 8px' : marketingPhoneModalContentStyle.padding
        }}>
          <div style={marketingPhoneModalHeaderStyle}>
            {idea.modal.title}
          </div>
          <div style={marketingPhoneModalOfferStyle}>
            {idea.modal.offer}
          </div>
          {renderDemo()}
          <div style={marketingPhoneModalDemoInfoStyle}>
            This is how your marketing feature will look and work for your customers.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MarketingPage() {
  const [modalIdea, setModalIdea] = useState(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;

  return (
    <div style={{
      ...catalogueContainerStyle,
      maxWidth: isMobile ? '100vw' : catalogueContainerStyle.maxWidth,
      padding: isMobile ? 8 : catalogueContainerStyle.padding,
      boxSizing: 'border-box'
    }}>
      <h2 style={{ color: '#213254', marginBottom: 24 }}>Marketing Ideas</h2>
      <div style={marketingIdeasContainerStyle}>
        {ideas.map((idea, idx) => (
          <div
            key={idx}
            style={marketingIdeaCardStyle}
          >
            <div style={marketingIdeaTitleStyle}>{idea.title}</div>
            <div style={marketingIdeaDescStyle}>{idea.description}</div>
            <button
              style={marketingIdeaBtnStyle}
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
