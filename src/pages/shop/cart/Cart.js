import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  addToCart,
} from "../../../redux/shop/cartSlice";
import { ProductCart } from "./ProductCart";
import { CheckoutPage } from "../../../router/path-route/PathRoute";
import { Link } from "react-router-dom";

const tableStyle = "border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <>
      <div className="w-full">
        <div className="flex justify-center items-center mt-10">
          <table className="border-collapse border-2 border-[#F95738] text-[#30373E] ">
            <thead>
              <tr className={tableStyle}>
                <th className={tableStyle}>Image</th>
                <th className={tableStyle}>Product Name</th>
                <th className={tableStyle}>Prices</th>
                <th className={tableStyle}>Quantity</th>
                <th className={tableStyle}></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <ProductCart
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.thumbnail}
                  quantity={item.quantity}
                  onRemove={() => dispatch(removeFromCart(item))}
                  onIncrease={() => dispatch(increaseQuantity(item))}
                  onDecrease={() => dispatch(decreaseQuantity(item))}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className=" flex flex-col justify-center items-center mt-10 bg-[#F6F4F2] text-[#30373E] font-bold">
          <div className="flex justify-between w-[30%]">
            <p>SUBTOTAL</p>
            <p>{`${calculateSubtotal()} $`}</p>
          </div>
          <Link to={CheckoutPage}>
            <button
              disabled={isCartEmpty}
              className={`mt-14 mb-7 font-extrabold w-full px-32 bg-[#D6B59F] text-[#30373E]  py-1 rounded-lg
              ${isCartEmpty && "opacity-50 cursor-not-allowed"} `}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
