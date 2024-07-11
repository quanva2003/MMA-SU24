const express = require("express");
const router = express.Router();
const ShellController = require("../controllers/ShellController");

router.get("/", ShellController.GetAllShell);

router.get("/:id", ShellController.GetShellById);

router.get("/category/:id", ShellController.GetShellByCategory);

router.post("/", ShellController.AddShell);

router.delete("/delete/:id", ShellController.DeleteShell);

module.exports = router;