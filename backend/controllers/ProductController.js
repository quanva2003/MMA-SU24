const Product = require("../models/product");

module.exports = {
  //endpoint for get all products
  GetAllProduct: async (req, res) => {
    try {
      const product = await Product.find();
      res.status(200).json(product);
    } catch (error) {
      console.log("Error get all product!", error);
      res.status(500).json({ message: "Error get all product!!!" })
    }
  },

  //endpoint for get product by id
  GetProductById: async (req, res) => {
    try {
      const { productId } = req.params.id;
      const product = await Product.findById(productId);
      res.status(200).json(product);
    } catch (error) {
      console.log("Error get product by id!", error);
      res.status(500).json({ message: "Error get product!!!" })
    }
  },

  GetProductByShell: async (req, res) => {
    try {
      const { shellId } = req.params.id;
      const product = await Product.findOne({ shellId: shellId });
      res.status(200).json(product);
    } catch (error) {
      console.log("Error get product by id!", error);
      res.status(500).json({ message: "Error get product!!!" })
    }
  },

  GetProductByMaterial: async (req, res) => {
    try {
      const { materialId } = req.params.id;
      const product = await Product.findOne({ materialId: materialId });
      res.status(200).json(product);
    } catch (error) {
      console.log("Error get product by id!", error);
      res.status(500).json({ message: "Error get product!!!" })
    }
  },

  //endpoint for add product
  AddProduct: async (req, res) => {
    // const { category, brand, shell, material,  } = req.body;
    const newProduct = new Product(req.body);
    try {
      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (error) {
      console.log("Error add product!", error);
      res.status(500).json({ message: "Error add product!!!" })
    }
  },

  UpdateProduct: async (req, res) => {
    const { id: productId } = req.params;
    try {
      const product = await Product.findByIdAndUpdate(productId, { quantity: req.body })
      res.status(200).json(product);
    } catch (error) {
      console.log("Error update product!", error);
      res.status(500).json({ message: "Error update product!!!" })
    }
  },

  DeleteProduct: async (req, res) => {
    const { id: productId } = req.params;
    try {
      const product = await Product.findByIdAndDelete(productId);
      res.status(200).json(product);
    } catch (error) {
      console.log("Error delete product!", error);
      res.status(500).json({ message: "Error delete product!!!" })
    }
  }
}