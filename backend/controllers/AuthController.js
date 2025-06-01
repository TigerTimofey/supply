const authService = require('../services/AuthService');

class AuthController {
    async register(req, res) {
        try {
            const { email, password, accountEmail, salesEmail, origin, productCategories } = req.body;
            const user = await authService.register({
                email,
                password,
                accountEmail,
                salesEmail,
                origin,
                productCategories
            });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = new AuthController();
