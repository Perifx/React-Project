const router = require("express").Router();
const Product = require("../models/Product");
const verifyToken = require("../routers/VerifyToken");

// CREATE

router.post("/new", verifyToken.verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE

router.put("/:id", verifyToken.verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE

router.delete("/:id", verifyToken.verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Deleted Successfully..");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET BY ID

router.get("/find/:id", async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL PRODUCTS

router.get("/find", async (req, res) => {
  const newQuery = req.query.new;
  const categoryQuery = req.query.category;
  try {
    let products;
    if (newQuery) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (categoryQuery) {
      products = await Product.find({ categories: { $in: [categoryQuery] } });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
