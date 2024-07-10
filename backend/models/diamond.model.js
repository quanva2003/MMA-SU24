const mongoose = require("mongoose");

const diamondSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  carat: {
    type: Number,
    required: true,
  },
  cut: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  clarity: {
    type: String,
    required: true,
  },

}, { timestamps: true });

const Diamond = mongoose.model("Diamond", diamondSchema);

module.exports = Diamond