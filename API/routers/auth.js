const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const inputUser = await User.findOne({ username: req.body.username });

    !inputUser && res.status(401).json("Wrong Username or Password");

    const hashedPassword = CryptoJS.AES.decrypt(
      inputUser.password,
      process.env.PASS_KEY
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword &&
      res.status(401).json("Wrong Username or Password");

    const accessToken = jwt.sign(
      {
        id: inputUser._id,
        isAdmin: inputUser.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...rest } = inputUser._doc;

    res.status(201).json({ ...rest, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
