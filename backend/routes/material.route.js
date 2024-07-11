const express = require("express");
const router = express.Router();
const MaterialController = require("../controllers/MaterialController");

router.get("/", MaterialController.GetAllMaterial);

router.get("/:id", MaterialController.GetMaterialById);

router.post("/", MaterialController.AddMaterial);

router.delete("/delete/:id", MaterialController.DeleteMaterial);

module.exports = router;