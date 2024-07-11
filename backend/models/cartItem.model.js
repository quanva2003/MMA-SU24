const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem