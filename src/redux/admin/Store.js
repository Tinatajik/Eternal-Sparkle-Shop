import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthSlice";
import productsReducer from "./slices/ProductsSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    products: productsReducer,
  },
});
