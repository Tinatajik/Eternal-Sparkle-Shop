import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartPage, LoginAdmin } from "../../../router/path-route/PathRoute";
import SearchModal from "../../../modal/shop/search/Search";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center px-12 mt-5">
        <div>
          <img
            onClick={openModal}
            className="cursor-pointer"
            width="35"
            height="35"
            src="https://img.icons8.com/dusk/64/search--v1.png"
            alt="search--v1"
          />
        </div>
        {isModalOpen && <SearchModal onClose={closeModal} />}
        <div className="w-[15%] ml-20">
          <Link to="/">
            <img src="./Image/logo.png" />
          </Link>
        </div>

        <div className="flex gap-4 relative">
          <Link to={LoginAdmin}>
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ultraviolet/40/gender-neutral-user.png"
              alt="gender-neutral-user"
            />
          </Link>
          <Link to={CartPage}>
            <button className="relative">
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/pulsar-color/48/shopping-bag.png"
                alt="shopping-bag"
              />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
