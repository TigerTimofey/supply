const express = require('express');
const router = express.Router();
const userRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // <-- Add this import

// JWT authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Use the imported User model
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get user by id (for fetching catalogueCsv)
router.get('/:id', async (req, res) => {
    try {
        const user = await userRepository.getById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const { password, ...userData } = user.toObject();
        res.json(userData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Save catalogue CSV for user
router.post('/:id/catalogue', async (req, res) => {
    try {
        const { csv, csvName } = req.body;
        const user = await userRepository.updateCatalogueCsv(req.params.id, csv, csvName);
        if (!user) return res.status(404).json({ error: 'User not found' });
        // Add to history
        await userRepository.addCatalogueHistory(req.params.id, {
            action: 'added',
            fileName: csvName,
            csv
        });
        const { password, ...userData } = user.toObject();
        res.json(userData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Remove catalogue CSV for user (PATCH and PUT)
router.patch('/:id/catalogue', async (req, res) => {
    try {
        const user = await userRepository.updateCatalogueCsv(req.params.id, '', '');
        if (!user) return res.status(404).json({ error: 'User not found' });
        // Add to history
        await userRepository.addCatalogueHistory(req.params.id, {
            action: 'removed',
            fileName: user.catalogueCsvName,
            csv: ''
        });
        const { password, ...userData } = user.toObject();
        res.json(userData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.put('/:id/catalogue', async (req, res) => {
    try {
        const user = await userRepository.updateCatalogueCsv(req.params.id, '', '');
        if (!user) return res.status(404).json({ error: 'User not found' });
        // Add to history
        await userRepository.addCatalogueHistory(req.params.id, {
            action: 'removed',
            fileName: user.catalogueCsvName,
            csv: ''
        });
        const { password, ...userData } = user.toObject();
        res.json(userData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get catalogue history for user
router.get('/:id/catalogue/history', async (req, res) => {
    try {
        const history = await userRepository.getCatalogueHistory(req.params.id);
        res.json(history);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Clear all catalogue history for user
router.delete('/:id/catalogue/history', async (req, res) => {
    try {
        const user = await userRepository.getById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        user.catalogueHistory = [];
        await user.save();
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete all users
router.delete('/', async (req, res) => {
    try {
        await User.deleteMany(); // Use the imported User model
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
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

// Patch (update) user by id (protected)
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        // Exclude password updates here for security, unless you handle hashing
        const updateData = { ...req.body };
        delete updateData.password;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, projection: { password: 0 } }
        );
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Invalid user id or update data' });
    }
});

// Replace (put) user by id (full update, protected)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, overwrite: true, projection: { password: 0 } }
        );
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Invalid user id or update data' });
    }
});


module.exports = router;
