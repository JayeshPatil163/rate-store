const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  updatePassword,
  addUserByAdmin,
  getUsers,
  getUserDetails,
  addAdmin,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
 
// Public
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/add-admin', addAdmin);


router.put('/password', protect, updatePassword);

//admin only
router.post('/add', protect, authorize('System Administrator'), addUserByAdmin);
router.get('/', protect, authorize('System Administrator'), getUsers);
router.get('/:id', protect, authorize('System Administrator'), getUserDetails);

module.exports = router;
