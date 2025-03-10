import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount = parseFloat((state.totalAmount + action.payload.price).toFixed(2)); // Fix floating-point errors
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        state.totalAmount = parseFloat((state.totalAmount - (state.items[itemIndex].price * state.items[itemIndex].quantity)).toFixed(2));
        state.items.splice(itemIndex, 1);
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalAmount = parseFloat((state.totalAmount + item.price).toFixed(2));
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalAmount = parseFloat((state.totalAmount - item.price).toFixed(2));
        } else {
          state.totalAmount = parseFloat((state.totalAmount - item.price).toFixed(2));
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
