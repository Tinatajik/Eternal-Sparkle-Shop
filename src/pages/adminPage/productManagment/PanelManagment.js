import { Link } from "react-router-dom";
import Nav from "./nav/Nav";
import Products from "./products/Products";
import StocksPrices from "./stocks-prices/StocksPrices";
import Orders from "./order/Orders";
export default function PanelManagment() {
  return (
    <>
      <div className="flex justify-around mt-5">
        <div>Panel Managment</div>
        <Nav />
        <Link to="/adminPage">back AdminPage</Link>
      </div>
      {/* <Products /> */}
      {/* <StocksPrices /> */}
      <Orders />
    </>
  );
}
