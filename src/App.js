import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import AdminPage from "./pages/adminPage/AdminPage";
import PanelManagment from "./pages/adminPage/productManagment/PanelManagment";
import Layout from "./pages/Layout";
import ProductPage from "./pages/productPage/ProductPage";
import CheckoutPage from "./pages/chekoutPage/CheckoutPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="adminPage" element={<AdminPage />} />
            <Route path="panelManagment" element={<PanelManagment />} />
            <Route path="productPage" element={<ProductPage />} />
            <Route path="checkoutPage" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
