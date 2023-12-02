import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginAdmin } from "../../../router/path-route/PathRoute";
import Cart from "../../../templates/shop/cart/Cart";
export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  const handleCartButtonClick = () => {
    setShowCart(true);
  };
  useEffect(() => {
    setIsCheckoutPage();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center px-12 mt-5">
        <div>
          <img
            width="35"
            height="35"
            src="https://img.icons8.com/dusk/64/search--v1.png"
            alt="search--v1"
          />
        </div>
        <div className="w-[15%] ml-20">
          <img src="./Image/logo.jpg" />
        </div>
        <div className="flex gap-4">
          <Link to={LoginAdmin}>
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ultraviolet/40/gender-neutral-user.png"
              alt="gender-neutral-user"
            />
          </Link>
          <button onClick={handleCartButtonClick}>
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/pulsar-color/48/shopping-bag.png"
              alt="shopping-bag"
            />
          </button>
          {!isCheckoutPage && showCart && <Cart />}
        </div>
      </div>
    </>
  );
}