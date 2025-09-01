const prisma = require('../config/prismaClient');

/**
 * @desc    Admin: Add a new store
 * @route   POST /api/stores
 * @access  Private/Admin
 */
const addStore = async (req, res) => {
  const { name, email, address, storeOwnerEmail } = req.body;

  try {
    const storeExists = await prisma.store.findUnique({ where: { email } });
    if (storeExists) {
      return res.status(400).json({ message: 'A store with this email already exists' });
    }

    const owner = await prisma.user.findUnique({ where: { email: storeOwnerEmail } });
    if (!owner || owner.role !== 'Store_Owner') {
      return res.status(404).json({ message: 'Store owner not found or user is not a Store Owner' });
    }

    const newStore = await prisma.store.create({
      data: { name, email, address, storeOwnerId: owner.id },
    });

    res.status(201).json(newStore);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add store.', error: error.message });
  }
};

/**
 * @desc    Normal User: Get all stores with filtering and user's rating
 * @route   GET /api/stores
 * @access  Private/Normal User
 */
const getStores = async (req, res) => {
  const { name, address, sort = 'name', order = 'asc' } = req.query;
  const userId = req.user.id;

  try {
    const where = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (address) where.address = { contains: address, mode: 'insensitive' };

    const orderBy = { [sort]: order };

    const stores = await prisma.store.findMany({
      where,
      orderBy,
      include: {
        ratings: {
          where: {
            userId: userId,
          },
        },
      },
    });

    const formattedStores = stores.map((store) => {
      const { ratings, ...storeData } = store;
      return {
        ...storeData,
        userSubmittedRating: ratings.length > 0 ? ratings[0].rating : null,
      };
    });

    res.json(formattedStores);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching stores.' });
  }
};

/**
 * @desc    Store Owner: Get their store's dashboard info
 * @route   GET /api/stores/my-dashboard
 * @access  Private/Store Owner
 */
const getStoreOwnerDashboard = async (req, res) => {
  try {
    const store = await prisma.store.findFirst({
      where: { storeOwnerId: req.user.id },
      include: {
        ratings: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
      },
    });

    if (!store) {
      return res.status(404).json({ message: 'You do not have a registered store' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addStore,
  getStores,
  getStoreOwnerDashboard,
};