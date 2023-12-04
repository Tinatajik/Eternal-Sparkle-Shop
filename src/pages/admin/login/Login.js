import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/admin/AuthSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthApi } from "../../../api/api";
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(AuthApi, {
        username,
        password,
      });
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
          <label>User Name</label>
          <input
            type="text"
            className="p-2 bg-[#F4D35E] outline-none rounded-md"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 bg-[#F4D35E] outline-none rounded-md"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-[#EE964B]  text-[#0D3B66] text-xl font-bold py-2 px-5 rounded-lg"
        >
          LOG IN
        </button>
      </div>
    </>
  );
};

export default LoginForm;
