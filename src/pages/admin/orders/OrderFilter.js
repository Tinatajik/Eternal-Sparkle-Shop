import React from "react";

const OrderFilter = ({ handleStatusChange, selectedStatus }) => (
  <div className="flex gap-5">
    <div className="flex gap-3">
      <input
        type="radio"
        id="Delivered"
        name="orderStatus"
        value={true}
        checked={selectedStatus === true}
        onChange={() => handleStatusChange(true)}
      />
      <label htmlFor="Delivered">Delivered orders</label>
    </div>
    <div className="flex gap-3">
      <input
        type="radio"
        id="Pending"
        name="orderStatus"
        value={false}
        checked={selectedStatus === false}
        onChange={() => handleStatusChange(false)}
      />
      <label htmlFor="Pending">Pending orders</label>
    </div>
  </div>
);

export default OrderFilter;
