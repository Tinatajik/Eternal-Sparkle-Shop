import React from "react";

const tableStyle = "border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1";

const OrderTable = ({ orders, openModal }) => (
  <table className="border-collapse border-2 border-[#D6B59F] text-[#30373E]">
    <thead>
      <tr className={tableStyle}>
        <th className={tableStyle}>User Name</th>
        <th className={tableStyle}>Total Price</th>
        <th className={tableStyle}>Order registration time</th>
        <th className={tableStyle}></th>
      </tr>
    </thead>
    <tbody>
      {orders.length > 0 ? (
        orders.map((order) => (
          <tr key={order.id}>
            <td className={tableStyle}>{order.username}</td>
            <td className={tableStyle}>{order.totalPrice} $</td>
            <td className={tableStyle}>
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </td>
            <td className={tableStyle}>
              <button onClick={() => openModal(order)}>Check the order</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td className={tableStyle} colSpan="4">
            No orders available.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default OrderTable;
