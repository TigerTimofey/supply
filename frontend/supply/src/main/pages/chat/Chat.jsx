import  { useEffect, useState } from 'react';
import {
  catalogueContainerStyle,
  chatPageContainerStyle,
  chatPageListInputStyle,
  chatPageClientListStyle,
  chatPageClientItemStyle,
  chatPageClientProBadgeStyle,
  chatPageChatAreaStyle,
  chatPageChatHeaderStyle,
  chatPageChatProBadgeStyle,
  chatPageMessagesContainerStyle,
  chatPageMessageRowStyle,
  chatPageMessageBubbleStyle,
  chatPageMessageDateStyle,
  chatPageInputRowStyle,
  chatPageInputStyle,
  chatPageSendBtnStyle,
  chatPageNoClientStyle
} from '../../styles/sharedStyles';

export default function ChatPage() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 700 : false
  );


  useEffect(() => {
    fetch('https://supply-sooty.vercel.app/customers')
      .then(res => res.json())
      .then(data => setClients(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 700);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredClients = clients
    .filter(client =>
      client.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if ((b.pro ? 1 : 0) - (a.pro ? 1 : 0) !== 0) {
        return (b.pro ? 1 : 0) - (a.pro ? 1 : 0);
      }
      return a.name.localeCompare(b.name);
    });

  const handleSend = () => {
    if (!input.trim() || !selectedClient) return;
    setMessages(prev => ({
      ...prev,
      [selectedClient._id]: [
        ...(prev[selectedClient._id] || []),
        { from: 'me', text: input, date: new Date().toISOString() }
      ]
    }));
    setInput('');
  };

  return (
    <div style={catalogueContainerStyle}>
      <h2 style={{ color: '#213254', marginBottom: 18 }}>Chat</h2>
      <div style={chatPageContainerStyle(isMobile)}>

        <div style={chatPageClientListStyle(isMobile)}>
          <input
            type="text"
            placeholder="Search client"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={chatPageListInputStyle}
          />
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            gap: isMobile ? 8 : 0,
            overflowX: isMobile ? 'auto' : 'unset'
          }}>
            {filteredClients.map(client => (
              <div
                key={client._id}
                style={chatPageClientItemStyle(isMobile, selectedClient && selectedClient._id === client._id)}
                onClick={() => setSelectedClient(client)}
              >
                {client.name}
                {client.pro && (
                  <span style={chatPageClientProBadgeStyle}>
                    PRO
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={chatPageChatAreaStyle(isMobile)}>
          {selectedClient ? (
            <>
              <div style={chatPageChatHeaderStyle}>
                Chat with {selectedClient.name}
                {selectedClient.pro && (
                  <span style={chatPageChatProBadgeStyle}>
                    PRO
                  </span>
                )}
              </div>
              <div style={chatPageMessagesContainerStyle(isMobile)}>
                {(messages[selectedClient._id] || []).map((msg, idx) => (
                  <div
                    key={idx}
                    style={chatPageMessageRowStyle(msg.from === 'me')}
                  >
                    <div style={chatPageMessageBubbleStyle(msg.from === 'me')}>
                      {msg.text}
                    </div>
                    <div style={chatPageMessageDateStyle(msg.from === 'me')}>
                      {msg.date ? new Date(msg.date).toLocaleString() : ''}
                    </div>
                  </div>
                ))}
              </div>
              <div style={chatPageInputRowStyle}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type a message..."
                  style={chatPageInputStyle}
                  onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                />
                <button
                  style={chatPageSendBtnStyle}
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div style={chatPageNoClientStyle}>
              Select a client to start chat.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
