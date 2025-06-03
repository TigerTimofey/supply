import { useState, useEffect } from 'react';
import { getOrdersFromCatalogueRows } from '../../fake/ordersDb';
import {
  catalogueContainerStyle,
  searchInputStyle,
  tableStyle,
  thStyle,
  tdStyle,
  modalOverlayStyle,
  modalStyle,
  closeBtnStyle,
  saveBtnStyle,
  ordersOnboardBannerStyle,
  ordersOnboardBannerTitleStyle,
  ordersOnboardBannerSubtitleStyle,
  ordersOnboardBannerBtnStyle,
  ordersMobileCustomerCardStyle,
  ordersMobileCustomerNameStyle,
  ordersMobileCustomerDaysStyle,
  ordersMobileDayRowStyle,
  ordersMobileDayCellStyle,
  ordersMobileDayLabelStyle,
  ordersMobileDayOrderStyle,
  ordersMobileDayEmptyStyle,
  ordersNoCustomersStyle,
  ordersNoCustomersSubtitleStyle
} from '../../styles/sharedStyles';
import InviteCustomersModal from '../../components/InviteCustomersModal';


function OrderModal({ open, order, onClose }) {
  if (!open || !order) return null;


  const products = order.products.map(p => {

    const price = typeof p.price === 'number'
      ? p.price
      : parseFloat(p.price) || 0;
    const quantity = typeof p.quantity === 'number'
      ? p.quantity
      : (p.quantity ? parseInt(p.quantity, 10) : 1);
    const lineTotal = typeof p.lineTotal === 'number'
      ? p.lineTotal
      : (price * quantity);
    return { ...p, price, quantity, lineTotal };
  });
  const invoiceTotal = products.reduce((sum, p) => sum + p.lineTotal, 0);

  return (
    <div style={modalOverlayStyle()}>
      <div
        style={{
          ...modalStyle,
          maxWidth: 600,
          width: '95vw',
          minHeight: 0,
          padding: 32,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          position: 'relative'
        }}
      >
        <button onClick={onClose} style={closeBtnStyle} aria-label="Close">×</button>
        <h2 style={{ color: '#213254', marginBottom: 18, fontWeight: 900, fontSize: 28, alignSelf: 'center', width: '100%', textAlign: 'center' }}>
          Order #{order.orderNumber}
        </h2>
        <br />  <br />
        <div style={{ marginBottom: 14, fontSize: 17 }}>
          <b>Customer:</b> {order.customerName}
        </div>
        <div style={{ marginBottom: 18, fontSize: 17 }}>
          <b>Date:</b> {order.day}
        </div>
        <div style={{ marginBottom: 18, fontSize: 17 }}>
          <b>Status:</b>{' '}
          <span style={{
            color: order.paidStatus === 'paid'
              ? '#1ca21c'
              : order.paidStatus === 'unpaid'
                ? '#e74c3c'
                : '#e6b800',
            fontWeight: 700
          }}>
            {order.paidStatus === 'paid'
              ? 'Paid'
              : order.paidStatus === 'unpaid'
                ? 'Unpaid'
                : 'Pending'}
          </span>
        </div>
        <div style={{ marginBottom: 18, fontSize: 17 }}>
          <b>Days to pay:</b> {order.daysToPay}
        </div>
        <div style={{ width: '100%' }}>
          <b style={{ fontSize: 17 }}>Products:</b>
          <br />  <br />
          <table style={{ width: '100%', marginTop: 10, fontSize: 16, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #e0e0e0' }}>Name</th>
                <th style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #e0e0e0' }}>Qty</th>
                <th style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #e0e0e0' }}>Price</th>
                <th style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #e0e0e0' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>{p.name}</td>
                  <td style={{ padding: 8, textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}>{p.quantity}</td>
                  <td style={{ padding: 8, textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}>{Number.isInteger(p.price) ? p.price : p.price.toFixed(0)}</td>
                  <td style={{ padding: 8, textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}>{Number.isInteger(p.lineTotal) ? p.lineTotal : p.lineTotal.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{
          marginTop: 24,
          fontWeight: 700,
          fontSize: 19,
          position: 'absolute',
          right: 32,
          bottom: 32,
          color: '#213254'
        }}>
          Invoice Total: {Number.isInteger(invoiceTotal) ? invoiceTotal : invoiceTotal.toFixed(0)} €
        </div>
      </div>
    </div>
  );
}

export default function Orders({ catalogueRows }) {
  const [search, setSearch] = useState('');
  const [modalOrder, setModalOrder] = useState(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 700 : false
  );

  useEffect(() => {
    fetch('https://supply-sooty.vercel.app/customers')
      .then(res => res.json())
      .then(data => setCustomers(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 700);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { orders: ORDERS, customers: CUSTOMERS, days: DAYS } = getOrdersFromCatalogueRows(catalogueRows, customers);

  const supplierName = localStorage.getItem('supplierName') || '';
  const supplierId = localStorage.getItem('userId') || '';

  const customerDaysToPay = {};
  ORDERS.forEach(order => {
    if (order.customerName && order.daysToPay && customerDaysToPay[order.customerName] === undefined) {
      customerDaysToPay[order.customerName] = order.daysToPay;
    }
  });

  const customerOrders = {};
  ORDERS.forEach(order => {
    let paidStatus = order.paidStatus;
    let includeOrder = true;
    if (order.customerName === 'Alice Bakery') {
      paidStatus = 'paid';
    } else if (order.customerName === 'Bob Cafe') {
      if (order.day === DAYS[0] || order.day === DAYS[1]) {
        paidStatus = 'unpaid';
      } else {
        includeOrder = false;
      }
    } else if (order.customerName === 'Charlie Restaurant') {
      if (order.day === DAYS[0]) {
        paidStatus = 'unpaid';
      } else if (order.day === DAYS[DAYS.length - 1]) {
        paidStatus = 'pending';
      } else {
        paidStatus = 'paid';
      }
    } else if (
      order.customerName === 'Daisy Deli' ||
      order.customerName === 'Eve Eatery' ||
      order.customerName === 'Frank Foodhall'
    ) {
      paidStatus = 'paid';
    } else if (order.customerName === 'Grace Grocery') {
      includeOrder = false;
    }
    if (includeOrder) {
      if (!customerOrders[order.customerName]) customerOrders[order.customerName] = [];
      customerOrders[order.customerName].push({
        ...order,
        paidStatus,
        daysToPay: customerDaysToPay[order.customerName]
      });
    }
  });

  Object.keys(customerDaysToPay).forEach(customer => {
    if (!customerOrders[customer]) customerOrders[customer] = [];
  });

  const filteredCustomers = Object.keys(customerOrders).filter(customer =>
    customer.toLowerCase().includes(search.toLowerCase()) ||
    customerOrders[customer].some(order =>
      order.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      order.products?.some(p =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.code?.toLowerCase().includes(search.toLowerCase())
      )
    )
  );

  return (
    <div style={catalogueContainerStyle}>

      <div style={ordersOnboardBannerStyle(isMobile)}>
        <div>
          <div style={ordersOnboardBannerTitleStyle}>
            {isMobile
              ? 'Onboard your customers to see more orders on NOT A REKKI'
              : 'Onboard your customers to see more orders on REKKI'}
          </div>
          {!isMobile && (
            <div style={ordersOnboardBannerSubtitleStyle}>
              it is completely free and means that you can manage all your orders in one place
            </div>
          )}
        </div>
        <button
          style={{ ...saveBtnStyle, ...ordersOnboardBannerBtnStyle(isMobile) }}
          onClick={() => setInviteModalOpen(true)}
        >
          Set up customer
        </button>
      </div>
      <InviteCustomersModal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        supplierName={supplierName}
        supplierId={supplierId}
      />
      <h2 style={{ color: '#213254', marginBottom: 18 }}>Orders</h2>
      <div style={{ marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={searchInputStyle}
        />
      </div>
      <div style={{ marginBottom: 24, color: '#888', fontWeight: 500 }}>
        <span>{CUSTOMERS.length} customers, {ORDERS.length} orders</span>
      </div>
      <div style={{ marginBottom: 18 }}>
        {!isMobile ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>customers</th>
                {DAYS && DAYS.map(day => (
                  <th key={day} style={thStyle}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={DAYS ? DAYS.length + 1 : 5} style={{ color: '#888', padding: 24, textAlign: 'center' }}>
                    Onboard your customers to see more orders on NOT A REKKI<br />
                    <span style={{ color: '#3e68bd', fontWeight: 600 }}>
                      it is completely free and means that you can manage all your orders in one place
                    </span>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(customer => {
                  const orders = customerOrders[customer];
                  const daysToPay = customerDaysToPay[customer];
                  return (
                    <tr key={customer}>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>
                        {customer}
                        <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                          {daysToPay ? `${daysToPay} days to pay` : ''}
                        </div>
                      </td>
                      {DAYS.map((day, idx) => {
                        const order = orders.find(o => o.day === day);
                        let bg, color;
                        if (!order) {

                          return (
                            <td key={day} style={{ ...tdStyle, background: '#f7fafd' }} />
                          );
                        }
                        if (order.paidStatus === 'paid') {
                          bg = '#e6fbe6';
                          color = '#1ca21c';
                        } else if (order.paidStatus === 'unpaid') {
                          bg = '#ffeaea';
                          color = '#e74c3c';
                        } else if (order.paidStatus === 'pending') {
                          bg = '#fffbe6';
                          color = '#e6b800';
                        } else {
                          bg = undefined;
                          color = '#3e68bd';
                        }
                        return (
                          <td
                            key={day}
                            style={{
                              ...tdStyle,
                              textAlign: 'center',
                              cursor: 'pointer',
                              background: bg
                            }}
                            onClick={() => order && setModalOrder(order)}
                            title={`View order details (${daysToPay} days to pay)`}
                          >
                            <span style={{
                              fontWeight: 600,
                              color
                            }}>
                              #{order?.orderNumber}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        ) : (
          <div>
            {filteredCustomers.length === 0 ? (
              <div style={ordersNoCustomersStyle}>
                Onboard your customers to see more orders on NOT A REKKI<br />
                <span style={ordersNoCustomersSubtitleStyle}>
                  it is completely free and means that you can manage all your orders in one place
                </span>
              </div>
            ) : (
              filteredCustomers.map(customer => {
                const orders = customerOrders[customer];
                const daysToPay = customerDaysToPay[customer];
                return (
                  <div key={customer} style={ordersMobileCustomerCardStyle}>
                    <div style={ordersMobileCustomerNameStyle}>{customer}</div>
                    <div style={ordersMobileCustomerDaysStyle}>
                      {daysToPay ? `${daysToPay} days to pay` : ''}
                    </div>
                    <div style={ordersMobileDayRowStyle}>
                      {DAYS.map((day, idx) => {
                        const order = orders.find(o => o.day === day);
                        let bg, color;
                        if (!order) {
                          return (
                            <div
                              key={day}
                              style={ordersMobileDayEmptyStyle}
                            />
                          );
                        }
                        if (order.paidStatus === 'paid') {
                          bg = '#e6fbe6';
                          color = '#1ca21c';
                        } else if (order.paidStatus === 'unpaid') {
                          bg = '#ffeaea';
                          color = '#e74c3c';
                        } else if (order.paidStatus === 'pending') {
                          bg = '#fffbe6';
                          color = '#e6b800';
                        } else {
                          bg = '#fff';
                          color = '#3e68bd';
                        }
                        return (
                          <div
                            key={day}
                            style={ordersMobileDayCellStyle(bg)}
                            onClick={() => order && setModalOrder(order)}
                            title={`View order details (${daysToPay} days to pay)`}
                          >
                            <span style={ordersMobileDayLabelStyle}>{day}</span>
                            <span style={ordersMobileDayOrderStyle(color)}>
                              #{order?.orderNumber}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      <OrderModal open={!!modalOrder} order={modalOrder} onClose={() => setModalOrder(null)} />
    </div>
  );
}
