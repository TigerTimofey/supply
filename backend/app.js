const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const customerRoutes = require('./routes/customer');

const app = express();

// Allow all CORS requests (including preflight)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/customers', customerRoutes);
app.get('/', (req, res) => {
    res.send('API is running');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.error(err));
