const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Ring', 'Earrings', 'Necklace', 'Bracelet']
  },
  brand: {
    type: String,
    required: false,
  },
  shell: {
    type: String,
    required: true,
  },
  material: {
    type: String,
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
  productSize: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product