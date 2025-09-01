const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  updatePassword,
  createInitialAdmin,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/add-initial-admin', createInitialAdmin);

router.put('/password', protect, updatePassword);

module.exports = router;