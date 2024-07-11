const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  size: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in delivery', 'completed', 'canceled'],
    required: true,
    default: 'pending',
  }
}, { timestamps: true });

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem