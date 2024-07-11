const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

router.get("/", OrderController.GetAllOrders);

router.get("/:id", OrderController.GetOrderById);

router.get("/user/:id", OrderController.GetOrderByUser);

router.get("/transaction/:id", OrderController.GetOrderByTransaction);

router.post("/", OrderController.CreateOrder);

router.delete("/delete/:id", OrderController.DeleteOrder);

module.exports = router;