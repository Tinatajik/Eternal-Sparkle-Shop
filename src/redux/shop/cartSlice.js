import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { _id, initialQuantity } = action.payload;
      const existingItem = state.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + 1,
          initialQuantity
        );
      } else {
        state.push({
          _id,
          ...action.payload,
          quantity: 1,
          availableQuantity: initialQuantity,
        });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    },
    increaseQuantity: (state, action) => {
      const { _id, initialQuantity } = action.payload;
      const existingItem = state.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + 1,
          initialQuantity
        );
      }
    },
    decreaseQuantity: (state, action) => {
      const { _id } = action.payload;
      const existingItem = state.find((item) => item._id === _id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
