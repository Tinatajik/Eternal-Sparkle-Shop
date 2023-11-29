export default function Orders() {
  return (
    <>
      <div className="flex justify-around mt-10">
        <p>Order Managment</p>
        <div className="flex gap-5">
          <div className="flex gap-3 ">
            <input
              type="radio"
              id="Delivered"
              name="Delivered"
              value="Delivered"
            />
            <label for="Delivered">Delivered orders</label>
          </div>
          <div className="flex gap-3 ">
            <input type="radio" id="Pending" name="Pending" value="Pending" />
            <label for="Pending">Pending orders</label>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-16">
        <table className="border-collapse border-2 border-[#F95738] text-[#0D3B66] ">
          <tr className={tableStyle}>
            <th className={tableStyle}>User Name</th>
            <th className={tableStyle}>Total Price</th>
            <th className={tableStyle}>Order registration time</th>
            <th className={tableStyle}></th>
          </tr>
          <tr>
            <td className={tableStyle}>Tina Tajik</td>
            <td className={tableStyle}>250$</td>
            <td className={tableStyle}>2023/10/23</td>
            <td className={tableStyle}>
              <button>Check the order</button>
            </td>
          </tr>
          <tr>
            <td className={tableStyle}>Ayhan Azadi</td>
            <td className={tableStyle}>130$</td>
            <td className={tableStyle}>2023/09/11</td>
            <td className={tableStyle}>
              <button>Check the order</button>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}
const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";
