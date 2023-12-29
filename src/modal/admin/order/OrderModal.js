import React from "react";
import axios from "axios";

const OrderModal = ({ isOpen, closeModal, orderDetails, productDetails }) => {
  const handleDeliver = async () => {
    try {
      console.log("Order Details:", orderDetails);
      console.log("Product Details Array:", productDetails.length);

      const response = await axios.patch(
        `http://localhost:8000/api/orders/${orderDetails.id}`,
        { deliveryStatus: true }
      );
      console.log("API Response:", response.data);
      console.log("Delivered Button Clicked. API Response:", response.data);

      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  console.log(
    "Product IDs in Order:",
    orderDetails.products.map((p) => p.product)
  );

  console.log("Product Details Array:", productDetails);
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed z-20 inset-0 overflow-y-auto`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
            isOpen ? "sm:w-full" : "sm:w-0"
          }`}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Order Details
            </h3>
            <div className="mt-2">
              <p>
                <span className="font-bold">User Name:</span>{" "}
                {orderDetails.username || "N/A"}
              </p>
              <p>
                <span className="font-bold">Address:</span>{" "}
                {orderDetails.address || "N/A"}
              </p>
              <p>
                <span className="font-bold">Phone Number:</span>{" "}
                {orderDetails.phoneNumber || "N/A"}
              </p>
              <p>
                <span className="font-bold">Time of Order:</span>{" "}
                {new Date(orderDetails.createdAt).toLocaleString()}
              </p>
              {orderDetails.deliveryStatus && (
                <p>
                  <span className="font-bold">Delivery Date:</span>{" "}
                  {new Date(orderDetails.deliveryDate).toLocaleString()}
                </p>
              )}
              <h3 className="text-lg font-bold mt-4">Ordered Products:</h3>
              <table className="border-collapse border-2 border-[#D6B59F] text-[#30373E] w-full mt-2">
                <thead>
                  <tr className="border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1">
                    <th className="border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1">
                      Name
                    </th>
                    <th className="border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1">
                      Price
                    </th>
                    <th className="border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.products.map((product) => {
                    const productDetail = productDetails.find((detail) => {
                      const orderProductId = Array.isArray(product.product)
                        ? product.product[0]
                        : product.product;
                      return detail._id === orderProductId;
                    });

                    console.log(
                      "Product IDs in Order:",
                      product.product,
                      "Product Details:",
                      productDetail
                    );

                    const productName = productDetail?.name || "N/A";
                    const productPrice =
                      productDetail?.price !== undefined
                        ? `${productDetail.price} $`
                        : "N/A";
                    const productCount =
                      product.count !== undefined ? product.count : "N/A";

                    return (
                      <tr key={product._id}>
                        <td className="border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1">
                          {productName}
                        </td>
                        <td className="border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1">
                          {productPrice}
                        </td>
                        <td className="border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1">
                          {productCount}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {orderDetails.deliveryStatus === false && (
              <button
                type="button"
                onClick={handleDeliver}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Delivered
              </button>
            )}
            <button
              type="button"
              onClick={closeModal}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
