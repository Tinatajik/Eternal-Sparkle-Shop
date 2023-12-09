import NavModalAbout from "../../../modal/shop/NavModal/NavModalAbout";
import NavModalShop from "../../../modal/shop/NavModal/NavModalShop";
import { useState } from "react";

export default function NavBar() {
  const [isModalOpen, setModalOpenShop] = useState(false);

  const handleShopHoverEnter = () => {
    setModalOpenShop(true);
  };

  const handleModalMouseEnter = () => {
    setModalOpenShop(true);
  };

  const handleModalMouseLeave = () => {
    setModalOpenShop(false);
  };
  const [isModalOpenAbout, setModalOpenAbout] = useState(false);

  const handleShopHoverEnterAbout = () => {
    setModalOpenAbout(true);
  };

  const handleModalMouseEnterAbout = () => {
    setModalOpenAbout(true);
  };

  const handleModalMouseLeaveAbout = () => {
    setModalOpenAbout(false);
  };
  return (
    <>
      <div className="flex justify-center mt-4 py-5 gap-7 bg-[#0D3B66] text-[#F4D35E] relative">
        <div
          className="ml-20 cursor-pointer hover:text-[#F95738]"
          onMouseEnter={handleShopHoverEnter}
        >
          SHOP
        </div>
        {isModalOpen && (
          <NavModalShop
            onMouseEnter={handleModalMouseEnter}
            onMouseLeave={handleModalMouseLeave}
          />
        )}
        <div
          className=" cursor-pointer hover:text-[#F95738] ml-4"
          onMouseEnter={handleShopHoverEnterAbout}
        >
          ABOUT
        </div>
        {isModalOpenAbout && (
          <NavModalAbout
            onMouseEnterAbout={handleModalMouseEnterAbout}
            onMouseLeaveAbout={handleModalMouseLeaveAbout}
          />
        )}
        <div className=" cursor-pointer hover:text-[#F95738]">
          SHOP INSTAGRAM
        </div>
      </div>
    </>
  );
}
