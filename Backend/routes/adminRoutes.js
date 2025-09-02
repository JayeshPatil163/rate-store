const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getDashboardStats } = require('../controllers/adminController');

const router = express.Router();
router.get('/stats', protect, authorize('System_Administrator'), getDashboardStats);

module.exports = router;