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
      <div className="flex justify-around mt-5">
        <div>Panel Management</div>
        <Nav handleClick={handleNavClick} selectedComponent={selectedComponent} />
        <Link to="/adminPage">back AdminPage</Link>
      </div>
      {renderComponent()}
    </>
  );
}