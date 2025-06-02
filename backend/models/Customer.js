const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  daysToPay: { type: Number, default: 14 },
  status: { type: String, enum: ['active', 'pending', 'archived'], default: 'active' }
}, { collection: 'customers' });

module.exports = mongoose.model('Customer', customerSchema);
