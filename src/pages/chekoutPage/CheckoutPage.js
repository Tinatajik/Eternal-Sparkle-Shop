import { Link } from "react-router-dom";
import React from "react";
export default function CheckoutPage() {
  const handlePaymentClick = () => {
    window.location.href = 'http://localhost:3001/';
  };
  return (
    <>
      <div className="flex flex-col gap-5 items-center mt-10 font-bold text-[#0D3B66]">
        <h2 className="text-2xl mb-4">Finalize the purchase</h2>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label>First Name :</label>
            <input type="text" className={InputButton} />
          </div>
          <div className="flex flex-col gap-1">
            <label>Last Name :</label>
            <input type="text" className={InputButton} />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label>Address :</label>
            <input type="text" className={InputButton} />
          </div>
          <div className="flex flex-col gap-1">
            <label>Phone :</label>
            <input type="number" className={InputButton} />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-1/6 items-center">
          <label>Delivery Date :</label>
          <input type="date" className={InputButton} />
        </div>
        <div className="bg-[#EE964B]  text-[#0D3B66] text-xl font-bold py-2 px-5 rounded-lg mt-10">
            <button onClick={handlePaymentClick}>Pay</button>
        </div>
      </div>
    </>
  );
}

const InputButton = "bg-[#F4D35E] px-2 py-1 outline-none rounded-md";
