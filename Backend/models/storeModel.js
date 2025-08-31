// models/storeModel.js
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Store name is required'],
    },
    email: {
      type: String,
      required: [true, 'Store email is required'],
      unique: true,
    },
    address: {
      type: String,
      required: [true, 'Store address is required'],
      maxlength: [400, 'Address cannot exceed 400 characters'],
    },
    storeOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Store owner is required'],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRatingsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Store', storeSchema);
