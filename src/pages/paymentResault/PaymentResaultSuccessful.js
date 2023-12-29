import React, { useEffect } from "react";
import axios from "axios";

const PaymentResaultSuccessful = () => {
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

    if (userData && cartProducts && cartProducts.length > 0) {
      const payload = {
        user: userData._id,
        products: cartProducts.map((product) => ({
          product: product._id,
          count: product.quantity,
        })),
        deliveryStatus: false,
      };

      axios
        .post("http://localhost:8000/api/orders", payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjlhYmU0MmJlMTA0ZTFmMmVlOWVmYyIsImlhdCI6MTcwMjU4OTQ4NSwiZXhwIjoxNzA1MTgxNDg1fQ.hQ5rfFFO47ZuiDU5i-3PXC4GT-59o6R3TZXuJTUyXSc`,
          },
        })
        .then((response) => {
          console.log("Order created:", response.data);
        })
        .catch((error) => {
          console.error("Error creating order:", error.message);
        });
      localStorage.removeItem("cartProducts");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col mt-8 gap-5 items-center justify-center text-2xl text-[#0D3B66] font-bold">
        <h2>Payment Result Successful</h2>
        <img
          className="rounded-lg"
          alt="Payment Result Successful"
          src="https://img.freepik.com/free-vector/flat-woman-paying-by-pos-terminal-refund-cashback_88138-785.jpg?w=740&t=st=1700753670~exp=1700754270~hmac=88ea86d3c1f19682c1063815cda2d3bd058fb91d9e763eff9d0657ded4b9f576"
        />
      </div>
    </>
  );
};

export default PaymentResaultSuccessful;
