import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthSlice";
import productsReducer from "./slices/ProductsSlice";
import orderReducer from "./slices/OrderSlice";
import categoryReducer from "./slices/CategorySlice";
import subcategoriesReducer from "./slices/SubCategorySlice";
import stocksReducer from "./slices/StocksSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    products: productsReducer,
    order: orderReducer,
    category: categoryReducer,
    subcategories: subcategoriesReducer,
    stocks: stocksReducer,
  },
});
