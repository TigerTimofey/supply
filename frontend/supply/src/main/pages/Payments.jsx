import React, { useState, useEffect } from 'react';
import { catalogueContainerStyle, saveBtnStyle, thStyle, tdStyle, searchInputStyle, dividerLineStyle } from '../styles/sharedStyles';
import { getOrdersFromCatalogueRows } from '../fake/ordersDb';

// Fake data for demonstration
const PAYMENTS = [
  {
    customer: 'Alice Bakery',
    account: 'GB12BARC12345612345678',
    docType: 'Invoice',
    docNumber: 'INV-001',
    receivedOn: '2024-06-01',
    docDate: '2024-05-31',
    total: 120.50,
    chargeStatus: 'Charged',
    paymentMethod: 'Bank Transfer',
    payoutStatus: 'Paid',
    expectedPayout: '2024-06-05'
  },
  {
    customer: 'Bob Cafe',
    account: 'GB12BARC12345687654321',
    docType: 'Credit Note',
    docNumber: 'CN-002',
    receivedOn: '2024-06-02',
    docDate: '2024-06-01',
    total: -30.00,
    chargeStatus: 'Refunded',
    paymentMethod: 'Card',
    payoutStatus: 'Pending',
    expectedPayout: '2024-06-07'
  }
];

const STATEMENTS = [
  {
    issuedOn: '2024-06-01',
    invoiceNumber: 'INV-001',
    timeRange: 'May 2024',
    vat: 20.10,
    net: 100.40,
    gross: 120.50
  },
  {
    issuedOn: '2024-06-02',
    invoiceNumber: 'INV-002',
    timeRange: 'May 2024',
    vat: 18.00,
    net: 90.00,
    gross: 108.00
  }
];

function PaymentsTable({ payments }) {
  if (!payments.length) return <div style={{ color: '#888', padding: 24 }}>No payments found.</div>;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', fontSize: 15 }}>
        <thead>
          <tr>
            <th style={thStyle}>Customer name</th>
            <th style={thStyle}>Document type</th>
            <th style={thStyle}>Document number</th>
            <th style={thStyle}>Document received on</th>
            <th style={thStyle}>Document date</th>
            <th style={thStyle}>Total</th>
            <th style={thStyle}>Charge status</th>
            <th style={thStyle}>Payment method</th>
            <th style={thStyle}>Payout status</th>
            <th style={thStyle}>Expected payout</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafd' }}>
              <td style={tdStyle}>{p.customerName}</td>
              <td style={tdStyle}>{p.docType}</td>
              <td style={tdStyle}>{p.orderNumber}</td>
              <td style={tdStyle}>{p.receivedOn}</td>
              <td style={tdStyle}>{p.docDate}</td>
              <td style={tdStyle}>{p.invoiceTotal}</td>
              <td style={tdStyle}>{p.chargeStatus}</td>
              <td style={tdStyle}>{p.paymentMethod}</td>
              <td style={tdStyle}>{p.payoutStatus}</td>
              <td style={tdStyle}>{p.expectedPayout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatementsTable({ statements }) {
  if (!statements.length) return <div style={{ color: '#888', padding: 24 }}>No statements found.</div>;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', fontSize: 15 }}>
        <thead>
          <tr>
            <th style={thStyle}>Issued on</th>
            <th style={thStyle}>Invoice number</th>
            <th style={thStyle}>Time range</th>
            <th style={thStyle}>VAT</th>
            <th style={thStyle}>Net</th>
            <th style={thStyle}>Gross</th>
          </tr>
        </thead>
        <tbody>
          {statements.map((s, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafd' }}>
              <td style={tdStyle}>{s.issuedOn}</td>
              <td style={tdStyle}>{s.invoiceNumber}</td>
              <td style={tdStyle}>{s.timeRange}</td>
              <td style={tdStyle}>{s.vat}</td>
              <td style={tdStyle}>{s.net}</td>
              <td style={tdStyle}>{s.gross}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PaymentsPage() {
  const [tab, setTab] = useState('payments');
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Fetch customers and orders from backend
  useEffect(() => {
    fetch('http://localhost:8080/customers')
      .then(res => res.json())
      .then(data => setCustomers(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    // Fetch catalogueRows from localStorage or context if needed
    // For demo, use a fake row to generate orders
    const catalogueRows = [
      { name: 'Product A', code: 'A1', price: 10 },
      { name: 'Product B', code: 'B2', price: 20 }
    ];
    const { orders: ORDERS } = getOrdersFromCatalogueRows(catalogueRows, customers);
    setOrders(ORDERS);
  }, [customers]);

  // Map orders to payments data
  const paymentsData = orders.map(order => ({
    customerName: order.customerName,
    docType: 'Invoice',
    orderNumber: order.orderNumber,
    receivedOn: order.day,
    docDate: order.day,
    invoiceTotal: order.invoiceTotal,
    chargeStatus: order.paidStatus === 'paid' ? 'Charged' : order.paidStatus === 'unpaid' ? 'Unpaid' : 'Pending',
    paymentMethod: 'Bank Transfer',
    payoutStatus: order.paidStatus === 'paid' ? 'Paid' : 'Pending',
    expectedPayout: order.paidStatus === 'paid' ? order.day : ''
  }));

  // Filter payments by customer name, document number, etc.
  const filteredPayments = paymentsData.filter(p =>
    p.customerName.toLowerCase().includes(search.toLowerCase()) ||
    p.orderNumber.toLowerCase().includes(search.toLowerCase())
  );

  // Filter statements by invoice number, time range, or issuedOn
  const filteredStatements = STATEMENTS.filter(s =>
    s.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
    s.timeRange.toLowerCase().includes(search.toLowerCase()) ||
    s.issuedOn.toLowerCase().includes(search.toLowerCase())
  );

  // Download as CSV for payments
  const handleDownloadPaymentsCSV = () => {
    const headers = [
      'Customer name', 'Document type', 'Document number',
      'Document received on', 'Document date', 'Total', 'Charge status',
      'Payment method', 'Payout status', 'Expected payout'
    ];
    const rows = filteredPayments.map(p =>
      [p.customerName, p.docType, p.orderNumber, p.receivedOn, p.docDate, p.invoiceTotal, p.chargeStatus, p.paymentMethod, p.payoutStatus, p.expectedPayout]
    );
    const csv = [headers, ...rows].map(r => r.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // CSV for statements
  const handleDownloadStatementsCSV = () => {
    const headers = [
      'Issued on', 'Invoice number', 'Time range', 'VAT', 'Net', 'Gross'
    ];
    const rows = filteredStatements.map(s =>
      [s.issuedOn, s.invoiceNumber, s.timeRange, s.vat, s.net, s.gross]
    );
    const csv = [headers, ...rows].map(r => r.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'statements.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={catalogueContainerStyle}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 600, color: '#213254', paddingRight: 12, paddingBottom: 18, }}>
          Connect accounting software to mark invoices as paid
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          <button style={{ ...saveBtnStyle, marginRight: 4 }}><span>Xero</span></button>
          <button style={{ ...saveBtnStyle, marginRight: 4 }}><span>SageOne</span></button>
          <button style={{ ...saveBtnStyle, marginRight: 4 }}><span>Quickbook</span></button>
        </div>
      </div>          <div style={dividerLineStyle} />
      {tab === 'payments' && (
        <>
          <div style={{ display: 'flex', gap: 16, marginBottom: 18, alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search by customer or document number"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{...searchInputStyle, width: '100%', textAlign:'center'}}
            />
            <button style={{ ...saveBtnStyle, fontSize: 15 }} onClick={handleDownloadPaymentsCSV}>
             CSV
            </button>
          </div>          <div style={dividerLineStyle} />
          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', gap: 16, marginBottom: 24 }}>
            <button
              style={{
                ...saveBtnStyle,
                background: tab === 'payments' ? '#61dafb' : '#f0f4f8',
                color: tab === 'payments' ? '#213254' : '#888'
              }}
              onClick={() => setTab('payments')}
            >
              Payments
            </button>
            <button
              style={{
                ...saveBtnStyle,
                background: tab === 'statements' ? '#61dafb' : '#f0f4f8',
                color: tab === 'statements' ? '#213254' : '#888'
              }}
              onClick={() => setTab('statements')}
            >
              Statements
            </button>
          </div>
          <PaymentsTable payments={filteredPayments} />
        </>
      )}

      {tab === 'statements' && (
        <>
          <div style={{ display: 'flex', gap: 16, marginBottom: 18, alignItems: 'center',}}>
            <input
              type="text"
              placeholder="Search by invoice number"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{...searchInputStyle, width: '100%', textAlign:'center'}}
            />
            <button style={{ ...saveBtnStyle, fontSize: 15 }} onClick={handleDownloadStatementsCSV}>
              CSV
            </button>
          </div>
          <div style={dividerLineStyle} />
          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', gap: 16, marginBottom: 24 }}>
            <button
              style={{
                ...saveBtnStyle,
                background: tab === 'payments' ? '#61dafb' : '#f0f4f8',
                color: tab === 'payments' ? '#213254' : '#888'
              }}
              onClick={() => setTab('payments')}
            >
              Payments
            </button>
            <button
              style={{
                ...saveBtnStyle,
                background: tab === 'statements' ? '#61dafb' : '#f0f4f8',
                color: tab === 'statements' ? '#213254' : '#888'
              }}
              onClick={() => setTab('statements')}
            >
              Statements
            </button>
          </div>
          <StatementsTable statements={filteredStatements} />
        </>
      )}
    </div>
  );
}
