const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users (excluding passwords)
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user by id (excluding password)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { password: 0 });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Invalid user id' });
    }
});

// Delete all users
router.delete('/', async (req, res) => {
    try {
        const result = await User.deleteMany({});
        res.json({ deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user by id
router.delete('/:id', async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ error: 'User not found' });
        res.json({ message: `User deleted`, id: req.params.id });
    } catch (err) {
        res.status(400).json({ error: 'Invalid user id' });
    }
});

module.exports = router;
