const OrderItem = require("../models/orderItem.model");

module.exports = {
  GetAllOrderItems: async (req, res) => {
    try {
      const orderItem = await OrderItem.find();
      res.status(200).json(orderItem);
    } catch (error) {
      console.log("Error get all order items!", error);
      res.status(500).json({ message: "Error get order items!!!" });
    }
  },

  GetOrderItemByOrder: async (req, res) => {
    try {
      const orderItemId = req.params.id;
      const orderItem = await OrderItem.find({ order: orderItemId }).populate(
        "product"
      );
      res.status(200).json(orderItem);
    } catch (error) {
      console.log("Error get order items!", error);
      res.status(500).json({ message: "Error get order items!!!" });
    }
  },

  GetOrderItemById: async (req, res) => {
    try {
      const { id: orderItemId } = req.params;
      const orderItem = await OrderItem.findById(orderItemId);
      res.status(200).json(orderItem);
    } catch (error) {
      console.log("Error get order items!", error);
      res.status(500).json({ message: "Error get order items!!!" });
    }
  },

  AddOrderItem: async (req, res) => {
    const { product, order } = req.body;

    if (!product || !order) {
      console.log("Invalid data passed into request");
      return res.status(400).json({ message: "Invalid data" });
    }

    try {
      const orderItem = await OrderItem.create(req.body);
      res.status(200).json(orderItem);
    } catch (error) {
      console.log("Error add order items!", error);
      res.status(500).json({ message: "Error add order items!!!" });
    }
  },

  UpdateOrderItemStatus: async (req, res) => {
    try {
      const { id: orderItemId } = req.params;
      const orderItem = await OrderItem.findByIdAndUpdate(orderItemId, {
        status: req.body,
      });

      if (!orderItem) {
        res.status(404).json({ message: "Order Item not found" });
      }

      res.status(200).json(orderItem);
    } catch (error) {
      console.log("Error update order items!", error);
      res.status(500).json({ message: "Error update order items!!!" });
    }
  },

  DeleteOrderItem: async (req, res) => {
    try {
      const { id: orderItemId } = req.params;
      const orderItem = await OrderItem.findByIdAndDelete(orderItemId);

      if (!orderItem) {
        res.status(404).json({ message: "Order Item not found" });
      }

      res.status(200).json({ message: "Order Item deleted" });
    } catch (error) {
      console.log("Error delete order items!", error);
      res.status(500).json({ message: "Error delete order items!!!" });
    }
  },
};
