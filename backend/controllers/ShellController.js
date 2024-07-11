const Shell = require("../models/shell.model");

module.exports = {
  //endpoint for get all shells
  GetAllShell: async (req, res) => {
    try {
      const shell = await Shell.find();
      res.status(200).json(shell);
    } catch (error) {
      console.log("Error get all shell!", error);
      res.status(500).json({ message: "Error get all shell!!!" });
    }
  },

  //endpoint for get shell by id
  GetShellById: async (req, res) => {
    try {
      const { id: shellId } = req.params;
      const shell = await Shell.findById(shellId);
      res.status(200).json(shell);
    } catch (error) {
      console.log("Error get shell by id!", error);
      res.status(500).json({ message: "Error get shell!!!" });
    }
  },

  //endpoint for get shell by catergory
  GetShellByCategory: async (req, res) => {
    try {
      const { id: category } = req.params;
      const shell = await Shell.find({ category: category });
      res.status(200).json(shell);
    } catch (error) {
      console.log("Error get shell by id!", error);
      res.status(500).json({ message: "Error get shell!!!" });
    }
  },

  //endpoint for add shell
  AddShell: async (req, res) => {
    const { shellName, category } = req.body

    try {
      const existShell = await Shell.findOne({ shellName: shellName, category: category });

      if (existShell) {
        return res.status(400).json({ message: "Shell already exist" });
      }

      const newShell = new Shell(req.body);
      const shell = await newShell.save();
      res.status(200).json(shell);
    } catch (error) {
      console.log("Error add shell!", error);
      res.status(500).json({ message: "Error add shell!!!" });
    }
  },

  DeleteShell: async (req, res) => {
    const { id: shellId } = req.params;
    try {
      const shell = await Shell.findByIdAndDelete(shellId);
      res.status(200).json(shell);
    } catch (error) {
      console.log("Error delete shell!", error);
      res.status(500).json({ message: "Error delete shell!!!" });
    }
  }
}