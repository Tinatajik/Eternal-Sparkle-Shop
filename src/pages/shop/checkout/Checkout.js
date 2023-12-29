import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function Checkout() {
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-5 items-center mt-10 font-bold text-[#30373E]">
          <h2 className="text-2xl mb-4">Finalize the purchase</h2>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <label>First Name :</label>
              <input
                type="text"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${InputButton} ${
                  formik.touched.firstname && formik.errors.firstname
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <div className="text-red-500">{formik.errors.firstname}</div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>Last Name :</label>
              <input
                type="text"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${InputButton} ${
                  formik.touched.lastname && formik.errors.lastname
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className="text-red-500">{formik.errors.lastname}</div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <label>Address :</label>
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${InputButton} ${
                  formik.touched.address && formik.errors.address
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500">{formik.errors.address}</div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>Phone Number :</label>
              <input
                type="text"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${InputButton} ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="text-red-500">{formik.errors.phoneNumber}</div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <label>Username :</label>
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${InputButton} ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500">{formik.errors.username}</div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>Password :</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${InputButton} ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 w-1/6 items-center">
            <label>Delivery Date :</label>
            <input
              type="date"
              name="deliveryDate"
              value={formik.values.deliveryDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${InputButton} ${
                formik.touched.deliveryDate && formik.errors.deliveryDate
                  ? "border-red-500 "
                  : ""
              }`}
            />
            {formik.touched.deliveryDate && formik.errors.deliveryDate && (
              <div className="text-red-500">{formik.errors.deliveryDate}</div>
            )}
          </div>
          <div className="bg-[#D6B59F] text-[#30373E] text-xl font-bold py-2 px-5 rounded-lg mt-10">
            <button type="submit">Pay</button>
          </div>
        </div>
      </form>
    </>
  );
}

const InputButton = "bg-[#EEE8E3] px-2 py-1 outline-none rounded-md";
