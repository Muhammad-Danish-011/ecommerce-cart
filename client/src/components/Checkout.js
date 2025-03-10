import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items); // Cart items check
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert("Please select an item first!"); // Alert if cart is empty
      return;
    }
    alert("Order Placed!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h4">Checkout</Typography>
      <Typography>Total Amount: ${totalAmount}</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOrder}>
        Place Order
      </Button>

      <div className="flex justify-between mt-4">
        <Button
          sx={{ mt: 4, mb: 4 }}
          variant="contained"
          onClick={() => navigate("/cart")}
        >
          ⬅ Previous
        </Button>
        <Button sx={{ mt: 4, mb: 4 }} disabled>
          Next ➡
        </Button>
      </div>
    </Container>
  );
};

export default Checkout;
