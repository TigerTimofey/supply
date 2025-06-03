import React, { useEffect, useState } from 'react';
import { catalogueContainerStyle, saveBtnStyle } from '../../styles/sharedStyles';

export default function ChatPage() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 700 : false
  );

  // Fetch clients from backend
  useEffect(() => {
    fetch('http://localhost:8080/customers')
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

  // Filter and sort clients: PRO first, then by name, and search by name
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

  // Handle sending a message (local only, not persisted)
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
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 0 : 24,
          minHeight: 400
        }}
      >
        {/* Client list */}
        <div
          style={{
            minWidth: isMobile ? '100%' : 220,
            borderRight: isMobile ? 'none' : '1px solid #e0e0e0',
            borderBottom: isMobile ? '1px solid #e0e0e0' : 'none',
            paddingRight: isMobile ? 0 : 8,
            paddingBottom: isMobile ? 18 : 0,
            maxHeight: isMobile ? 'unset' : 500,
            overflowY: 'auto',
            marginBottom: isMobile ? 18 : 0,
            width: isMobile ? '100%' : undefined
          }}
        >
          <input
            type="text"
            placeholder="Search client"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{

              marginBottom: 42,
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 15
            }}
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
                style={{
                  borderRadius: 8,
                  background: selectedClient && selectedClient._id === client._id ? '#e6fbe6' : 'transparent',
                  color: selectedClient && selectedClient._id === client._id ? '#1ca21c' : '#213254',
                  fontWeight: selectedClient && selectedClient._id === client._id ? 700 : 500,
                  cursor: 'pointer',
                  marginBottom: isMobile ? 0 : 4,
                  marginRight: isMobile ? 8 : 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  minWidth: isMobile ? 120 : undefined,
                  border: isMobile && selectedClient && selectedClient._id === client._id ? '1.5px solid #1ca21c' : 'none'
                }}
                onClick={() => setSelectedClient(client)}
              >
                {client.name}
                {client.pro && (
                  <span style={{
                    marginLeft: 6,
                    background: '#61dafb',
                    color: '#213254',
                    fontWeight: 700,
                    fontSize: 12,
                    borderRadius: 6,
                    padding: '2px 10px',
                    letterSpacing: 1,
                    boxShadow: '0 1px 4px rgba(33,50,84,0.08)'
                  }}>
                    PRO
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Chat area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 300,
            marginTop: isMobile ? 18 : 0,
            width: isMobile ? '100%' : undefined
          }}
        >
          {selectedClient ? (
            <>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#213254' }}>
                Chat with {selectedClient.name}
                {selectedClient.pro && (
                  <span style={{
                    marginLeft: 10,
                    background: '#e6fbe6',
                    color: '#1ca21c',
                    fontWeight: 700,
                    fontSize: 13,
                    borderRadius: 6,
                    padding: '2px 10px'
                  }}>
                    PRO
                  </span>
                )}
              </div>
              <div style={{
                flex: 1,
                background: '#f7fafd',
                borderRadius: 10,
                padding: 16,
                marginBottom: 12,
                minHeight: 200,
                maxHeight: isMobile ? 260 : 320,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                {(messages[selectedClient._id] || []).map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: msg.from === 'me' ? 'row-reverse' : 'row',
                      alignItems: 'flex-end',
                      marginBottom: 2
                    }}
                  >
                    <div style={{
                      alignSelf: msg.from === 'me' ? 'flex-end' : 'flex-start',
                      background: msg.from === 'me' ? '#61dafb' : '#fff',
                      color: '#213254',
                      borderRadius: 8,
                      padding: '8px 14px',
                      maxWidth: '70%',
                      fontSize: 15,
                      boxShadow: '0 1px 4px rgba(33,50,84,0.04)'
                    }}>
                      {msg.text}
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: '#888',
                      margin: msg.from === 'me' ? '0 10px 0 0' : '0 0 0 10px',
                      minWidth: 80,
                      textAlign: msg.from === 'me' ? 'left' : 'right',
                      whiteSpace: 'nowrap'
                    }}>
                      {msg.date ? new Date(msg.date).toLocaleString() : ''}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    fontSize: 15
                  }}
                  onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                />
                <button
                  style={{ ...saveBtnStyle, minWidth: 80 }}
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div style={{ color: '#888', fontSize: 16, marginTop: 40 }}>
              Select a client to start chat.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
