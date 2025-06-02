// Generate fake orders from user-uploaded CSV product rows

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const FAKE_CUSTOMERS = [
  // Active customers (with orders)
  { name: 'Alice Bakery', daysToPay: 14 },
  { name: 'Bob Cafe', daysToPay: 21 },
  { name: 'Charlie Restaurant', daysToPay: 7 },
  { name: 'Daisy Deli', daysToPay: 14 },
  { name: 'Eve Eatery', daysToPay: 21 },
  { name: 'Frank Foodhall', daysToPay: 7 },
  // Pending customers (no orders)
  { name: 'Pending Bistro', daysToPay: 14, status: 'pending' },
  { name: 'Waiting Bar', daysToPay: 21, status: 'pending' },
  { name: 'Future Foods', daysToPay: 7, status: 'pending' },
  // Archived customers (no orders)
  { name: 'Old Tavern', daysToPay: 14, status: 'archived' },
  
  { name: 'Closed Kitchen', daysToPay: 21, status: 'archived' }
];

const DAYS = [
  'Monday, 02 Jun',
  'Tuesday, 03 Jun',
  'Wednesday, 04 Jun',
  'Thursday, 05 Jun'
];

function generateOrderNumber(customerIdx, dayIdx) {
  // Unique order number per customer per day, always 3 digits
  return `ORD-${(100 + customerIdx * 10 + dayIdx).toString().padStart(3, '0')}`;
}

function randomPaidStatus() {
  // 40% paid, 40% unpaid, 20% pending (yellow)
  const r = Math.random();
  if (r < 0.4) return 'paid';
  if (r < 0.8) return 'unpaid';
  return 'pending';
}


export function getOrdersFromCatalogueRows(rows) {
  if (!Array.isArray(rows) || rows.length === 0 || !rows[0].name) {
    // Only return customers, no orders
    return { orders: [], customers: FAKE_CUSTOMERS, days: DAYS };
  }

  // For each customer, generate an order for each day with unique order number
  const orders = [];
  FAKE_CUSTOMERS.forEach((customer, customerIdx) => {
    // Only generate orders for customers without status or with status 'active'
    if (!customer.status || customer.status === 'active') {
      DAYS.forEach((day, dayIdx) => {
        // Pick 1-3 random products from catalogue for each order
        const products = [];
        const usedIndexes = new Set();
        const numProducts = Math.min(randomInt(1, 3), rows.length);
        while (products.length < numProducts) {
          const i = randomInt(0, rows.length - 1);
          if (!usedIndexes.has(i)) {
            usedIndexes.add(i);
            // Random quantity for each product
            const quantity = randomInt(1, 5);
            // Parse price from CSV (string to float)
            const price = parseFloat(rows[i].price) || 0;
            products.push({
              name: rows[i].name,
              code: rows[i].code,
              price,
              quantity,
              lineTotal: price * quantity
            });
          }
        }
        const paidStatus = randomPaidStatus();
        orders.push({
          orderNumber: generateOrderNumber(customerIdx + 1, dayIdx + 1),
          customerName: customer.name,
          products,
          day,
          invoiceTotal: products.reduce((sum, p) => sum + p.lineTotal, 0),
          paidStatus, // 'paid', 'unpaid', or 'pending'
          daysToPay: customer.daysToPay
        });
      });
    }
  });

  // All customers (active, pending, archived)
  const usedCustomers = FAKE_CUSTOMERS;

  return { orders, customers: usedCustomers, days: DAYS };
}
