export default function Products() {
  return (
    <>
      <div className="flex justify-around mt-10">
        <p>Product Managment</p>
        <button className="bg-[#0D3B66] text-[#F95738] text-lg px-3 py-2 font-bold">
          Add Product
        </button>
      </div>
      <div className="flex justify-center items-center mt-16">
        <table className="border-collapse border-2 border-[#F95738] text-[#0D3B66] ">
          <tr className={tableStyle}>
            <th className={tableStyle}>Image</th>
            <th className={tableStyle}>Product Name</th>
            <th className={tableStyle}>Category</th>
            <th className={tableStyle}></th>
          </tr>
          <tr>
            <td className={tableStyle}>
              <img
                className="w-[5rem]"
                src="https://andriabarbone.com/cdn/shop/files/AB_jen_2.95_front-web_460x.jpg?v=1699909569"
              />
            </td>
            <td className={tableStyle}>Maria Anders</td>
            <td className={tableStyle}>OLD EUROPEAN CUT</td>
            <td className={tableStyle}>
              <div className="flex gap-3">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td className={tableStyle}>
              <img
                className="w-[5rem]"
                src="https://andriabarbone.com/cdn/shop/files/AB_jen_2.95_front-web_460x.jpg?v=1699909569"
              />
            </td>
            <td className={tableStyle}>Maria Anders</td>
            <td className={tableStyle}>OLD EUROPEAN CUT</td>
            <td className={tableStyle}>
              <div className="flex gap-3">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}
const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";
