import Category from "./Category";
import ShopLatest from "./ShopLatest";

export default function Main() {
  return (
    <>
      <div className="">
        <img
          className="relative"
          src="https://www.stoneandstrand.com/cdn/shop/files/Ring_Stack_Website_Banner_1440x.png?v=1698953067"
        />
        <div className="absolute mt-[-10rem] right-28 flex flex-col justify-center items-center gap-5 text-[#F4D35E]  font-bold text-xl">
          <p className=" ">ALWAYS SEEKING THE RARE & BEAUTIFUL</p>
          <button className="bg-[#0D3B66] w-1/2 py-2 rounded-lg">
            SHOP NOW
          </button>
        </div>
      </div>
      <Category />
      <div className="w-full bg-[#0D3B66] flex justify-center items-center mt-5">
        <p className="w-[40%]  text-[#F4D35E] text-lg p-6">
          They say you should always ask someone about their values on a first
          date, so here are ours. We make our pieces at the same places other
          premium brands do, so you're getting that high-level quality — but
          without the high-level price. You're welcome.
        </p>
      </div>
      <ShopLatest />
    </>
  );
}
