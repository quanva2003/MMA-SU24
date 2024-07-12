const CartItem = require("../models/cartItem.model");

module.exports = {
  //endpoint for get all cart items
  GetAllCartItems: async (req, res) => {
    try {
      const cartItem = await CartItem.find().populate("productId user");
      res.status(200).json(cartItem);
    } catch (error) {
      console.log("Error get all cartItem!", error);
      res.status(500).json({ message: "Error get all cartItem!!!" });
    }
  },

  //endpoint for get product by id
  GetCartItemById: async (req, res) => {
    try {
      const { id: cartItemId } = req.params;
      const cartItem = await CartItem.findById(cartItemId).populate(
        "productId user"
      );

      if (!cartItem) {
        return res.status(404).json({ message: "cartItem not found" });
      }

      res.status(200).json(cartItem);
    } catch (error) {
      console.log("Error get cartItem by id!", error);
      res.status(500).json({ message: "Error get cartItem!!!" });
    }
  },

  GetCartItemByUser: async (req, res) => {
    try {
      const { id: userId } = req.params;
      const cartItems = await CartItem.find({ user: userId }).populate(
        "productId user"
      );

      if (!cartItems.length) {
        return res
          .status(404)
          .json({ message: "No cart items found for this user" });
      }

      res.status(200).json(cartItems);
    } catch (error) {
      console.error("Error getting cart items by user:", error);
      res.status(500).json({ message: "Error get cart items!!!" });
    }
  },
  //endpoint for add cart item
  AddCartItem: async (req, res) => {
    const newCart = new CartItem(req.body);
    try {
      const cartItem = await newCart.save();
      res.status(200).json(cartItem);
    } catch (error) {
      console.log("Error add cartItem!", error);
      res.status(500).json({ message: "Error add cartItem!!!" });
    }
  },

  UpdateCartItem: async (req, res) => {
    const { id: cartItemId } = req.params;
    try {
      const cartItem = await CartItem.findByIdAndUpdate(cartItemId, {
        quantity: req.body,
      });
      if (!cartItem) {
        return res.status(404).json({ message: "cartItem not found" });
      }
      res.status(200).json(cartItem);
    } catch (error) {
      console.log("Error update cartItem!", error);
      res.status(500).json({ message: "Error update cartItem!!!" });
    }
  },

  DeleteCartItem: async (req, res) => {
    const { id: cartItemId } = req.params;
    try {
      const cartItem = await CartItem.findByIdAndDelete(cartItemId);

      if (!cartItem) {
        return res.status(404).json({ message: "cartItem not found" });
      }

      res.status(200).json(cartItem);
    } catch (error) {
      console.log("Error delete cartItem!", error);
      res.status(500).json({ message: "Error delete cartItem!!!" });
    }
  },
};
