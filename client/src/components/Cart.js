import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <Typography variant="h5" align="center">
        Your cart is empty!
      </Typography>
    );
  }

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        {cart.map((item) => (
          <Card key={item.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography>Price: ${item.price}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Button onClick={() => dispatch(increaseQuantity(item.id))}>
                ➕
              </Button>
              <Button onClick={() => dispatch(decreaseQuantity(item.id))}>
                ➖
              </Button>
              <Button
                onClick={() => dispatch(removeFromCart(item.id))}
                color="error"
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
        <Typography variant="h5">Total: ${totalAmount}</Typography>
      </Container>

      <div className="flex justify-between">
        <Button
          sx={{ mt: 4 , mb: 4  }}
          variant="contained"
          onClick={() => navigate("/")}
        >
          ⬅ Previous
        </Button>
        <Button
          sx={{ mt: 4 , mb: 4  }}
          variant="contained"
          color="success"
          onClick={() => navigate("/checkout")}
        >
          Next ➡
        </Button>
      </div>
    </>
  );
};

export default Cart;
