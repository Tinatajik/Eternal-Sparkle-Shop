import { Link } from "react-router-dom";
export default function Cart() {
  return (
    <>
      <div className="bg-[#faf0ca] text-[#0D3B66] font-bold absolute right-0 top-0 w-1/3 h-full z-10 ">
        <div className="flex flex-col gap-10 mt-5 px-7">
          <div className="flex justify-between">
            <p className="text-2xl">Shopping Cart</p>
            <button><img width="45" height="45" src="https://img.icons8.com/bubbles/50/back.png" alt="back"/></button>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex gap-5">
              <img
                className="w-1/4"
                src="https://andriabarbone.com/cdn/shop/files/AB_jen_2.95_front-web_460x.jpg?v=1699909569"
              />
              <div className="flex flex-col gap-4  text-[#F95738] font-bold mt-6">
                <div className="flex justify-between w-[17.5rem]">
                  <h2 className="text-lg">Maria Anders</h2>
                  <p>250 $</p>
                </div>
                <div className="flex gap-4 bg-[#0D3B66] w-1/3 justify-center py-1 mt-4 rounded-lg text-[#F4D35E]">
                  <button>+</button>
                  <button>1</button>
                  <button>-</button>
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <img
                className="w-1/4"
                src="https://andriabarbone.com/cdn/shop/files/AB_jen_2.95_front-web_460x.jpg?v=1699909569"
              />
              <div className="flex flex-col gap-4  text-[#F95738] font-bold mt-6">
                <div className="flex justify-between w-[17.5rem]">
                  <h2 className="text-lg">Maria Anders</h2>
                  <p>250 $</p>
                </div>
                <div className="flex gap-4 bg-[#0D3B66] w-1/3 justify-center py-1 mt-4 rounded-lg text-[#F4D35E]">
                  <button>+</button>
                  <button>1</button>
                  <button>-</button>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 bg-[#faf0ca] w-full">
            <div className="flex justify-between w-[30%]">
              <p>SUBTOTAL</p>
              <p>50.000 $</p>
            </div>
            <Link to="/checkoutPage">
              <button className="mt-14 mb-7 font-extrabold w-1/4 bg-[#F4D35E] py-1 rounded-lg ml-8">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
