import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import AdminPage from "./pages/adminPage/AdminPage";
import PanelManagment from "./pages/adminPage/productManagment/PanelManagment";
import Layout from "./pages/Layout";
import ProductPage from "./pages/productPage/ProductPage";
import CheckoutPage from "./pages/chekoutPage/CheckoutPage";
import PaymentPage from "./pages/paymentPage/PaymentPage";
import PaymentResaultSuccessful from "./pages/paymentResault/PaymentResaultSuccessful";
import PaymentResaultFailed from "./pages/paymentResault/PaymentResaultFailed";
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
            <Route path="paymentPage" element={<PaymentPage />} />
            <Route
              path="paymentResaultSuccessful"
              element={<PaymentResaultSuccessful />}
            />
            <Route
              path="paymentResaultFailed"
              element={<PaymentResaultFailed />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
