import { useState, useEffect } from 'react';
import InviteCustomersModal from '../../components/InviteCustomersModal';
import {
  catalogueContainerStyle,
  saveBtnStyle,
  thStyle,
  tdStyle,
  customersMobileCardStyle,
  customersMobileNameStyle,
  customersMobileProStyle,
  customersMobileDashStyle,
  customersMobileStatStyle,
  customersMobileBtnArchiveStyle,
  customersMobileBtnRestoreStyle,
  customersOnboardBoxStyle,
  customersOnboardTitleStyle,
  customersOnboardSubtitleStyle,
  customersOnboardBtnGroupStyle,
  customersTabBtnStyle,
  customersTableRowStyle
} from '../../styles/sharedStyles';

function CustomersTable({ customers, onArchive, onRestore, status }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  if (!customers.length) return null;

  if (isMobile) {
    return (
      <div style={{ marginBottom: 32 }}>
        {customers.map((c, i) => (
          <div
            key={c.name}
            style={customersMobileCardStyle}
          >
            <div style={customersMobileNameStyle}>{c.name}</div>
            <div style={customersMobileProStyle}>
              {c.status === 'active' && c.pro ? (
                <span style={customersMobileProStyle}>PRO</span>
              ) : (
                <span style={customersMobileDashStyle}>—</span>
              )}
            </div>
            <div style={customersMobileStatStyle}><b>Orders this week:</b> {c.ordersThisWeek}</div>
            <div style={customersMobileStatStyle}><b>Orders past 12 weeks:</b> {c.orders12Weeks}</div>
            <div style={customersMobileStatStyle}><b>Trend products 12w:</b> {c.trendProducts}</div>
            <div style={customersMobileStatStyle}><b>Trend spend 12w:</b> {c.trendSpend}</div>
            <div style={customersMobileStatStyle}><b>Missing codes:</b> {c.missingCodes}</div>
            <div style={{ marginTop: 10 }}>
              {status === 'active' && (
                <button
                  style={customersMobileBtnArchiveStyle}
                  onClick={() => onArchive(c.name)}
                >
                  Archive
                </button>
              )}
              {status === 'archived' && (
                <button
                  style={customersMobileBtnRestoreStyle}
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
            <tr key={c.name} style={customersTableRowStyle(i)}>
              <td style={tdStyle}>{c.name}</td>
              <td style={tdStyle}>
                {(status === 'active' && c.pro) ? (
                  <span style={customersMobileProStyle}>PRO</span>
                ) : (
                  <span style={customersMobileDashStyle}>—</span>
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
                    style={customersMobileBtnArchiveStyle}
                    onClick={() => onArchive(c.name)}
                  >
                    Archive
                  </button>
                )}
                {status === 'archived' && (
                  <button
                    style={customersMobileBtnRestoreStyle}
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

  useEffect(() => {
    fetch('https://supply-sooty.vercel.app/customers')
      .then(res => res.json())
      .then(data => setCustomers(Array.isArray(data) ? data : []));
  }, []);

  const customersWithStats = customers.map((c, idx) => {
    const isActive = c.status === 'active';
    return {
      ...c,
      pro: isActive && idx % 2 === 0, 
      ordersThisWeek: isActive ? (idx === 0 ? 2 : idx === 2 ? 1 : 0) : 0,
      orders12Weeks: isActive ? (idx === 0 ? 18 : idx === 2 ? 7 : 0) : 0,
      trendProducts: isActive ? (idx === 0 ? '+12%' : idx === 2 ? '-8%' : '0%') : '0%',
      trendSpend: isActive ? (idx === 0 ? '+5%' : idx === 2 ? '-3%' : '0%') : '0%',
      missingCodes: idx === 1 ? 2 : idx === 2 ? 1 : 0
    };
  });

  const filteredCustomers = customersWithStats.filter(c => c.status === status);

  const handleArchive = async (name) => {
    const customer = customers.find(c => c.name === name);
    if (!customer) return;
    await fetch(`https://supply-sooty.vercel.app/customers/${customer._id}`, {
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

  const handleRestore = async (name) => {
    const customer = customers.find(c => c.name === name);
    if (!customer) return;
    await fetch(`https://supply-sooty.vercel.app/customers/${customer._id}`, {
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

  const supplierName = localStorage.getItem('supplierName') || '';
  const supplierId = localStorage.getItem('userId') || '';

  return (
    <div style={catalogueContainerStyle}>
      <div style={customersOnboardBoxStyle}>
        <div>
          <div style={customersOnboardTitleStyle}>
            Onboard your customers to see more orders on NOT A REKKI
          </div>
          <div style={customersOnboardSubtitleStyle}>
            it is completely free and means that you can manage all your orders in one place
          </div>
        </div>
        <div style={customersOnboardBtnGroupStyle}>
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
      <div style={{
        display: 'flex',
        gap: 15,
        marginBottom: 24,
        flexWrap: 'wrap',
        width: '100%'
      }}>
        <button
          style={customersTabBtnStyle(status === 'active')}
          onClick={() => setStatus('active')}
        >
          Active customers
        </button>
        <button
          style={customersTabBtnStyle(status === 'pending')}
          onClick={() => setStatus('pending')}
        >
          Pending invitations
        </button>
        <button
          style={customersTabBtnStyle(status === 'archived')}
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
