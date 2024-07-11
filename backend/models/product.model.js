const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  diamondId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Diamond",
    required: true,
  },
  shellId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shell",
    required: true,
  },
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product