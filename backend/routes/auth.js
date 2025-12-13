const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// In‑memory users (for demo only – replace with DB later)
const users = [];

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const existing = users.find(u => u.email === email);
        if (existing) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = { id: Date.now().toString(), name, email, password: hashed };
        users.push(user);

        return res.status(201).json({ message: 'User created' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'dev_secret_key',
            { expiresIn: '6h' }
        );

        return res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
