import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/admin/AuthSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthApi } from "../../../api/api";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    ),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(AuthApi, values);
      dispatch(loginSuccess(response.data));

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });

      setTimeout(() => {
        navigate("/HomeAdmin");
      }, 1500);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center gap-8 mb-12 mt-4 ml-12">
        <div className="w-[30%] flex flex-col mt-12 gap-3 text-[#0D3B66] text-xl font-bold ">
          <p className="text-center mb-6">
            Welcome back! Log into your account below to continue.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="flex flex-col ">
                <div className="flex flex-col gap-2">
                  <label>User Name</label>
                  <Field
                    type="text"
                    name="username"
                    className="p-2 bg-[#F4D35E] outline-none rounded-md"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <label>Password</label>
                  <Field
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    className="p-2 bg-[#F4D35E] outline-none rounded-md"
                  />
                  <img
                    className="absolute ml-[21rem] mt-10 cursor-pointer"
                    width="38"
                    height="38"
                    src={
                      passwordVisible
                        ? "https://img.icons8.com/color/48/invisible.png"
                        : "https://img.icons8.com/color/48/visible.png"
                    }
                    alt="visible--v1"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#EE964B]  text-[#0D3B66] text-xl font-bold flex justify-center py-2 px-5 rounded-lg w-1/2 mt-8 ml-[6rem]"
                >
                  LOG IN
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
