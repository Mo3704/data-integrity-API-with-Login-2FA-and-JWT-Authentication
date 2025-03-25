const express = require('express');
const router = express.Router();
const twoFAController = require('../controllers/twoFAController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/setup', authMiddleware, twoFAController.setup2FA);
router.post('/verify', authMiddleware, twoFAController.verify2FA);

module.exports = router;