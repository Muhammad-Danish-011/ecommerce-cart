import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

const NavigationButtons = ({ next, prev }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mt-8">
      {prev && <Button onClick={() => navigate(prev)}>⬅ Previous</Button>}
      {next && <Button onClick={() => navigate(next)}>Next ➡</Button>}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppBar position="static" className="bg-blue-600 justify-content-center" sx={{ display: 'flex', alignItems: 'center' }}>
        <Toolbar className="flex justify-center space-x-4" sx={{ width: '100%', justifyContent: 'center' }}>
          <Button color="inherit" onClick={() => window.location.href = "/"}>Home</Button>
          <Button color="inherit" onClick={() => window.location.href = "/cart"}>Cart</Button>
          <Button color="inherit" onClick={() => window.location.href = "/checkout"}>Checkout</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 6, display: 'flex', flexDirection: 'row' }} >      
         <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
