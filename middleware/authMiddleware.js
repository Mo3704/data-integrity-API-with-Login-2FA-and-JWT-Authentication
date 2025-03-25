const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token.' });

        // For 2FA setup and verify endpoints, allow access with unverified token
        if (req.path === '/setup' || req.path === '/verify') {
            req.user = user;
            return next();
        }

        // For all other routes, require twoFAVerified: true
        if (!user.twoFAVerified) {
            return res.status(403).json({ error: '2FA verification required' });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;