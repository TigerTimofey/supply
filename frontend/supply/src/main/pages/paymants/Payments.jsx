import React, { useState, useEffect } from 'react';
import {
  catalogueContainerStyle,
  saveBtnStyle,
  thStyle,
  tdStyle,
  searchInputStyle,
  dividerLineStyle,
  paymentsTableContainerStyle,
  paymentsTableStyle,
  paymentsTableRowStyle,
  paymentsTableNoDataStyle,
  paymentsTabBtnStyle,
  paymentsConnectBoxStyle,
  paymentsConnectTitleStyle,
  paymentsConnectBtnGroupStyle,
  paymentsSearchInputStyle,
  paymentsCSVBtnStyle
} from '../../styles/sharedStyles';
import { getOrdersFromCatalogueRows } from '../../fake/ordersDb';
import { STATEMENTS } from '../../fake/ordersDb';



function PaymentsTable({ payments }) {
  if (!payments.length) return <div style={paymentsTableNoDataStyle}>No payments found.</div>;
  return (
    <div style={paymentsTableContainerStyle}>
      <table style={paymentsTableStyle}>
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
            <tr key={i} style={paymentsTableRowStyle(i)}>
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
  if (!statements.length) return <div style={paymentsTableNoDataStyle}>No statements found.</div>;
  return (
    <div style={paymentsTableContainerStyle}>
      <table style={paymentsTableStyle}>
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
            <tr key={i} style={paymentsTableRowStyle(i)}>
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


  useEffect(() => {
    fetch('https://supply-sooty.vercel.app/customers')
      .then(res => res.json())
      .then(data => setCustomers(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    const catalogueRows = [
      { name: 'Product A', code: 'A1', price: 10 },
      { name: 'Product B', code: 'B2', price: 20 }
    ];
    const { orders: ORDERS } = getOrdersFromCatalogueRows(catalogueRows, customers);
    setOrders(ORDERS);
  }, [customers]);


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


  const filteredPayments = paymentsData.filter(p =>
    p.customerName.toLowerCase().includes(search.toLowerCase()) ||
    p.orderNumber.toLowerCase().includes(search.toLowerCase())
  );


  const filteredStatements = STATEMENTS.filter(s =>
    s.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
    s.timeRange.toLowerCase().includes(search.toLowerCase()) ||
    s.issuedOn.toLowerCase().includes(search.toLowerCase())
  );


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
      <div style={paymentsConnectBoxStyle}>
        <div style={paymentsConnectTitleStyle}>
          Connect accounting software to mark invoices as paid
        </div>
        <div style={paymentsConnectBtnGroupStyle}>
          <button style={saveBtnStyle}><span>Xero</span></button>
          <button style={saveBtnStyle}><span>SageOne</span></button>
          <button style={saveBtnStyle}><span>Quickbook</span></button>
        </div>
      </div>
      <div style={dividerLineStyle} />
      {tab === 'payments' && (
        <>
          <div style={paymentsSearchInputStyle}>
            <input
              type="text"
              placeholder="Search by customer or document number"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={searchInputStyle}
            />
            <button style={paymentsCSVBtnStyle} onClick={handleDownloadPaymentsCSV}>
              CSV
            </button>
          </div>
          <div style={dividerLineStyle} />
          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', gap: 16, marginBottom: 24 }}>
            <button
              style={paymentsTabBtnStyle(tab === 'payments')}
              onClick={() => setTab('payments')}
            >
              Payments
            </button>
            <button
              style={paymentsTabBtnStyle(tab === 'statements')}
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
          <div style={paymentsSearchInputStyle}>
            <input
              type="text"
              placeholder="Search by invoice number"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={searchInputStyle}
            />
            <button style={paymentsCSVBtnStyle} onClick={handleDownloadStatementsCSV}>
              CSV
            </button>
          </div>
          <div style={dividerLineStyle} />
          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', gap: 16, marginBottom: 24 }}>
            <button
              style={paymentsTabBtnStyle(tab === 'payments')}
              onClick={() => setTab('payments')}
            >
              Payments
            </button>
            <button
              style={paymentsTabBtnStyle(tab === 'statements')}
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
