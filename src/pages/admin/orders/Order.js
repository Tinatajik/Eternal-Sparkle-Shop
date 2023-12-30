import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Header from "../../../component/admin/header/Header";
import { useNavigate, useLocation } from "react-router-dom";
import {
  setOrders,
  setSelectedStatus,
  setTotalPages,
  setCurrentPage,
} from "../../../redux/admin/slices/OrderSlice";
import OrderModal from "../../../modal/admin/order/OrderModal";
import OrderTable from "./OrderTable";
import Pagination from "../../../component/pagination/Pagination";
import OrderFilter from "./OrderFilter";

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { orders, selectedStatus, totalPages, currentPage } = useSelector(
    (state) => state.order
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1;

    dispatch(setCurrentPage(currentPage));
  }, [location.search, dispatch]);

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

                  return {
                    ...order,
                    username,
                    address: userResponse.data.data.user.address,
                    phoneNumber: userResponse.data.data.user.phoneNumber,
                  };
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

          const products = await fetchProductDetails();
          setProductDetails(products);

          dispatch(setOrders(ordersWithUsernames));
          dispatch(setTotalPages(response.data.total_pages));
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
  }, [selectedStatus, currentPage, dispatch]);

  const handleStatusChange = (status) => {
    dispatch(setSelectedStatus(status));
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

  const fetchProductDetails = async () => {
    try {
      let allProducts = [];
      let currentPage = 1;
      let totalPages = 1;
      while (currentPage <= totalPages) {
        const productResponse = await axios.get(
          `http://localhost:8000/api/products?page=${currentPage}`
        );

        console.log(
          `Product API Response - Page ${currentPage}:`,
          productResponse.data
        );

        const products = productResponse.data?.data?.products || [];
        allProducts = [...allProducts, ...products];

        totalPages = productResponse.data?.total_pages || 1;

        currentPage++;
      }

      return allProducts;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return [];
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="absolute top-10 w-full">
        <div className="flex justify-end mt-14 mr-14">
          <OrderFilter
            handleStatusChange={handleStatusChange}
            selectedStatus={selectedStatus}
          />
        </div>
        <div className="flex justify-center items-center mt-16">
          <OrderTable orders={orders} openModal={openModal} />
        </div>
        <Pagination
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>

      {selectedOrder && (
        <OrderModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          orderDetails={{
            id: selectedOrder._id,
            ...selectedOrder,
            deliveryDate: selectedOrder.deliveryDate,
          }}
          productDetails={productDetails}
        />
      )}
    </>
  );
}
