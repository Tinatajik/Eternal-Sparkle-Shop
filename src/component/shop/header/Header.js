import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartPage, LoginAdmin } from "../../../router/path-route/PathRoute";
import SearchModal from "../../../modal/shop/search/Search";
export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <img src="./Image/logo.jpg" />
          </Link>
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
          <Link to={CartPage}>
            <button>
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/pulsar-color/48/shopping-bag.png"
                alt="shopping-bag"
              />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
