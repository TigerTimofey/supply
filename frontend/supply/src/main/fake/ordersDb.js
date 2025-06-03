
export const STATEMENTS = [
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
  return `ORD-${(100 + customerIdx * 10 + dayIdx).toString().padStart(3, '0')}`;
}

function randomPaidStatus() {
  const r = Math.random();
  if (r < 0.4) return 'paid';
  if (r < 0.8) return 'unpaid';
  return 'pending';
}

export function getOrdersFromCatalogueRows(rows, customers = []) {
  if (!Array.isArray(rows) || rows.length === 0 || !rows[0].name) {
    return { orders: [], customers, days: DAYS };
  }

  const orders = [];
  customers.forEach((customer, customerIdx) => {
    if (!customer.status || customer.status === 'active') {
      DAYS.forEach((day, dayIdx) => {
        const products = [];
        const usedIndexes = new Set();
        const numProducts = Math.min(randomInt(1, 3), rows.length);
        while (products.length < numProducts) {
          const i = randomInt(0, rows.length - 1);
          if (!usedIndexes.has(i)) {
            usedIndexes.add(i);
            const quantity = randomInt(1, 5);
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
