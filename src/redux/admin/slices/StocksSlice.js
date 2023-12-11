import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currentPage: 1,
  limit: 3,
  totalPages: 1,
  error: null,
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  setCurrentPage,
  setLimit,
  setTotalPages,
  setError,
} = stocksSlice.actions;

export default stocksSlice.reducer;
