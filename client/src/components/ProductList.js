import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Button, Card, CardContent, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Laptop", price: 800, image: "/assets/2.jpg" },
    { id: 2, name: "Phone", price: 500, image: "/assets/3.jpg" },
    { id: 3, name: "Headphones", price: 100, image: "/assets/1.jpeg" },
  ];

  return (
    <Container sx={{ mt: 6 }}>
      <div className="flex flex-col gap-6 p-4">
                {products.map((product) => (
          <Card key={product.id} className="shadow-lg rounded-lg p-4 flex flex-row justify-between items-center">
               {/* Image (Right Side) */}
               <div style={{width: "100px" , height:"200px" , display:"flex" , flexDirection:"row"}} >
              <img
                src={product.image}
                alt={product.name}
              />
            </div>
            {/* Text Content (Left Side) */}
            <CardContent className="flex-grow">
              <Typography variant="h6" className="text-gray-800">
                {product.name}
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                ${product.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className="mt-2"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </Button>
            </CardContent>

         
          </Card>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 mb-4 mx-4">
        <Button sx={{ mt: 4 , mb: 4  }} disabled>
          ⬅ Previous
        </Button>
        <Button
          sx={{ mt: 4 , mb: 4  }}
          variant="contained"
          onClick={() => navigate("/cart")}
        >
          Next ➡
        </Button>
      </div>
    </Container>
  );
};

export default ProductList;
