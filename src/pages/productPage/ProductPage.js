import { Link } from "react-router-dom";
import NavBar from "../mainPage/navBar/NavBar";
import MainProduct from "./main/MainProduct";
export default function ProductPage() {
  return (
    <>
      <div className="flex justify-between items-center px-12 mt-5">
      <Link to="/"><img width="45" height="45" src="https://img.icons8.com/bubbles/50/back.png" alt="back"/></Link>      
          <div><img width="32" height="32" src="https://img.icons8.com/pulsar-color/48/shopping-bag.png" alt="shopping-bag"/></div>
      </div>
      <NavBar />
      <MainProduct />
    </>
  );
}
