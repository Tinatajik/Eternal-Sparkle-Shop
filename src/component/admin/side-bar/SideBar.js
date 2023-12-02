import { Link } from "react-router-dom";
import {
  CategoriesAdmin,
  HomeAdmin,
  Orders,
  Stock,
  SubCategoriesAdmin,
  User,
} from "../../../router/path-route/PathRoute";

export default function SideBar() {
  return (
    <>
      <aside className="bg-[#0D3B66] text-[#EE964B]  text-lg w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block">
        <ul className=" flex flex-col">
          <Link to={HomeAdmin}>
            <li className=" w-full h-full py-3 px-4 border-b border-light-border bg-[#F4D35E]">
              <button> Dashboard</button>
            </li>
          </Link>
          <Link to={CategoriesAdmin}>
            <li className="w-full h-full py-3 px-4 border-b border-light-border ">
              <button>Categories</button>
            </li>
          </Link>
          <Link to={SubCategoriesAdmin}>
            <li className="w-full h-full py-3 px-4 border-b border-light-border">
              <button>Sub-Categories</button>
            </li>
          </Link>
          <Link to={Stock}>
            <li className="w-full h-full py-3 px-4 border-b border-light-border">
              <button>Stocks-Prices</button>
            </li>
          </Link>
          <Link to={Orders}>
            <li className="w-full h-full py-3 px-4 border-b border-300-border">
              <button>Orders</button>
            </li>
          </Link>
          <Link to={User}>
            <li className="w-full h-full py-3 px-4">
              <button>Users</button>
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
}
