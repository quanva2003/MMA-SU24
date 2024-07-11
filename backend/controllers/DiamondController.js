const Diamond = require("../models/diamond.model");

module.exports = {
  //endpoint for get all diamonds
  GetAllDiamond: async (req, res) => {
    try {
      const diamond = await Diamond.find();
      res.status(200).json(diamond);
    } catch (error) {
      console.log("Error get all diamond!", error);
      res.status(500).json({ message: "Error get all diamond!!!" })
    }
  },

  //endpoint for get diamond by id
  GetDiamondById: async (req, res) => {
    try {
      const { id: diamondId } = req.params;
      const diamond = await Diamond.findById(diamondId);
      res.status(200).json(diamond);
    } catch (error) {
      console.log("Error get diamond by id!", error);
      res.status(500).json({ message: "Error get diamond!!!" })
    }
  },

  //endpoint for add diamond
  AddDiamond: async (req, res) => {
    const { type, carat, cut, clarity, color } = req.body;
    try {
      const existDiamond = await Diamond.findOne({ type: type, carat: carat, cut: cut, clarity: clarity, color: color });

      if (existDiamond) {
        return res.status(400).json({ message: "Diamond already exist" });
      }
      
      const newDiamond = new Diamond(req.body);
      const diamond = await newDiamond.save();
      res.status(200).json(diamond);
    } catch (error) {
      console.log("Error add diamond!", error);
      res.status(500).json({ message: "Error add diamond!!!" })
    }
  },

  DeleteDiamond: async (req, res) => {
    const { id: diamondId } = req.params;
    try {
      const diamond = await Diamond.findByIdAndDelete(diamondId);
      res.status(200).json(diamond);
    } catch (error) {
      console.log("Error delete diamond!", error);
      res.status(500).json({ message: "Error delete diamond!!!" })
    }
  }
}