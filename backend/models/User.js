const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountEmail: { type: String },
    salesEmail: { type: String },  
    supplierName: { type: String },
    origin: { type: String },       
    productCategories: [{ type: String }],
    catalogueCsv: { type: String },
    catalogueCsvName: { type: String },
    catalogueHistory: [{
        date: { type: Date, default: Date.now },
        action: { type: String, enum: ['added', 'removed', 'updated'], required: true },
        fileName: { type: String },
        csv: { type: String }
    }]
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
