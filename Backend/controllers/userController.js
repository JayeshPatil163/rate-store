const prisma = require('../config/prismaClient');
const bcrypt = require('bcryptjs');

/**
 * @desc    Admin: Add a new user (any role)
 * @route   POST /api/users
 * @access  Private/Admin
 */
const addUserByAdmin = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password format is invalid.' });
    }

    if (!['Normal_User', 'Store_Owner', 'System_Administrator'].includes(role)) {
      return res.status(400).json({ message: 'Invalid user role specified.' });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, address, role },
    });
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc    Admin: Get all users with filtering and sorting
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getUsers = async (req, res) => {
  const { name, email, address, role, sort = 'name', order = 'asc' } = req.query;

  try {
    const where = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (address) where.address = { contains: address, mode: 'insensitive' };
    if (role) where.role = role;

    const orderBy = { [sort]: order };

    const users = await prisma.user.findMany({
      where,
      orderBy,
      select: { id: true, name: true, email: true, address: true, role: true },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
};

/**
 * @desc    Admin: Get a single user's details
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
const getUserDetails = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        ownedStores: {
          select: {
            id: true,
            name: true,
            averageRating: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addUserByAdmin,
  getUsers,
  getUserDetails,
};