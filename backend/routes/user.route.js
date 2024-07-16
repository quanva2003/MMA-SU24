const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.RegisterUser);

router.post("/login", UserController.LoginUser);

router.get("/getUser/:email", UserController.findUserByEmail);

router.patch("/:email", UserController.updateUserByEmail);

router.patch("/", UserController.updateAllUser);

module.exports = router;
