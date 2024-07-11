const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");

module.exports = {
  //endpoint for get all cart items
  GetAllOrders: async (req, res) => {
    try {
      const order = await Order.find().populate("orderItem").select("-__v");
      res.status(200).json(order);
    } catch (error) {
      console.log("Error get all order!", error);
      res.status(500).json({ message: "Error get all order!!!" })
    }
  },

  //endpoint for get product by id
  GetOrderById: async (req, res) => {
    try {
      const { id: orderId } = req.params;
      const order = await Order.findById(orderId).populate("orderItem");

      if (!order) {
        return res.status(404).json({ message: "order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      console.log("Error get order by id!", error);
      res.status(500).json({ message: "Error get order!!!" })
    }
  },

  GetOrderByUser: async (req, res) => {
    try {
      const { id: userId } = req.params;
      const order = await Order.findById({ user: userId }).populate("orderItem");

      if (!order) {
        return res.status(404).json({ message: "order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      console.log("Error get order by user!", error);
      res.status(500).json({ message: "Error get order!!!" })
    }
  },

  GetOrderByTransaction: async (req, res) => {
    const { id: transactionId } = req.params;
    try {
      // Find order by transactionId
      const order = await Order.findOne({ transactionId });

      if (!order) {
        return res.status(404).json({ message: "Order not found!" });
      }

      res.status(200).json(order);
    } catch (error) {
      console.log("Error searching for order!", error);
      res.status(500).json({ message: "Error searching for order!" });
    }
  },

  CreateOrder: async (req, res) => {
    const { transactionId } = req.body;

    try {
      // Check if transactionId already exists
      const existingOrder = await Order.findOne({ transactionId });

      if (existingOrder) {
        return res.status(400).json({ message: "Order with this transaction ID already exists!" });
      }

      const newOrder = new Order(req.body);
      const order = await newOrder.save();
      res.status(200).json(order);
    } catch (error) {
      console.log("Error creating order!", error);
      res.status(500).json({ message: "Error creating order!" });
    }
  },

  DeleteOrder: async (req, res) => {
    const { id: orderId } = req.params;
    try {
      const order = await Order.findByIdAndDelete(orderId);

      if (!order) {
        return res.status(404).json({ message: "order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      console.log("Error delete order!", error);
      res.status(500).json({ message: "Error delete order!!!" })
    }
  },


  //----------------ORDER ITEM----------------------//
  GetAllOrderItems: async (req, res) => {
    try {
      const orderItem = await OrderItem.find();
      res.status(200).json(orderItem);
    } catch (error) {
      console.log("Error get all order items!", error);
      res.status(500).json({ message: "Error get order items!!!" })
    }
  },

  GetOrderItemById: async (req, res) => {
    try {
      const { id: orderItemId } = req.params;
      const orderItem = await OrderItem.findById(orderItemId);
      res.status(200).json(orderItem);
    } catch (error) {
      console.log("Error get order items!", error);
      res.status(500).json({ message: "Error get order items!!!" })
    }
  },

  AddOrderItem: async (req, res) => {
    const { product, orderId } = req.body;

    if (!product || !orderId) {
      console.log("Invalid data passed into request");
      return res.status(400).json({ message: "Invalid data" });
    }

    try {
      const orderItem = await Order.create(req.body);
      res.status(200).json(orderItem);
    } catch (error) {
      console.log("Error add order items!", error);
      res.status(500).json({ message: "Error add order items!!!" })
    }
  },

  UpdateOrderItemStatus: async (req, res) => {
    try {
      const { id: orderItemId } = req.params;
      const orderItem = await OrderItem.findByIdAndUpdate(orderItemId, { status: req.body });

      if (!orderItem) {
        res.status(404).json({ message: "Order Item not found" });
      }

      res.status(200).json(orderItem);
    } catch (error) {
      console.log("Error update order items!", error);
      res.status(500).json({ message: "Error update order items!!!" })
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
      res.status(500).json({ message: "Error delete order items!!!" })
    }
  }
}