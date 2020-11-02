const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
      brand: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, default: 0.0, required: true },
      countInStock: { type: Number, default: 0, required: true },
      rating: { type: Number, default: 0.0 },
      numReviews: { type: Number, default: 0 },
      users: {
          userId: mongoose.Schema.Types.ObjectId,
          username: String,
          userRating: Number,
          userComment: String,
          createdAt: { type: Date, default: Date.now },
          updatedAt: { type: Date, default: Date.now },
      }
    },
    { timestamps: true }
  );

  module.exports = mongoose.model('Product', productSchema);