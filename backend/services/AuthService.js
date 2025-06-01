const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/UserRepository');
require('dotenv').config();

class AuthService {
    async register(email, password) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) throw new Error('User already exists');
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.create({ email, password: hashedPassword });
        return { id: user._id, email: user.email };
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Invalid credentials');
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    }
}

module.exports = new AuthService();
