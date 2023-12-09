import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../../component/admin/header/Header";
import { CategoryApi, ProductApi } from "../../../api/api";

const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";

const TotalPage = ({ currentPage, totalPages }) => (
  <span>
    Page {currentPage} of {totalPages}
  </span>
);

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Moved totalPages state here

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
        const productsResponse = await axios.get(ProductApi, {
          params: {
            limit,
            page: currentPage,
          },
        });

        const productsData = productsResponse.data;
        const productList = productsData?.data?.products || [];
        setProducts(productList);
        setError(null);

        if (productList.length === 0 && currentPage > 1) {
          setError("Page not found");
        }

        const categoriesResponse = await axios.get(CategoryApi);

        const categoriesData = categoriesResponse.data;
        const categoryList = categoriesData?.data?.categories || [];
        setCategories(categoryList);

        const totalItems = productsData?.total || 0;
        const calculatedTotalPages = Math.ceil(totalItems / limit);

        setTotalPages(calculatedTotalPages); // Update the totalPages state
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, [currentPage, limit]);

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    updateUrl(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    updateUrl(prevPage);
  };

  const updateUrl = (page) => {
    navigate(`/products?page=${page}&limit=${limit}`);
  };

  return (
    <>
      <Header />
      <div className="absolute top-10 w-full">
        <div className="flex justify-end mt-10">
          <button className="bg-[#F95738] text-[#0D3B66] rounded-lg text-lg px-3 py-2 font-bold absolute right-24 top-20">
            Add Product
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
                  <th className={tableStyle}>Category</th>
                  <th className={tableStyle}></th>
                </tr>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className={tableStyle}>
                      <img
                        className="w-[7rem] bg-white rounded-full"
                        src={product.images}
                        alt={product.name}
                      />
                    </td>
                    <td className={tableStyle}>{product.name}</td>
                    <td className={tableStyle}>
                      {getCategoryNameById(product.category)}
                    </td>
                    <td className={tableStyle}>
                      <div className="flex gap-3">
                        <button>Edit</button>
                        <button>Delete</button>
                      </div>
                    </td>
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
          <TotalPage currentPage={currentPage} totalPages={totalPages} />
          <button onClick={handleNextPage} className="mx-2">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
