const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const User = require('../models/user');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if username already exists
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
        const twoFactorSecret = speakeasy.generateSecret().base32;

        await User.create({ 
            username, 
            password: hashedPassword, 
            two_factor_secret: twoFactorSecret 
        });

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send(`Error registering user: ${error.message}`);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findByUsername(username);
        if (!user) return res.status(404).send('User not found');

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send('Invalid password');

        // Return a temporary token that requires 2FA verification
        const tempToken = jwt.sign(
            { id: user.id, twoFAVerified: false }, 
            process.env.JWT_SECRET, 
            { expiresIn: '5m' }
        );

        res.status(200).json({ 
            message: '2FA required', 
            tempToken 
        });
    } catch (error) {
        res.status(500).send('Error during login');
    }
};

module.exports = { signup, login };