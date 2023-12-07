import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../component/shop/layout/Layout";
import Home from "../templates/shop/home/Home";
import Product from "../templates/shop/products/Product";
import Checkout from "../templates/shop/checkout/Checkout";
import Login from "../templates/admin/login/Login";
import AdminHome from "../templates/admin/home/Home";
import Categories from "../templates/admin/categories/Categories";
import Order from "../templates/admin/orders/Order";
import SubCategories from "../templates/admin/sub-categories/SubCategories";
import StocksPrices from "../templates/admin/stocks-prices/StockPrices";
import Users from "../templates/admin/users/Users";
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
} from "./path-route/PathRoute";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={ProductPage} element={<Product />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
