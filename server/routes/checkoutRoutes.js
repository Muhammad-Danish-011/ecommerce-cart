const express = require("express");
const { placeOrder } = require("../controllers/checkoutController");
const router = express.Router();

// 🛒 Checkout API
router.post("/checkout", async (req, res) => {
    try {
        const cartItems = await Cart.find();
        if (cartItems.length === 0) return res.status(400).json({ error: "Cart is empty" });

        const order = new Order({
            items: cartItems,
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: "Pending"
        });

        await order.save();
        await Cart.deleteMany(); // ✅ Cart Empty Karna Hai

        res.status(201).json(order);
    } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
