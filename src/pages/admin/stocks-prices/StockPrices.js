import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../component/admin/header/Header";

const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";

const StocksPrices = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);

  const [error, setError] = useState(null);

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get("page");
    const limitParam = new URLSearchParams(location.search).get("limit");

    const page = pageParam ? parseInt(pageParam) : 1;
    const newLimit = limitParam ? parseInt(limitParam) : limit;

    setCurrentPage(page);
    setLimit(newLimit);
  }, [location.search, limit]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products?limit=${limit}&page=${currentPage}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch products. Status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("API Response:", data);

        const productList = data?.data?.products || [];
        setProducts(productList);
        setError(null);

        const totalItems = data?.total || 0;
        console.log("Total Items:", totalItems);

        const calculatedTotalPages = Math.ceil(totalItems / limit);
        console.log("Calculated Total Pages:", calculatedTotalPages);

        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, [currentPage, limit]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      updateUrl(nextPage);
    }
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    updateUrl(prevPage);
  };

  const updateUrl = (page) => {
    navigate(`/stock?page=${page}&limit=${limit}`);
  };

  return (
    <>
      <Header />
      <div className="absolute top-10 w-full">
        <div className="flex justify-end mt-10">
          <button className="bg-[#F95738] text-[#0D3B66] rounded-lg text-lg px-3 py-2 font-bold absolute right-24 top-20">
            Save
          </button>
        </div>
        <div className="flex justify-center items-center mt-10">
          {error ? (
            <p className="text-red-500 text-3xl">{error}</p>
          ) : (
            <>
              <table className="border-collapse border-2 border-[#F95738] text-[#0D3B66] ">
                <tr className={tableStyle}>
                  <th className={tableStyle}>Image</th>
                  <th className={tableStyle}>Product Name</th>
                  <th className={tableStyle}>Prices</th>
                  <th className={tableStyle}>Stocks</th>
                </tr>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className={tableStyle}>
                      <img
                        className="w-[7rem] bg-white rounded-full"
                        src={product.images}
                        alt={`${product.name} Image`}
                      />
                    </td>
                    <td className={tableStyle}>{product.name}</td>
                    <td className={tableStyle}>{product.price}$</td>
                    <td className={tableStyle}>{product.quantity}</td>
                  </tr>
                ))}
              </table>
            </>
          )}
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
};

export default StocksPrices;
