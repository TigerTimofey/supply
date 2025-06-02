// Generate fake orders from user-uploaded CSV product rows

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const FAKE_CUSTOMERS = [
  { name: 'Alice Bakery' },
  { name: 'Bob Cafe' },
  { name: 'Charlie Restaurant' }
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

export function getOrdersFromCatalogueRows(rows) {
  if (!Array.isArray(rows) || rows.length === 0 || !rows[0].name) {
    return { orders: [], customers: [], days: DAYS };
  }

  // For each customer, generate an order for each day with unique order number
  const orders = [];
  FAKE_CUSTOMERS.forEach((customer, customerIdx) => {
    // Pick 1-3 random products from catalogue
    const products = [];
    const usedIndexes = new Set();
    const numProducts = Math.min(randomInt(1, 3), rows.length);
    while (products.length < numProducts) {
      const i = randomInt(0, rows.length - 1);
      if (!usedIndexes.has(i)) {
        usedIndexes.add(i);
        products.push({
          name: rows[i].name,
          code: rows[i].code
        });
      }
    }
    DAYS.forEach((day, dayIdx) => {
      orders.push({
        orderNumber: generateOrderNumber(customerIdx + 1, dayIdx + 1),
        customerName: customer.name,
        products,
        day
      });
    });
  });

  // Only include customers that have at least one product in their order
  const usedCustomers = FAKE_CUSTOMERS;

  return { orders, customers: usedCustomers, days: DAYS };
}
