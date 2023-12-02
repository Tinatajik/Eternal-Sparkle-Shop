import { Outlet, Link } from "react-router-dom";
import Header from "../header/Header";
import NavBar from "../nav-bar/NavBar";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
