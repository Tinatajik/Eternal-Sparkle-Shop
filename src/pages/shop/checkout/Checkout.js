import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "./InputField";
import CheckoutForm from "./CheckoutForm";

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .required("First Name is required"),
  lastname: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .required("Last Name is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  username: Yup.string().required("Username is required").trim(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    )
    .required("Password is required"),
  deliveryDate: Yup.date()
    .min(new Date(), "Delivery Date must be today or later")
    .required("Delivery Date is required"),
});

const Checkout = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const handlePaymentClick = () => {
    window.location.href = "http://localhost:3001/";
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Data being sent:", JSON.stringify(values));
      const userResponse = await axios.post(
        "http://localhost:8000/api/users",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjlhYmU0MmJlMTA0ZTFmMmVlOWVmYyIsImlhdCI6MTcwMjU4OTQ4NSwiZXhwIjoxNzA1MTgxNDg1fQ.hQ5rfFFO47ZuiDU5i-3PXC4GT-59o6R3TZXuJTUyXSc`,
          },
        }
      );

      console.log("User API Response:", userResponse.data);

      if (userResponse.data && userResponse.data.status === "success") {
        const lastUserId = userResponse.data.data.user._id;
        console.log("User created. User ID:", lastUserId);

        localStorage.setItem(
          "userData",
          JSON.stringify(userResponse.data.data.user)
        );

        const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

        if (cartProducts && cartProducts.length > 0) {
          console.log("Payment successful!");
          handlePaymentClick();
        } else {
          console.error("No product card found in local storage");
        }
      } else {
        console.error("User creation failed");
        toast.error("User creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      phoneNumber: "",
      username: "",
      password: "",
      deliveryDate: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-5 items-center mt-10 font-bold text-[#30373E]">
        <h2 className="text-2xl mb-4">Finalize the purchase</h2>
        <div className="flex gap-4">
          <InputField
            name="firstname"
            label="First Name"
            type="text"
            formik={formik}
          />
          <InputField
            name="lastname"
            label="Last Name"
            type="text"
            formik={formik}
          />
        </div>
        <div className="flex gap-4">
          <InputField
            name="address"
            label="Address"
            type="text"
            formik={formik}
          />
          <InputField
            name="phoneNumber"
            label="Phone Number"
            type="text"
            formik={formik}
          />
        </div>
        <div className="flex gap-4">
          <InputField
            name="username"
            label="Username"
            type="text"
            formik={formik}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            formik={formik}
          />
        </div>
        <InputField
          name="deliveryDate"
          label="Delivery Date"
          type="date"
          formik={formik}
        />
        <CheckoutForm formik={formik} handlePaymentClick={handlePaymentClick} />
      </div>
    </>
  );
};

export default Checkout;
