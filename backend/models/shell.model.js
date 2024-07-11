const mongoose = require("mongoose");

const shellSchema = new mongoose.Schema({
  shellName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['ring', 'earrings', 'necklace', 'bracelet']
  },
  size: {
    type: Array,
    required: true,
  },
}, { timestamps: true });

const Shell = mongoose.model("Shell", shellSchema);

module.exports = Shell