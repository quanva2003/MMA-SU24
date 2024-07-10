const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.GetAllProduct);

router.get("/:id", ProductController.GetProductById);

router.get("/category/:id", ProductController.GetProductByCategory);

router.get("/shell/:id", ProductController.GetProductByShell);

router.get("/material/:id", ProductController.GetProductByMaterial);

router.post("/", ProductController.AddProduct);

router.patch("/update/:id", ProductController.UpdateProduct);

router.delete("/delete/:id", ProductController.DeleteProduct);

module.exports = router;