import React from "react";

const NavModalAbout = ({ onMouseEnterAbout, onMouseLeaveAbout }) => {
  return (
    <div
      className=" absolute top-[100%] z-20 bg-[#D6B59F] text-[#0D3B66] font-bold w-1/7 px-5 py-2 text-center"
      onMouseEnter={onMouseEnterAbout}
      onMouseLeave={onMouseLeaveAbout}
    >
      <div className="flex flex-col gap-2  ">
        <p className="cursor-pointer">Story</p>
        <p className="cursor-pointer">FAQ</p>
        <p className="cursor-pointer">About Us</p>
        <p className="cursor-pointer">Appointments</p>
      </div>
    </div>
  );
};

export default NavModalAbout;
