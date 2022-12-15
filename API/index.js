const express = require("express");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/User");
const productRouter = require("./routers/Product");
const cartRouter = require("./routers/Cart");
const orderRouter = require("./routers/Order");
const cors = require("cors");
const app = express();

app.use(cors());

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connection Success"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.set("Access-Control-Allow-Origin", "http://localhost:3000");

app.listen(port, () => {
  console.log(`Backend started successfuly on Port: ${port}`);
});
