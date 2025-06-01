const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountEmail: { type: String },
    salesEmail: { type: String },  
    origin: { type: String },       
    productCategories: [{ type: String }] 
}, { collection: 'users' }); // explicitly set collection name

module.exports = mongoose.model('User', userSchema);
