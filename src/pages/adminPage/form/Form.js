import { Link } from "react-router-dom";
export default function Form() {
  return (
    <>
      <form className="flex flex-col justify-center items-center gap-8 ">
        <div className="w-[30%] flex flex-col mt-12 gap-3 text-[#0D3B66] text-xl font-bold ">
          <p className="text-center mb-6">
            Welcome back! Log into your account below to continue.
          </p>
          <label>User Name</label>
          <input
            type="text"
            className="p-2 bg-[#F4D35E] outline-none rounded-md"
          />
          <label>Password</label>
          <input
            type="text"
            className="p-2 bg-[#F4D35E] outline-none rounded-md"
          />
        </div>
        <Link to="/panelManagment">
          <button className="bg-[#EE964B]  text-[#0D3B66] text-xl font-bold py-2 px-5 rounded-lg">
            LOG IN
          </button>
        </Link>
      </form>
    </>
  );
}
