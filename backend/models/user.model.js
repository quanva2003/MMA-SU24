const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      default: "",
    },
    address: {
      type: String,
      required: false,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin", "staff"],
      required: true,
      default: "user",
    },
    point: {
      type: Number,
      required: false,
      default: 0,
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
