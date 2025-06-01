const User = require('../models/User');

class UserRepository {
    async findByEmail(email) {
        return User.findOne({ email });
    }

    async create(userData) {
        const user = new User(userData);
        return user.save();
    }

    async updateCatalogueCsv(userId, csvString, csvName) {
        return User.findByIdAndUpdate(
            userId,
            { catalogueCsv: csvString, catalogueCsvName: csvName },
            { new: true }
        );
    }

    async getById(userId) {
        return User.findById(userId);
    }
}

module.exports = new UserRepository();
