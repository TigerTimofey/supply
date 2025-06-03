import React, { useState, useEffect } from 'react';
import InviteCustomersModal from '../../components/InviteCustomersModal';
import { catalogueContainerStyle, saveBtnStyle, thStyle, tdStyle } from '../../styles/sharedStyles';


function CustomersTable({ customers, onArchive, onRestore, status }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  if (!customers.length) return null;

  if (isMobile) {
    return (
      <div style={{ marginBottom: 32 }}>
        {customers.map((c, i) => (
          <div
            key={c.name}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: 10,
              marginBottom: 18,
              padding: 16,
              background: '#f7fafd'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>
              {c.status === 'active' && c.pro ? (
                <span style={{ color: '#1ca21c', fontWeight: 700 }}>PRO</span>
              ) : (
                <span style={{ color: '#888' }}>—</span>
              )}
            </div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>
              <b>Orders this week:</b> {c.ordersThisWeek}
            </div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>
              <b>Orders past 12 weeks:</b> {c.orders12Weeks}
            </div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>
              <b>Trend products 12w:</b> {c.trendProducts}
            </div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>
              <b>Trend spend 12w:</b> {c.trendSpend}
            </div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>
              <b>Missing codes:</b> {c.missingCodes}
            </div>
            <div style={{ marginTop: 10 }}>
              {status === 'active' && (
                <button
                  style={{
                    ...saveBtnStyle,
                    background: '#f0f4f8',
                    color: '#e74c3c',
                    fontSize: 13,
                    padding: '6px 12px'
                  }}
                  onClick={() => onArchive(c.name)}
                >
                  Archive
                </button>
              )}
              {status === 'archived' && (
                <button
                  style={{
                    ...saveBtnStyle,
                    background: '#e6fbe6',
                    color: '#1ca21c',
                    fontSize: 13,
                    padding: '6px 12px'
                  }}
                  onClick={() => onRestore(c.name)}
                >
                  Restore
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop/tablet view
  return (
    <div style={{ marginBottom: 32 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', fontSize: 15 }}>
        <thead>
          <tr>
            <th style={thStyle}>
              <div className="sc-cpmLhU fmhCTh">
                <div className="sc-fjdhpX bwHvYO" title="">customers</div>
              </div>
            </th>
            <th style={thStyle}>
              <div className="sc-fjdhpX btNfCF" title="">PRO status</div>
            </th>
            <th style={thStyle}>
              <div className="sc-cpmLhU fmhCTh">
                <div className="sc-fjdhpX bwHvYO" title="">orders placed this week</div>
              </div>
            </th>
            <th style={thStyle}>
              <div className="sc-fjdhpX btNfCF" title="">orders placed in the past 12 weeks</div>
            </th>
            <th style={thStyle}>
              <div className="sc-fjdhpX btNfCF" title="">trend of products ordered over 12 weeks </div>
            </th>
            <th style={thStyle}>
              <div className="sc-fjdhpX btNfCF" title="">trend of spend over 12 weeks</div>
            </th>
            <th style={thStyle}>
              <div className="sc-cpmLhU fmhCTh">
                <div className="sc-fjdhpX bwHvYO" title="">products missing codes in product lists</div>
              </div>
            </th>
            <th style={thStyle}></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, i) => (
            <tr key={c.name} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafd' }}>
              <td style={tdStyle}>{c.name}</td>
              <td style={tdStyle}>
                {(status === 'active' && c.pro) ? (
                  <span style={{ color: '#1ca21c', fontWeight: 700 }}>PRO</span>
                ) : (
                  <span style={{ color: '#888' }}>—</span>
                )}
              </td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>{c.ordersThisWeek}</td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>{c.orders12Weeks}</td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>{c.trendProducts}</td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>{c.trendSpend}</td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>{c.missingCodes}</td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>
                {status === 'active' && (
                  <button
                    style={{
                      ...saveBtnStyle,
                      background: '#f0f4f8',
                      color: '#e74c3c',
                      fontSize: 13,
                      padding: '6px 12px'
                    }}
                    onClick={() => onArchive(c.name)}
                  >
                    Archive
                  </button>
                )}
                {status === 'archived' && (
                  <button
                    style={{
                      ...saveBtnStyle,
                      background: '#e6fbe6',
                      color: '#1ca21c',
                      fontSize: 13,
                      padding: '6px 12px'
                    }}
                    onClick={() => onRestore(c.name)}
                  >
                    Restore
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CustomersPage() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [status, setStatus] = useState('active');
  const [customers, setCustomers] = useState([]);

  // Fetch customers from backend
  useEffect(() => {
    fetch('http://localhost:8080/customers')
      .then(res => res.json())
      .then(data => setCustomers(Array.isArray(data) ? data : []));
  }, []);

  // Add fake stats for table (only for UI, not persisted)
  const customersWithStats = customers.map((c, idx) => {
    const isActive = c.status === 'active';
    return {
      ...c,
      pro: isActive && idx % 2 === 0, // Only active can be PRO
      ordersThisWeek: isActive ? (idx === 0 ? 2 : idx === 2 ? 1 : 0) : 0,
      orders12Weeks: isActive ? (idx === 0 ? 18 : idx === 2 ? 7 : 0) : 0,
      trendProducts: isActive ? (idx === 0 ? '+12%' : idx === 2 ? '-8%' : '0%') : '0%',
      trendSpend: isActive ? (idx === 0 ? '+5%' : idx === 2 ? '-3%' : '0%') : '0%',
      missingCodes: idx === 1 ? 2 : idx === 2 ? 1 : 0
    };
  });

  const filteredCustomers = customersWithStats.filter(c => c.status === status);

  // Archive customer (update in DB)
  const handleArchive = async (name) => {
    const customer = customers.find(c => c.name === name);
    if (!customer) return;
    await fetch(`http://localhost:8080/customers/${customer._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'archived' })
    });
    setCustomers(customers =>
      customers.map(c =>
        c._id === customer._id ? { ...c, status: 'archived' } : c
      )
    );
  };

  // Restore customer (update in DB)
  const handleRestore = async (name) => {
    const customer = customers.find(c => c.name === name);
    if (!customer) return;
    await fetch(`http://localhost:8080/customers/${customer._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'active' })
    });
    setCustomers(customers =>
      customers.map(c =>
        c._id === customer._id ? { ...c, status: 'active' } : c
      )
    );
  };

  // Get supplierName and supplierId from localStorage or context (fallback to empty)
  const supplierName = localStorage.getItem('supplierName') || '';
  const supplierId = localStorage.getItem('userId') || '';

  return (
    <div style={catalogueContainerStyle}>
      <div style={{
        background: '#f7fafd',
        border: '1.5px solid #61dafb',
        borderRadius: 10,
        padding: '18px 24px',
        marginBottom: 28,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10
      }}>
        <div>
          <div style={{ fontWeight: 700, color: '#213254', fontSize: 18, marginBottom: 2 }}>
            Onboard your customers to see more orders on NOT A REKKI
          </div>
          <div style={{ color: '#3e68bd', fontWeight: 600, fontSize: 15 }}>
            it is completely free and means that you can manage all your orders in one place
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
          <button
            style={{
              ...saveBtnStyle,
              minWidth: 160,
              fontSize: 16,
              padding: '10px 22px'
            }}
            onClick={() => setInviteModalOpen(true)}
          >
            Set up customer
          </button>
        </div>
      </div>
      <InviteCustomersModal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        supplierName={supplierName}
        supplierId={supplierId}
      />
      <h2 style={{ color: '#213254', marginBottom: 18 }}>Customers</h2>
      <div
        style={{
          display: 'flex',
          gap: 15,
          marginBottom: 24,
          flexWrap: 'wrap',
          width: '100%'
        }}
      >
        <button
          style={{
            ...saveBtnStyle,
            background: status === 'active' ? '#61dafb' : '#f0f4f8',
            color: status === 'active' ? '#213254' : '#888',
            flex: 1,
            minWidth: 120
          }}
          onClick={() => setStatus('active')}
        >
          Active customers
        </button>
        <button
          style={{
            ...saveBtnStyle,
            background: status === 'pending' ? '#61dafb' : '#f0f4f8',
            color: status === 'pending' ? '#213254' : '#888',
            flex: 1,
            minWidth: 120
          }}
          onClick={() => setStatus('pending')}
        >
          Pending invitations
        </button>
        <button
          style={{
            ...saveBtnStyle,
            background: status === 'archived' ? '#61dafb' : '#f0f4f8',
            color: status === 'archived' ? '#213254' : '#888',
            flex: 1,
            minWidth: 120
          }}
          onClick={() => setStatus('archived')}
        >
          Archived customers
        </button>
      </div>
      <CustomersTable
        customers={filteredCustomers}
        onArchive={handleArchive}
        onRestore={handleRestore}
        status={status}
      />
    </div>
  );
}
