import Header from "../../../component/admin/header/Header";
const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";
export default function StocksPrices() {
  return (
    <>
      <Header />
      <div className="absolute top-10 left-[20rem]">
        <div className="flex justify-around mt-10">
          <p>Stocks Prices Managment</p>
          <button className="bg-[#0D3B66] text-[#F95738] text-lg px-3 py-2 font-bold">
            Save
          </button>
        </div>
        <div className="flex justify-center items-center mt-16">
          <table className="border-collapse border-2 border-[#F95738] text-[#0D3B66] ">
            <tr className={tableStyle}>
              <th className={tableStyle}>Image</th>
              <th className={tableStyle}>Product Name</th>
              <th className={tableStyle}>Prices</th>
              <th className={tableStyle}>Stocks</th>
            </tr>
            <tr>
              <td className={tableStyle}>
                <img
                  className="w-[5rem]"
                  src="https://andriabarbone.com/cdn/shop/files/AB_jen_2.95_front-web_460x.jpg?v=1699909569"
                />
              </td>
              <td className={tableStyle}>Maria Anders</td>
              <td className={tableStyle}>400$</td>
              <td className={tableStyle}>100</td>
            </tr>
            <tr>
              <td className={tableStyle}>
                <img
                  className="w-[5rem]"
                  src="https://andriabarbone.com/cdn/shop/files/AB_jen_2.95_front-web_460x.jpg?v=1699909569"
                />
              </td>
              <td className={tableStyle}>Maria Anders</td>
              <td className={tableStyle}>555$</td>
              <td className={tableStyle}>40</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
