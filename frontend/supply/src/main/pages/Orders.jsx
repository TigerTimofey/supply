import React, { useState } from 'react';
import { getOrdersFromCatalogueRows } from '../fake/ordersDb';
import {
  catalogueContainerStyle,
  searchInputStyle,
  tableStyle,
  thStyle,
  tdStyle
} from '../styles/sharedStyles';

export default function Orders({ catalogueRows }) {
  const [search, setSearch] = useState('');

  // Get orders/customers/days from catalogueRows (uploaded CSV)
  const { orders: ORDERS, customers: CUSTOMERS, days: DAYS } = getOrdersFromCatalogueRows(catalogueRows);

  // Group orders by customer
  const customerOrders = {};
  ORDERS.forEach(order => {
    if (!customerOrders[order.customerName]) customerOrders[order.customerName] = [];
    customerOrders[order.customerName].push(order);
  });

  // Filter logic: search by order number, customer, or product details
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
      <h2 style={{ color: '#213254', marginBottom: 18 }}>Orders</h2>
      <div style={{ marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by order number, customer or product"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={searchInputStyle}
        />
      </div>
      <div style={{ marginBottom: 24, color: '#888', fontWeight: 500 }}>
        <span>{CUSTOMERS.length} customers, {ORDERS.length} orders</span>
      </div>
      <div style={{ marginBottom: 18 }}>
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
                  onboard your customers to see more orders on NOT A REKKI<br />
                  <span style={{ color: '#3e68bd', fontWeight: 600 }}>
                    it is completely free and means that you can manage all your orders in one place
                  </span>
                </td>
              </tr>
            ) : (
              filteredCustomers.map(customer => {
                const orders = customerOrders[customer];
                // All orders for this customer, one per day
                return (
                  <tr key={customer}>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>
                      <div>{customer}</div>
                      <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>
                        {orders[0].products.map(p => p.name).join(', ')}
                      </div>
                    </td>
                    {DAYS.map((day) => {
                      const order = orders.find(o => o.day === day);
                      return (
                        <td key={day} style={{ ...tdStyle, textAlign: 'center' }}>
                          <span style={{ fontWeight: 600, color: '#3e68bd' }}>#{order?.orderNumber}</span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
