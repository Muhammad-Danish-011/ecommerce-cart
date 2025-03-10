const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes); // ✅ Ensure this is present


const cartRoutes = require("./routes/cartRoutes"); // ✅ Import cart routes
app.use("/api/cart", cartRoutes); // ✅ Ensure this line is present





mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("🚨 MongoDB Connection Error:", err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
