const express = require('express');
const router = express.Router();
const {
  addStore,
  getStores,
  submitRating,
  updateRating,
  getStoreRatings,
} = require('../controllers/storeController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Admin only route
router.post('/add', protect, authorize('System Administrator'), addStore);

// Normal User routes
router.get('/', protect, authorize('Normal User'), getStores);
router.post('/:id/ratings', protect, authorize('Normal User'), submitRating);
router.put('/:id/ratings', protect, authorize('Normal User'), updateRating);

router.get('/my-ratings', protect, authorize('Store Owner'), getStoreRatings);

module.exports = router;
