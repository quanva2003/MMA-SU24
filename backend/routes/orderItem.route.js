const express = require("express");
const router = express.Router();
const OrderItemController = require("../controllers/OrderItemController");

router.get("/", OrderItemController.GetAllOrderItems);

router.get("/order/:id", OrderItemController.GetOrderItemByOrder);

router.get("/:id", OrderItemController.GetOrderItemById);

router.post("/", OrderItemController.AddOrderItem);

router.patch("/:id", OrderItemController.UpdateOrderItemStatus);

router.delete("/delete/:id", OrderItemController.DeleteOrderItem);

module.exports = router;
