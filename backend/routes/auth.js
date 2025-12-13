const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// in-memory store for demo – replace with MongoDB / PostgreSQL
// signup
const users = []; // at top of file, outside route handlers

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const existing = users.find(u => u.email === email);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    users.push({ email, password: hash });  // must use key "email"
    res.status(201).json({ message: 'User created' });
});


// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login body:', req.body);

    const user = users.find(u => u.email === email);
    console.log('Found user:', user);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email }, 'SECRET_KEY');
    res.json({ token });
});

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization; // "Bearer <token>"
    if (!authHeader) return res.status(401).json({ message: 'No token' });

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, 'SECRET_KEY');
        req.user = payload; // { email }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// get current user profile
router.get('/profile', authMiddleware, (req, res) => {
    const user = users.find(u => u.email === req.user.email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ email: user.email });
});
module.exports = router;
