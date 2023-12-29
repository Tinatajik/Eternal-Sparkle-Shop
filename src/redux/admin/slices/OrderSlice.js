import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    selectedStatus: true,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setOrders, setSelectedStatus, setTotalPages, setCurrentPage } =
  orderSlice.actions;

export default orderSlice.reducer;
