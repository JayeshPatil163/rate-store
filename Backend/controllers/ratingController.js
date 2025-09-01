const prisma = require('../config/prismaClient');

/**
 * @desc    Helper function to update a store's average rating
 */
const updateStoreAverageRating = async (storeId) => {
  const result = await prisma.rating.aggregate({
    where: { storeId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  const averageRating = result._avg.rating || 0;
  const totalRatingsCount = result._count.rating || 0;

  await prisma.store.update({
    where: { id: storeId },
    data: { averageRating, totalRatingsCount },
  });
};

/**
 * @desc    Normal User: Submit a new rating for a store
 * @route   POST /api/ratings
 * @access  Private/Normal User
 */
const submitRating = async (req, res) => {
  const { rating, storeId } = req.body;
  const userId = req.user.id;

  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const newRating = await prisma.$transaction(async (tx) => {
      const createdRating = await tx.rating.create({
        data: {
          rating,
          storeId,
          userId,
        },
      });

      await updateStoreAverageRating(storeId);

      return createdRating;
    });

    res.status(201).json(newRating);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'You have already rated this store. Use the update option instead.' });
    }
    res.status(500).json({ message: 'Failed to submit rating.', error: error.message });
  }
};

/**
 * @desc    Normal User: Update an existing rating
 * @route   PUT /api/ratings/:id
 * @access  Private/Normal User
 */
const updateRating = async (req, res) => {
  const { rating } = req.body;
  const ratingId = req.params.id;
  const userId = req.user.id;

  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const updatedRating = await prisma.$transaction(async (tx) => {
      const originalRating = await tx.rating.findUnique({
        where: { id: ratingId },
      });

      if (!originalRating) {
        throw new Error('Rating not found.');
      }
      if (originalRating.userId !== userId) {
        throw new Error('You are not authorized to update this rating.');
      }

      const newRatingData = await tx.rating.update({
        where: { id: ratingId },
        data: { rating },
      });

      await updateStoreAverageRating(originalRating.storeId);

      return newRatingData;
    });

    res.json(updatedRating);
  } catch (error) {
    if (error.message.includes('authorized') || error.message.includes('not found')) {
        return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to update rating.', error: error.message });
  }
};

module.exports = {
  submitRating,
  updateRating,
};