import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subcategories: [],
  currentPage: 1,
  limit: 3,
  categoryNames: [],
  totalPages: 1,
  error: null,
};

const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {
    setSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setCategoryNames: (state, action) => {
      state.categoryNames = action.payload;
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
  setSubcategories,
  setCurrentPage,
  setLimit,
  setCategoryNames,
  setTotalPages,
  setError,
} = subcategoriesSlice.actions;

export default subcategoriesSlice.reducer;
