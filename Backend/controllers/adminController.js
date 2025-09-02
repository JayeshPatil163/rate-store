const prisma = require('../config/prismaClient');
const { get } = require('../routes/authRoutes');

// Get dashboard stats (total users, stores, ratings) 
const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.rating.count(),
    ]);

    res.json({
      totalUsers,
      totalStores,
      totalRatings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching stats.', error: error.message });
  }
};

module.exports = {getDashboardStats};