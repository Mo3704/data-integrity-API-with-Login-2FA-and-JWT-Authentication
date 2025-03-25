const express = require('express');
const { updateUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/:id', authenticateToken, updateUser);

module.exports = router;