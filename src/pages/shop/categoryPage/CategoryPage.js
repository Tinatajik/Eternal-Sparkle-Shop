import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../../../component/shop/side-bar/SideBar";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState({});
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(
          `http://localhost:8000/api/categories/${categoryId}`
        );
        console.log(`Category ${categoryId} response:`, categoryResponse.data);

        setCategoryData(categoryResponse.data.data.category);

        const productsResponse = await axios.get(
          `http://localhost:8000/api/products`,
          {
            params: {
              category: categoryId,
              limit: 6,
              page: currentPage,
            },
          }
        );
        console.log(
          `Products for category ${categoryId} response:`,
          productsResponse.data
        );

        setProducts(productsResponse.data.data.products);
        setTotalPages(productsResponse.data.total_pages); // Adjust the property name here
      } catch (error) {
        console.error(
          `Error fetching category ${categoryId} data. Error:`,
          error
        );
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Sidebar />
      <div className="absolute  w-full ml-[20rem] top-48 ">
        <div className="grid grid-cols-3  gap-4 w-3/4 ">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <Link to={`/productPage/${product._id}`}>
                <div key={product._id} className="flex border ">
                  <img
                    className="w-40 h-[10rem] rounded-lg"
                    src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                    alt={product.name}
                  />
                  <div className="flex flex-col gap-4 font-bold text-lg text-[#0D3B66] ml-3 mt-7">
                    <p>{product.name}</p>
                    <p>{product.price} $</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
        {totalPages > 1 && (
          <div className="mt-4 flex gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="mx-2"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
