import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CategoryApi = "http://localhost:8000/api/categories";
const SubcategoryApi = "http://localhost:8000/api/subcategories";

export const fetchCategories = createAsyncThunk(
  "productModal/fetchCategories",
  async () => {
    try {
      const response = await axios.get(CategoryApi);
      const categories = response.data.data.categories;
      return categories;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSubcategories = createAsyncThunk(
  "productModal/fetchSubcategories",
  async (categoryId) => {
    try {
      const response = await axios.get(
        `${SubcategoryApi}?category=${categoryId}`
      );
      return response.data.data.subcategories;
    } catch (error) {
      throw error;
    }
  }
);

const productModalSlice = createSlice({
  name: "productModal",
  initialState: {
    categories: [],
    subcategories: [],
    loadingCategories: false,
    loadingSubcategories: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loadingCategories = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loadingCategories = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loadingCategories = false;
        state.error = action.error.message;
      })
      .addCase(fetchSubcategories.pending, (state) => {
        state.loadingSubcategories = true;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loadingSubcategories = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loadingSubcategories = false;
        state.error = action.error.message;
      });
  },
});

export default productModalSlice.reducer;
