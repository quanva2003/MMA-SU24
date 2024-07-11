const express = require("express");
const router = express.Router();
const DiamondController = require("../controllers/DiamondController");

router.get("/", DiamondController.GetAllDiamond);

router.get("/:id", DiamondController.GetDiamondById);

router.post("/", DiamondController.AddDiamond);

router.delete("/delete/:id", DiamondController.DeleteDiamond);

module.exports = router;