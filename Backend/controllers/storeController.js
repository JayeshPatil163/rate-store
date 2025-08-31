const Store = require('../models/storeModel');
const Rating = require('../models/ratingModel');
const User = require('../models/userModel');

// @desc    Admin: Add a new store
// @route   POST /api/stores/add
// @access  Private (Admin only)
exports.addStore = async (req, res) => {
  const { name, email, address, ownerEmail } = req.body;
  try {
    const storeExists = await Store.findOne({ email });
    if (storeExists) {
      return res.status(400).json({ msg: 'A store with this email already exists' });
    }

    const owner = await User.findOne({ email: ownerEmail, role: 'Store Owner' });
    if (!owner) {
      return res.status(404).json({ msg: 'Store owner not found or is not a Store Owner' });
    }

    const newStore = new Store({
      name,
      email,
      address,
      storeOwner: owner._id,
    });
    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// @desc    Normal User: Get all stores with filtering
// @route   GET /api/stores
// @access  Private (Normal User only)
exports.getStores = async (req, res) => {
  try {
    const { name, address, sort, order } = req.query;
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };

    let sortOption = {};
    if (sort) {
      sortOption[sort] = order === 'desc' ? -1 : 1;
    } else {
      sortOption = { name: 1 };
    }

    const stores = await Store.find(filter).sort(sortOption);
    const storesWithRatings = await Promise.all(
      stores.map(async (store) => {
        const userRating = await Rating.findOne({
          store: store._id,
          user: req.user.id,
        });

        const allRatings = await Rating.find({ store: store._id });
        const overallRating = allRatings.length > 0
          ? (allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length).toFixed(1)
          : null;

        return {
          ...store.toObject(),
          overallRating,
          userSubmittedRating: userRating ? userRating.rating : null,
        };
      })
    );

    res.json(storesWithRatings);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    Normal User: Submit a new rating for a store
// @route   POST /api/stores/:id/ratings
// @access  Private (Normal User only)
exports.submitRating = async (req, res) => {
  const { rating } = req.body;
  const storeId = req.params.id;
  const userId = req.user.id;

  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
    }

    const existingRating = await Rating.findOne({ store: storeId, user: userId });
    if (existingRating) {
      return res.status(400).json({ msg: 'You have already submitted a rating for this store. Please use PUT to update it.' });
    }

    const newRating = await Rating.create({
      storeId: storeId,
      userId: userId,
      rating,
    });

    const allRatings = await Rating.find({ store: storeId });
    const overallRating = allRatings.length > 0
      ? (allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length).toFixed(1)
      : null;

    await Store.findByIdAndUpdate(storeId, { averageRating: overallRating });

    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    Normal User: Update an existing rating
// @route   PUT /api/stores/:id/ratings
// @access  Private (Normal User only)
exports.updateRating = async (req, res) => {
  const { rating } = req.body;
  const storeId = req.params.id;
  const userId = req.user.id;

  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
    }

    const updatedRating = await Rating.findOneAndUpdate(
      { store: storeId, user: userId },
      { rating },
      { new: true }
    );

    if (!updatedRating) {
      return res.status(404).json({ msg: 'You have not yet rated this store. Please use POST to submit a new rating.' });
    }

    const allRatings = await Rating.find({ store: storeId });
    const overallRating = allRatings.length > 0
      ? (allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length).toFixed(1)
      : null;

    await Store.findByIdAndUpdate(storeId, { averageRating: overallRating });

    res.json(updatedRating);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    Store Owner: Get ratings submitted for their store
// @route   GET /api/stores/my-ratings
// @access  Private (Store Owner only)
exports.getStoreRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const store = await Store.findOne({ owner: ownerId });

    if (!store) {
      return res.status(404).json({ msg: 'You do not have a registered store' });
    }

    const storeRatings = await Rating.find({ store: store._id }).populate('user', 'name email');
    const averageRating = store.averageRating;

    const formattedRatings = storeRatings.map(r => ({
      _id: r._id,
      rating: r.rating,
      user: {
        name: r.user.name,
        email: r.user.email,
      },
      createdAt: r.createdAt,
    }));

    res.json({
      storeName: store.name,
      averageRating,
      ratings: formattedRatings,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
