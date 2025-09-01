const express = require('express');
const router = express.Router();
const {
  addStore,
  getStores,
  getStoreOwnerDashboard,
} = require('../controllers/storeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('System_Administrator'), addStore);

router.get('/', protect, authorize('Normal_User'), getStores);

router.get('/my-dashboard', protect, authorize('Store_Owner'), getStoreOwnerDashboard);

module.exports = router;