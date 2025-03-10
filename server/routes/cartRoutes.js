const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart"); // Import Cart model if used
const Product = require("../models/Product"); // ✅ Import the missing Product model


router.post("/add", async (req, res) => {
  try {
      const { productId, quantity } = req.body;

      // ✅ Product ki details fetch karo
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ error: "Product not found" });

      // ✅ Pehle check karo agar product already cart me hai
      let cartItem = await Cart.findOne({ productId });

      if (cartItem) {
          cartItem.quantity += quantity || 1;
          await cartItem.save();
      } else {
          cartItem = new Cart({
              productId,
              name: product.name, // ✅ Name bhi save karna hai
              price: product.price, // ✅ Price bhi save karna hai
              image: product.image, // ✅ Image bhi save karni hai
              quantity: quantity || 1
          });
          await cartItem.save();
      }

      res.status(201).json(cartItem);
  } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
// ✅ Get Cart Items Route
router.get("/cart", async (req, res) => {
  try {
    const cart = await Cart.find().populate("productId"); // ✅ Populate product data
    res.json(cart);
  } catch (error) {
    console.error("🚨 Error fetching cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🛒 Increase / Decrease Quantity
router.put("/update/:id", async (req, res) => {
  try {
      const { quantity } = req.body;

      const cartItem = await Cart.findById(req.params.id);
      if (!cartItem) return res.status(404).json({ error: "Item not found" });

      if (quantity > 0) {
          cartItem.quantity = quantity;
          await cartItem.save();
      } else {
          await cartItem.deleteOne();
      }

      res.status(200).json(cartItem);
  } catch (error) {
      console.error("Error updating quantity:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
