const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const setup2FA = async (req, res) => {
    try {
        // Generate a secret key
        const secret = speakeasy.generateSecret({ length: 20 });
        
        // Save secret to user in database first
        await User.update2FASecret(req.user.id, secret.base32);
        
        // Generate a test token to verify the secret works
        const testToken = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        });
        
        console.log('Secret being used:', secret.base32);
        console.log('Test token:', testToken);
        
        // Create a simple otpauth URL
        const otpauthUrl = `otpauth://totp/SecureNodeAPI:${req.user.username}?secret=${secret.base32}&issuer=SecureNodeAPI`;
        
        // Generate QR code directly from the otpauth URL
        const imageUrl = await QRCode.toDataURL(otpauthUrl);
        
        // Generate another token to verify
        const verifyToken = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        });
        
        console.log('Verification token:', verifyToken);
        console.log('Tokens match:', testToken === verifyToken);
        
        res.json({
            secret: secret.base32,
            qrCode: imageUrl,
            testToken: testToken,
            verifyToken: verifyToken,
            otpauthUrl: otpauthUrl
        });
    } catch (error) {
        console.error('Setup 2FA error:', error);
        res.status(500).send('Error setting up 2FA');
    }
};

const verify2FA = async (req, res) => {
    try {
        const { token } = req.body;
        
        // Get user's secret from database
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');
        
        console.log('Verifying token:', token);
        console.log('User secret from DB:', user.two_factor_secret);
        
        // Generate current token for comparison
        const currentToken = speakeasy.totp({
            secret: user.two_factor_secret,
            encoding: 'base32'
        });
        
        console.log('Current valid token:', currentToken);
        
        // Verify token with a window of 1 (allows for slight time differences)
        const verified = speakeasy.totp.verify({
            secret: user.two_factor_secret,
            encoding: 'base32',
            token: token.toString(),
            window: 1
        });
        
        if (verified) {
            // Generate JWT token
            const jwtToken = jwt.sign(
                { id: user.id, twoFAVerified: true }, 
                process.env.JWT_SECRET, 
                { expiresIn: '10m' }
            );
            
            res.json({ 
                message: '2FA verification successful',
                token: jwtToken 
            });
        } else {
            console.error('Invalid 2FA token for user:', user.id);
            console.error('Expected token:', currentToken);
            console.error('Received token:', token);
            res.status(401).json({ 
                error: 'Invalid 2FA token',
                message: 'Please make sure you entered the correct code from your authenticator app',
                debug: {
                    expectedToken: currentToken,
                    receivedToken: token
                }
            });
        }
    } catch (error) {
        console.error('Verify 2FA error:', error);
        res.status(500).json({ 
            error: 'Error verifying 2FA token',
            message: error.message 
        });
    }
};

module.exports = { setup2FA, verify2FA };