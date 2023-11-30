import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./nav/Nav";
import Products from "./products/Products";
import StocksPrices from "./stocks-prices/StocksPrices";
import Orders from "./order/Orders";

export default function PanelManagment() {
  const [selectedComponent, setSelectedComponent] = useState("Products");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Products":
        return <Products />;
      case "StocksPrices":
        return <StocksPrices />;
      case "Orders":
        return <Orders />;
      default:
        return null;
    }
  };

  const handleNavClick = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <>
      <div className="flex justify-around items-center mt-5 p-5">
        <Link to="/adminPage"><img width="60" height="60" src="https://img.icons8.com/bubbles/50/back.png" alt="back"/></Link>
        <Nav handleClick={handleNavClick} selectedComponent={selectedComponent} />
        <div><img width="60" height="60" src="https://img.icons8.com/stickers/100/management.png" alt="management"/></div></div>
      {renderComponent()}
    </>
  );
}