import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/admin/Store";
import Layout from "../component/shop/layout/Layout";
import Home from "../pages/shop/home/Home";
import Product from "../pages/shop/products/Product";
import Checkout from "../pages/shop/checkout/Checkout";
import Login from "../pages/admin/login/Login";
import AdminHome from "../pages/admin/home/Home";
import Categories from "../pages/admin/categories/Categories";
import Order from "../pages/admin/orders/Order";
import SubCategories from "../pages/admin/sub-categories/SubCategories";
import StocksPrices from "../pages/admin/stocks-prices/StockPrices";
import Users from "../pages/admin/users/Users";
import {
  ProductPage,
  CheckoutPage,
  LoginAdmin,
  HomeAdmin,
  CategoriesAdmin,
  SubCategoriesAdmin,
  Stock,
  Orders,
  User,
  ProductAdmin,
  CartPage,
} from "./path-route/PathRoute";
import Products from "../pages/admin/product/Product";
import Cart from "../pages/shop/cart/Cart";

export default function Router() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={ProductPage} element={<Product />} />
              <Route path={CartPage} element={<Cart />} />
              <Route path={CheckoutPage} element={<Checkout />} />
              <Route path={LoginAdmin} element={<Login />} />
            </Route>
            <Route>
              <Route path={HomeAdmin} element={<AdminHome />} />
              <Route path={CategoriesAdmin} element={<Categories />} />
              <Route path={SubCategoriesAdmin} element={<SubCategories />} />
              <Route path={Orders} element={<Order />} />
              <Route path={Stock} element={<StocksPrices />} />
              <Route path={User} element={<Users />} />
              <Route path={ProductAdmin} element={<Products />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
