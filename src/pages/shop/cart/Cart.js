import { Link } from "react-router-dom";
import { CheckoutPage } from "../../../router/path-route/PathRoute";
import { ProductCart } from "./ProductCart";

const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";

export default function Cart() {
  return (
    <>
      <div className="w-full">
        <div className="flex justify-center items-center mt-10">
          <table className="border-collapse border-2 border-[#F95738] text-[#0D3B66] ">
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
              <ProductCart
                id={1}
                name="LuLu"
                price="200$"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfGjPyeQl281wzhqN2dUlMGOZnv7TaOMoHjA&usqp=CAU"
              />
            </tbody>
          </table>
        </div>
        <div className=" flex flex-col justify-center items-center mt-10 bg-[#faf0ca] text-[#0D3B66] font-bold">
          <div className="flex justify-between w-[30%]">
            <p>SUBTOTAL</p>
            <p>50.000 $</p>
          </div>
          <Link to={CheckoutPage}>
            <button className="mt-14 mb-7 font-extrabold w-full px-32 bg-[#F4D35E] py-1 rounded-lg">
              Checkout
            </button>
          </Link>
        </div>
        <div className="flex justify-center items-center mt-2">
          <button className="mx-2">Prev</button>
          <span>{/* Page {currentPage} of {totalPages} */}</span>
          <button className="mx-2">Next</button>
        </div>
      </div>
    </>
  );
}
