// Generate fake orders from user-uploaded CSV product rows

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

// Accept customers as argument, fallback to empty array
export function getOrdersFromCatalogueRows(rows, customers = []) {
  if (!Array.isArray(rows) || rows.length === 0 || !rows[0].name) {
    return { orders: [], customers, days: DAYS };
  }

  // For each customer, generate an order for each day with unique order number
  const orders = [];
  customers.forEach((customer, customerIdx) => {
    // Only generate orders for customers with status 'active' or no status
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
          paidStatus,
          daysToPay: customer.daysToPay
        });
      });
    }
  });

  return { orders, customers, days: DAYS };
}
