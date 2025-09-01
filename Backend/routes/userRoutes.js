const express = require('express');
const router = express.Router();
const {
  addUserByAdmin,
  getUsers,
  getUserDetails,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect, authorize('System_Administrator'));

router.post('/', addUserByAdmin);

router.get('/', getUsers);

router.get('/:id', getUserDetails);

module.exports = router;