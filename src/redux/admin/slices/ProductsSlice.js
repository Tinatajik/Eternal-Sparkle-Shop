import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    currentPage: 1,
    limit: 3,
    categories: [],
    totalPages: 1,
    error: null,
    selectedProduct: null,
    isModalOpen: false,
  },
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
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setModalState: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  setProducts,
  setCurrentPage,
  setLimit,
  setCategories,
  setTotalPages,
  setError,
  setSelectedProduct,
  setModalState,
} = productsSlice.actions;

export default productsSlice.reducer;
