export default function SearchModal({ onClose }) {
  return (
    <>
      <div className="w-full h-1/3  absolute top-0 left-0 z-30 bg-[#FAF0CA] flex justify-center items-center">
        {" "}
        <input
          className="px-6 py-2 bg-[#F4D35E] text-white w-1/3 focus:outline-none text-lg rounded-md border"
          type="text"
          placeholder="Search..."
        />
        <img
          className="absolute ml-[25rem]"
          width="30"
          height="30"
          src="https://img.icons8.com/dusk/64/search--v1.png"
          alt="search--v1"
        />
        <button
          onClick={onClose}
          className="absolute right-20 mt-1 cursor-pointer"
        >
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/color/48/cancel--v1.png"
            alt="cancel--v1"
          />
        </button>
      </div>
    </>
  );
}
