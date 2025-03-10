const Cart = require("../models/Cart");

// Place order and clear cart
exports.placeOrder = async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
};
