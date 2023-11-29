export default function MainProduct() {
  return (
    <>
      <div className="flex mt-10 ml-20 gap-10">
        <img
          className="w-[25%]"
          src="https://andriabarbone.com/cdn/shop/files/AB_jen_2.95_front-web_460x.jpg?v=1699909569"
        />
        <div className="flex flex-col gap-4 text-lg text-[#F95738] font-bold mt-6">
          <h2 className="text-2xl">Maria Anders</h2>
          <p>OLD EUROPEAN CUT</p>
          <p>250 $</p>
          <div className="flex gap-4 bg-[#0D3B66] w-1/2 justify-center px-3 py-1 mt-4 rounded-lg text-[#F4D35E] ml-9">
            <button>+</button>
            <button>1</button>
            <button>-</button>
          </div>
          <button className="bg-[#F4D35E] text-[#0D3B66] mt-5 rounded-lg text-lg font-bold py-1">
            Add To Cart
          </button>
        </div>
        <div className="text-[#0D3B66] font-bold ml-10 p-5 w-1/2 mt-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </>
  );
}
