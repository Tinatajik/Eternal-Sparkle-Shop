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
      <aside className="bg-[#0D3B66] text-[#EE964B] z-20 text-lg w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block">
        <ul className="flex flex-col">
          <Link to={HomeAdmin}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-light-border ${
                location.pathname === HomeAdmin ? "bg-[#F4D35E]" : ""
              }`}
            >
              <button> Dashboard</button>
            </li>
          </Link>
          <Link to={ProductAdmin}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-light-border ${
                location.pathname === ProductAdmin ? "bg-[#F4D35E]" : ""
              }`}
            >
              <button>Product</button>
            </li>
          </Link>
          <Link to={CategoriesAdmin}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-light-border ${
                location.pathname === CategoriesAdmin ? "bg-[#F4D35E]" : ""
              }`}
            >
              <button>Categories</button>
            </li>
          </Link>
          <Link to={SubCategoriesAdmin}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-light-border ${
                location.pathname === SubCategoriesAdmin ? "bg-[#F4D35E]" : ""
              }`}
            >
              <button>Sub-Categories</button>
            </li>
          </Link>
          <Link to={Stock}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-light-border ${
                location.pathname === Stock ? "bg-[#F4D35E]" : ""
              }`}
            >
              <button>Stocks-Prices</button>
            </li>
          </Link>
          <Link to={Orders}>
            <li
              className={`w-full h-full py-3 px-4 border-b border-300-border ${
                location.pathname === Orders ? "bg-[#F4D35E]" : ""
              }`}
            >
              <button>Orders</button>
            </li>
          </Link>
          <Link to={User}>
            <li
              className={`w-full h-full py-3 px-4 ${
                location.pathname === User ? "bg-[#F4D35E]" : ""
              }`}
            >
              <button>Users</button>
            </li>
          </Link>
        </ul>
        <Link to="/">
          <div className="absolute bottom-20 left-12 text-xl text-[#FAF0CA]">
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
