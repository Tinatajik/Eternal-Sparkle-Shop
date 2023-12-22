import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    quantity: 1,
    isLoading: false,
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProduct, setQuantity, setIsLoading } = productSlice.actions;
export default productSlice.reducer;
