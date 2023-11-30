import React from "react";

const Nav = ({ handleClick, selectedComponent }) => {
  return (
    <div className="flex gap-5 border-2 px-4 py-2 text-[#0D3B66] border-[#EE964B] font-bold text-lg">
      <button
        onClick={() => handleClick("Products")}
        className={selectedComponent === "Products" ? "active" : ""}
      >
        Products |
      </button>
      <button
        onClick={() => handleClick("StocksPrices")}
        className={selectedComponent === "StocksPrices" ? "active" : ""}
      >
        Stocks & Prices |
      </button>
      <button
        onClick={() => handleClick("Orders")}
        className={selectedComponent === "Orders" ? "active" : ""}
      >
        Orders
      </button>
    </div>
  );
};

export default Nav;