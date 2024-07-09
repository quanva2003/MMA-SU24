const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route.js");
const productRouter = require("./routes/product.route.js");
const connectToMongoDB = require("./database/connectMongoDB.js");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
