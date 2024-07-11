const express = require("express");
const router = express.Router();
const CartItemController = require("../controllers/CartItemController");

router.get("/", CartItemController.GetAllCartItems);

router.get("/:id", CartItemController.GetCartItemById);

router.get("/user/:id", CartItemController.GetCartItemByUser);

router.post("/", CartItemController.AddCartItem);

router.patch("/update/:id", CartItemController.UpdateCartItem);

router.delete("/delete/:id", CartItemController.DeleteCartItem);

module.exports = router;