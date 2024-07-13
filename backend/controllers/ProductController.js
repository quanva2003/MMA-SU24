const Product = require("../models/product.model");

module.exports = {
  //endpoint for get all products
  GetAllProduct: async (req, res) => {
    try {
      const product = await Product.find()
        .populate("diamondId")
        .populate("shellId", "shellName category size")
        .populate("materialId", "materialName");
      res.status(200).json(product);
    } catch (error) {
      console.log("Error get all product!", error);
      res.status(500).json({ message: "Error get all product!!!" });
    }
  },

  //endpoint for get product by id
  GetProductById: async (req, res) => {
    try {
      const { id: productId } = req.params;
      const product = await Product.findById(productId)
        .populate("diamondId")
        .populate("shellId materialId");
      res.status(200).json(product);
    } catch (error) {
      console.log("Error get product by id!", error);
      res.status(500).json({ message: "Error get product!!!" });
    }
  },

  GetProductByName: async (req, res) => {
    try {
      const { name } = req.params;
      const regex = new RegExp(name, "i");
      const products = await Product.find({ productName: regex })
        .populate("diamondId")
        .populate("shellId", "shellName category size")
        .populate("materialId", "materialName");

      res.status(200).json(products);
    } catch (error) {
      console.error("Error get product by name!", error);
      res.status(500).json({ message: "Error get product by name!!!" });
    }
  },

  GetProductByCategory: async (req, res) => {
    try {
      const { id: category } = req.params;
      const product = await Product.find()
        .populate("diamondId materialId", "type materialName")
        .populate({
          path: "shellId",
          match: { category: category },
          select: "-createdAt -updatedAt -__v",
        })
        .exec();
      const filteredProducts = product.filter(
        (product) => product.shellId !== null
      );
      res.status(200).json(filteredProducts);
    } catch (error) {
      console.log("Error get product by category!", error);
      res.status(500).json({ message: "Error get product!!!" });
    }
  },

  GetProductByShell: async (req, res) => {
    try {
      const { id: shellName } = req.params;
      const product = await Product.find()
        .populate("diamondId materialId", "type materialName")
        .populate({
          path: "shellId",
          match: { shellName: shellName },
          select: "-createdAt -updatedAt -__v",
        })
        .exec();
      const filteredProducts = product.filter(
        (product) => product.shellId !== null
      );
      res.status(200).json(filteredProducts);
    } catch (error) {
      console.log("Error get product by id!", error);
      res.status(500).json({ message: "Error get product!!!" });
    }
  },

  GetProductByMaterial: async (req, res) => {
    try {
      const { id: materialName } = req.params;
      const product = await Product.find()
        .populate("diamondId shellId", "type shellName category")
        .populate({
          path: "materialId",
          match: { materialName: materialName },
          select: "-createdAt -updatedAt -__v",
        })
        .exec();
      const filteredProducts = product.filter(
        (product) => product.materialId !== null
      );
      res.status(200).json(filteredProducts);
    } catch (error) {
      console.log("Error get product by id!", error);
      res.status(500).json({ message: "Error get product!!!" });
    }
  },

  //endpoint for add product
  AddProduct: async (req, res) => {
    const { diamondId, shellId, materialId } = req.body;

    try {
      const existProduct = await Product.findOne({
        diamondId: diamondId,
        shellId: shellId,
        materialId: materialId,
      });

      if (existProduct) {
        return res.status(400).json({ message: "Product already exist" });
      }

      const newProduct = new Product(req.body);
      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (error) {
      console.log("Error add product!", error);
      res.status(500).json({ message: "Error add product!!!" });
    }
  },

  UpdateProduct: async (req, res) => {
    const { id: productId } = req.params;
    try {
      const product = await Product.findByIdAndUpdate(productId, {
        quantity: req.body,
      });
      res.status(200).json(product);
    } catch (error) {
      console.log("Error update product!", error);
      res.status(500).json({ message: "Error update product!!!" });
    }
  },

  DeleteProduct: async (req, res) => {
    const { id: productId } = req.params;
    try {
      const product = await Product.findByIdAndDelete(productId);
      res.status(200).json(product);
    } catch (error) {
      console.log("Error delete product!", error);
      res.status(500).json({ message: "Error delete product!!!" });
    }
  },
};
