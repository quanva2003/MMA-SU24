const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
      default: 0,
    },
    deliveryRequired: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveryInfo: {
      type: deliverySchema,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "IN DELIVERY", "COMPLETED", "CANCELED"],
      required: true,
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
