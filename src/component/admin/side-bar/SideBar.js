import { Link, useLocation } from "react-router-dom";
import {
  CategoriesAdmin,
  HomeAdmin,
  Orders,
  ProductAdmin,
  Stock,
  SubCategoriesAdmin,
  User,
} from "../../../router/path-route/PathRoute";

export default function SideBar() {
  const location = useLocation();

  return (
    <>
      <aside className="bg-[#EEE8E3] text-[#30373E] z-20 text-lg w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block">
        <ul className="flex flex-col">
          <Link to={HomeAdmin}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-[#30373E] ${
                location.pathname === HomeAdmin ? "bg-[#D6B59F]" : ""
              }`}
            >
              <button> Dashboard</button>
            </li>
          </Link>
          <Link to={ProductAdmin}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-[#30373E] ${
                location.pathname === ProductAdmin ? "bg-[#D6B59F]" : ""
              }`}
            >
              <button>Product</button>
            </li>
          </Link>
          <Link to={CategoriesAdmin}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-[#30373E] ${
                location.pathname === CategoriesAdmin ? "bg-[#D6B59F]" : ""
              }`}
            >
              <button>Categories</button>
            </li>
          </Link>
          <Link to={SubCategoriesAdmin}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-[#30373E] ${
                location.pathname === SubCategoriesAdmin ? "bg-[#D6B59F]" : ""
              }`}
            >
              <button>Sub-Categories</button>
            </li>
          </Link>
          <Link to={Stock}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-[#30373E] ${
                location.pathname === Stock ? "bg-[#D6B59F]" : ""
              }`}
            >
              <button>Stocks-Prices</button>
            </li>
          </Link>
          <Link to={Orders}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-[#30373E] ${
                location.pathname === Orders ? "bg-[#D6B59F]" : ""
              }`}
            >
              <button>Orders</button>
            </li>
          </Link>
          <Link to={User}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-[#30373E] ${
                location.pathname === User ? "bg-[#D6B59F]" : ""
              }`}
            >
              <button>Users</button>
            </li>
          </Link>
        </ul>
        <Link to="/">
          <div className="absolute bottom-16 left-12 text-xl text-[#30373E]">
            <p>Go to Shop</p>
            <img
              className="ml-8 mt-3"
              width="44"
              height="44"
              src="https://img.icons8.com/dusk/64/shopify.png"
              alt="shopify"
            />
          </div>
        </Link>
      </aside>
    </>
  );
}
