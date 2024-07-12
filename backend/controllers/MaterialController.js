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
      const { materialName } = req.body; // Ensure req.body directly provides materialName as a string
      
      // Check if materialName already exists
      const existMaterial = await Material.findOne({ materialName });
      if (existMaterial) {
        return res.status(400).json({ message: "Material already exists" });
      }

      // Create new material instance
      const newMaterial = new Material({ materialName });
      const savedMaterial = await newMaterial.save();
      res.status(200).json(savedMaterial);
    } catch (error) {
      console.error("Error adding material:", error);
      res.status(500).json({ message: "Error adding material" });
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