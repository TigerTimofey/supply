import React, { useEffect, useState } from 'react';
import { catalogueContainerStyle, saveBtnStyle } from '../styles/sharedStyles';

export default function ChatPage() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  // Fetch clients from backend
  useEffect(() => {
    fetch('http://localhost:8080/customers')
      .then(res => res.json())
      .then(data => setClients(Array.isArray(data) ? data : []));
  }, []);

  // Filter and sort clients: PRO first, then by name, and search by name
  const filteredClients = clients
    .filter(client =>
      client.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      // PRO first
      if ((b.pro ? 1 : 0) - (a.pro ? 1 : 0) !== 0) {
        return (b.pro ? 1 : 0) - (a.pro ? 1 : 0);
      }
      // Then by name
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
                  <input
            type="text"
            placeholder="Search client"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{

              marginBottom: 12,
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 15
            }}
          />
      <h2 style={{ color: '#213254', marginBottom: 18 }}>Chat</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        minHeight: 400
      }}>
        {/* Client list */}
        <div style={{
          minWidth: 220,
          borderRight: '1px solid #e0e0e0',
          paddingRight: 18,
          maxHeight: 500,
          overflowY: 'auto'
        }}>

          {filteredClients.map(client => (
            <div
              key={client._id}
              style={{
                padding: '10px 8px',
                borderRadius: 8,
                background: selectedClient && selectedClient._id === client._id ? '#e6fbe6' : 'transparent',
                color: selectedClient && selectedClient._id === client._id ? '#1ca21c' : '#213254',
                fontWeight: selectedClient && selectedClient._id === client._id ? 700 : 500,
                cursor: 'pointer',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
              onClick={() => setSelectedClient(client)}
            >
              {client.name}
              {client.pro && (
                <span style={{
                  marginLeft: 6,
                  background: '#e6fbe6',
                  color: '#1ca21c',
                  fontWeight: 700,
                  fontSize: 12,
                  borderRadius: 6,
                  padding: '2px 8px'
                }}>
                  PRO
                </span>
              )}
            </div>
          ))}
        </div>
        {/* Chat area */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 300
        }}>
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
                maxHeight: 320,
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
