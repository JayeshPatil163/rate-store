const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Store = require('../models/storeModel');
const Rating = require('../models/ratingModel');

const generateToken = (id, role) => {
  return jwt.sign({ user: { id, role } }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// @desc    Admin: Add a new System Administrator
// @route   POST /api/auth/add-admin
// @access  Public (First admin setup)
exports.addAdmin = async (req, res) => {
    console.log("Adding admin...");
  const { name, email, password, address} = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    const newUser = await User.create({
        name,
      email,
      password,
      address,
      role: 'System Administrator',
    });

    const token = generateToken(newUser._id, newUser.role);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      address: newUser.address,
      role: newUser.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// @desc    Register a new Normal User
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      address,
      role: 'Normal User',
    });

    const token = generateToken(newUser._id, newUser.role);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    Update a user's password
// @route   PUT /api/auth/password
// @access  Private
exports.updatePassword = async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.password = password; // The `pre('save')` middleware in the model will handle hashing
    await user.save();
    res.json({ msg: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    Admin: Add a new user (Normal, Store Owner, or Admin)
// @route   POST /api/auth/add
// @access  Private (Admin only)
exports.addUserByAdmin = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    const newUser = new User({ name, email, password, address, role });
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// @desc    Admin: Get all users with filtering and sorting
// @route   GET /api/auth
// @access  Private (Admin only)
exports.getUsers = async (req, res) => {
  try {
    const { name, email, address, role, sort, order } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };
    if (role) filter.role = role;

    let sortOption = {};
    if (sort) {
      sortOption[sort] = order === 'desc' ? -1 : 1;
    } else {
      sortOption = { name: 1 }; // Default sort
    }

    const users = await User.find(filter).sort(sortOption);

    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    Admin: Get a single user's details
// @route   GET /api/auth/:id
// @access  Private (Admin only)
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    let storeRating = null;
    if (user.role === 'Store Owner') {
      const store = await Store.findOne({ owner: user._id });
      if (store) {
        storeRating = store.averageRating;
      }
    }

    res.json({ ...user.toObject(), storeRating });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
