const express = require('express');
const router = express.Router();
const { submitRating, updateRating } = require('../controllers/ratingController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here are for normal users
router.use(protect, authorize('Normal_User'));

router.post('/', submitRating);

router.put('/:id', updateRating);

module.exports = router;