const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route.js");
const productRouter = require("./routes/product.route.js");
const diamondRouter = require("./routes/diamond.route.js");
const shellRouter = require("./routes/shell.route.js");
const materialRouter = require("./routes/material.route.js");
const cartItemRouter = require("./routes/cartItem.route.js");
const stripeRouter = require("./routes/stripe.route.js");
const addressRouter = require("./routes/address.route.js");
const orderRouter = require("./routes/order.route.js");
const orderItemRouter = require("./routes/orderItem.route.js");

const connectToMongoDB = require("./database/connectMongoDB.js");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/diamonds", diamondRouter);
app.use("/api/shells", shellRouter);
app.use("/api/materials", materialRouter);
app.use("/api/carts", cartItemRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", orderRouter);
app.use("/api/orderItems", orderItemRouter);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
