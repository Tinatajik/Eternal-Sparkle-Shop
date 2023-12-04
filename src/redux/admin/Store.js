// store.js
import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./features/auth/authSlice";
import AuthReducer from "./AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    // Add other reducers here
  },
});
