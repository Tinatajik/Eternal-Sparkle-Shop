import React from "react";

const NavModalShop = ({ onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className=" absolute top-[100%] z-20 bg-[#EE964B] text-[#0D3B66] font-bold w-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex m-5 justify-evenly text-center ml-28 ">
        <div className="flex flex-col gap-2  ">
          <h2 className="text-[#FAF0CA] text-lg mb-1 font-semibold">JEWELRY</h2>
          <p className="cursor-pointer">Earrings</p>
          <p className="cursor-pointer">Pendants</p>
          <p className="cursor-pointer">Necklaces</p>
          <p className="cursor-pointer">Bracelets</p>
        </div>

        <div className="flex flex-col gap-2  ">
          <h2 className="text-[#FAF0CA] text-lg mb-1 font-semibold">
            DIAMOND SHAPE
          </h2>
          <p className="cursor-pointer">OLD EUROPEAN CUT</p>
          <p className="cursor-pointer">OLD MINE CUT</p>
          <p className="cursor-pointer">PEAR CUT</p>
          <p className="cursor-pointer">MARQUISE & OVAL CUT</p>
          <p className="cursor-pointer">EMERALD & ASSCHER CUT</p>
        </div>

        <div className="flex flex-col gap-2  ">
          <h2 className="text-[#FAF0CA] text-lg mb-1 font-semibold">STONE</h2>
          <p className="cursor-pointer">Sapphires</p>
          <p className="cursor-pointer">Emeralds</p>
          <p className="cursor-pointer">Rubies</p>
          <p className="cursor-pointer">Onyx</p>
          <p className="cursor-pointer">Unique Gem Stones</p>
        </div>
      </div>
    </div>
  );
};

export default NavModalShop;
