import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import AdminPage from "./pages/adminPage/AdminPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="adminPage" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
