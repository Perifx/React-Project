const router = require("express").Router();
const verifyToken = require("./VerifyToken");
const Cart = require("../models/Cart");

// CREATE

router.post("/new", verifyToken.verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE

router.put(
  "/:id",
  verifyToken.verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// DELETE

router.delete(
  "/:id",
  verifyToken.verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await Cart.findOneAndDelete({ userId: req.params.id });
      res.status(200).json("Cart has been deleted successfully..");
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//GET USER CART
router.get(
  "/find/:id",
  verifyToken.verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.id });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// //GET ALL

router.get("/find", verifyToken.verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
