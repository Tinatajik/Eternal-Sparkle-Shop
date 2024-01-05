import React from "react";

const CheckoutForm = ({ formik, handlePaymentClick }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      formik.handleSubmit(e);
    }}
  >
    <div className="bg-[#D6B59F] text-[#30373E] text-xl font-bold py-2 px-5 rounded-lg mt-10">
      <button type="submit">Pay</button>
    </div>
  </form>
);

export default CheckoutForm;
