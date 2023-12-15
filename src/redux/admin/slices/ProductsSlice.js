import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ProductApi = "http://localhost:8000/api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit }) => {
    const response = await axios.get(ProductApi, {
      params: {
        limit,
        page,
      },
    });
    const productsData = response.data.data.products || [];
    return productsData;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products = [];
        state.error = action.error.message;
      });
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
