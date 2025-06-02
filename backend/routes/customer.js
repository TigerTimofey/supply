const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get customer by id
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const { name, daysToPay, status } = req.body;
    const customer = new Customer({ name, daysToPay, status });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Bulk insert customers
router.post('/bulk', async (req, res) => {
  try {
    const customers = req.body.customers;
    if (!Array.isArray(customers) || customers.length === 0) {
      return res.status(400).json({ error: 'No customers provided' });
    }
    const result = await Customer.insertMany(customers);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update customer by id
router.patch('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete customer by id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Customer.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: `Customer deleted`, id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: 'Invalid customer id' });
  }
});

module.exports = router;
