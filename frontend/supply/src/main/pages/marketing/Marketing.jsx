import  { useState } from 'react';
import {
  catalogueContainerStyle,
  marketingIdeasContainerStyle,
  marketingIdeaCardStyle,
  marketingIdeaTitleStyle,
  marketingIdeaDescStyle,
  marketingIdeaBtnStyle
} from '../../styles/sharedStyles';
import PhoneModal from '../../components/PhoneModal';

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

export default function MarketingPage() {
  const [modalIdea, setModalIdea] = useState(null);

  return (
    <div style={catalogueContainerStyle}>
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
