import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    currentPage: 1,
    limit: 3,
    totalPages: 1,
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
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
  setCategories,
  setCurrentPage,
  setLimit,
  setTotalPages,
  setError,
} = categorySlice.actions;

export default categorySlice.reducer;
