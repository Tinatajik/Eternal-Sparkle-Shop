import { Link } from "react-router-dom";
import NavBar from "../mainPage/navBar/NavBar";
import MainProduct from "./main/MainProduct";
export default function ProductPage() {
  return (
    <>
      <div className="flex justify-between px-12 mt-5">
        <div>Product Page</div>
        <div className="flex gap-5">
          <div>Cart</div>
          <Link to="/">back to MainPage</Link>
        </div>
      </div>
      <NavBar />
      <MainProduct />
    </>
  );
}
