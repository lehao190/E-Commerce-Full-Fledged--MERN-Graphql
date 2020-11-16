const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shipping: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    payment: {
      paymentMethod: String,
      paymentResult: {
        orderID: String,
        payerID: String,
        paymentID: String,
      },
    },
    totalPrice: Number,
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);