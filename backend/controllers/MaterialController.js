const Material = require("../models/material.model");

module.exports = {
  //endpoint for get all products
  GetAllMaterial: async (req, res) => {
    try {
      const material = await Material.find();
      res.status(200).json(material);
    } catch (error) {
      console.log("Error get all material!", error);
      res.status(500).json({ message: "Error get all material!!!" })
    }
  },

  //endpoint for get material by id
  GetMaterialById: async (req, res) => {
    try {
      const { id: materialId } = req.params;
      const material = await Material.findById(materialId);
      res.status(200).json(material);
    } catch (error) {
      console.log("Error get material by id!", error);
      res.status(500).json({ message: "Error get material!!!" })
    }
  },

  //endpoint for add material
  AddMaterial: async (req, res) => {
    try {
      const existMaterial = await Material.findOne({ materialName: req.body });
      
      if (existMaterial) {
        return res.status(400).json({ message: "Material already exist" });
      };

      const newMaterial = new Material(req.body);
      const material = await newMaterial.save();
      res.status(200).json(material);
    } catch (error) {
      console.log("Error add material!", error);
      res.status(500).json({ message: "Error add material!!!" })
    }
  },

  DeleteMaterial: async (req, res) => {
    const { id: materialId } = req.params;
    try {
      const material = await Material.findByIdAndDelete(materialId);
      res.status(200).json(material);
    } catch (error) {
      console.log("Error delete material!", error);
      res.status(500).json({ message: "Error delete material!!!" })
    }
  }
}