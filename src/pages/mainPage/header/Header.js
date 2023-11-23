import { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../../../store/cart/Cart";
export default function Header() {
  const [showCart, setShowCart] = useState(false);

  const handleCartButtonClick = () => {
    setShowCart(true);
  };
  return (
    <>
      <div className="flex justify-between px-12 mt-5">
        <div>Search</div>
        <div>Logo</div>
        <div className="flex gap-4">
          <Link to="/adminPage">go to Admin Page</Link>
          <button onClick={handleCartButtonClick}>Cart</button>
          {showCart && <Cart />}
        </div>
      </div>
    </>
  );
}
