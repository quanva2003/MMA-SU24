const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/AddressController");

router.get("/provinces", AddressController.getProvinces);

router.get("/districts/:province_id", AddressController.getDistricts);

router.get("/wards/:district_id", AddressController.getWards);

module.exports = router;
