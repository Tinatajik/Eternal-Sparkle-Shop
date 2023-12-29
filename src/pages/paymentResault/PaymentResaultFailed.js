import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/shop/cartSlice";

const PaymentResaultFailed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

    if (userData && cartProducts && cartProducts.length > 0) {
      addToCartFunction(cartProducts);
    }
  }, []);

  const addToCartFunction = (cartProducts) => {
    cartProducts.forEach((product) => {
      dispatch(addToCart(product));
    });
  };

  return (
    <>
      <div className="flex flex-col mt-8 gap-5 items-center justify-center text-2xl text-[#0D3B66] font-bold">
        <h2>Payment Result Failed</h2>
        <img
          className="rounded-lg"
          src="https://img.freepik.com/premium-vector/empty-states-illustration-concept_701961-3027.jpg?w=740"
          alt="Payment Result Failed"
        />
      </div>
    </>
  );
};

export default PaymentResaultFailed;
