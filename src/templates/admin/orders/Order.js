import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../component/admin/header/Header";

const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1; // Provide a default value of 1

  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders?deliveryStatus=${selectedStatus}&page=${currentPage}&limit=3`
        );

        console.log("API Response:", response.data);

        if (
          response.data &&
          response.data.hasOwnProperty("total_pages") &&
          Array.isArray(response.data.data.orders)
        ) {
          const ordersWithUsernames = await Promise.all(
            response.data.data.orders.map(async (order) => {
              try {
                const userResponse = await axios.get(
                  `http://localhost:8000/api/users/${order.user}`
                );

                console.log("User API Response:", userResponse.data);

                if (userResponse.data.data.user?.hasOwnProperty("username")) {
                  const username = userResponse.data.data.user.username;
                  console.log("Username:", username);

                  return { ...order, username };
                } else {
                  console.error(
                    "Username not found in user response:",
                    userResponse.data
                  );
                  return order;
                }
              } catch (userError) {
                console.error(
                  `Error fetching user details for order ${order.id}:`,
                  userError
                );
                return order;
              }
            })
          );

          console.log("Orders with Usernames:", ordersWithUsernames);

          setOrders(ordersWithUsernames);

          // Set total pages
          setTotalPages(response.data.total_pages);
        } else {
          console.error(
            'Invalid response format. Expected an array under the "data.orders" property or "total_pages" in the response.'
          );
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [selectedStatus, currentPage]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    navigate(`?page=1`);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    navigate(`?page=${nextPage}`);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    navigate(`?page=${prevPage}`);
  };

  return (
    <>
      <Header />
      <div className="absolute top-10 w-full">
        <div className="flex justify-end mt-14 mr-14">
          <div className="flex gap-5">
            <div className="flex gap-3 ">
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
            <div className="flex gap-3 ">
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
        </div>
        <div className="flex justify-center items-center mt-16">
          <table className="border-collapse border-2 border-[#F95738] text-[#0D3B66] ">
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
                      <button>Check the order</button>
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
        </div>
        <div className="flex justify-center items-center mt-2">
          <button
            onClick={handlePrevPage}
            className="mx-2"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="mx-2"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
