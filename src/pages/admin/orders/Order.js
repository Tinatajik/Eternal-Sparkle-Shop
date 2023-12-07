import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../component/admin/header/Header";

const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders?page=${currentPage}&limit=${limit}`
        );
        console.log("API Response:", response.data);

        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.orders)
        ) {
          const ordersWithUsernames = await Promise.all(
            response.data.data.orders.map(async (order) => {
              console.log("Fetching user details for order:", order);
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

          setOrders(ordersWithUsernames);
        } else {
          console.error(
            'Invalid response format. Expected an array under the "data.orders" property.'
          );
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentPage, limit]);

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get("page");
    const limitParam = new URLSearchParams(location.search).get("limit");

    const page = pageParam ? parseInt(pageParam) : 1;
    const newLimit = limitParam ? parseInt(limitParam) : limit;

    setCurrentPage(page);
    setLimit(newLimit);
  }, [location.search, limit]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    updateUrl(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    updateUrl(prevPage);
  };

  const updateUrl = (page) => {
    navigate(`/orders?page=${page}&limit=${limit}`);
  };

  return (
    <>
      <Header />
      <div className="absolute top-10  w-full">
        <div className="flex justify-end mt-14 mr-14">
          <div className="flex gap-5">
            <div className="flex gap-3 ">
              <input
                type="radio"
                id="Delivered"
                name="Delivered"
                value="Delivered"
              />
              <label htmlFor="Delivered">Delivered orders</label>
            </div>
            <div className="flex gap-3 ">
              <input type="radio" id="Pending" name="Pending" value="Pending" />
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
                      {" "}
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
        <div className="flex justify-center mt-4">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span className="mx-2">Page {currentPage}</span>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Order;
