import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../component/admin/header/Header";

const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);

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
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/categories?limit=${limit}&page=${currentPage}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch categories. Status: ${response.status}`
          );
        }

        const data = await response.json();
        const categoryList = data?.data?.categories || [];
        setCategories(categoryList);
        setError(null);

        if (categoryList.length === 0 && currentPage > 1) {
          setError("Page not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategories([]);
        setError("Failed to fetch categories. Please try again later.");
      }
    };

    fetchCategories();
  }, [currentPage, limit]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    updateUrl(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    updateUrl(prevPage);
  };

  const updateUrl = (page) => {
    navigate(`/categories?page=${page}&limit=${limit}`);
  };

  return (
    <>
      <Header />
      <div className="absolute top-10 w-full">
        <div className="flex justify-end mt-10">
          <button className="bg-[#F95738] text-[#0D3B66] rounded-lg text-lg px-3 py-2 font-bold absolute right-24 top-20">
            Add Category
          </button>
        </div>
        <div className="flex justify-center items-center mt-10">
          {error ? (
            <p className="text-red-500 text-3xl">{error}</p>
          ) : (
            <>
              <table className="border-collapse border-2 border-[#F95738] text-[#0D3B66] ">
                <tr className={tableStyle}>
                  <th className={tableStyle}>Category</th>
                  <th className={tableStyle}>Date</th>
                  <th className={tableStyle}></th>
                </tr>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className={tableStyle}>{category.name}</td>
                    <td className={tableStyle}>
                      {new Date(category.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long", // or 'short' for abbreviated month name
                          day: "numeric",
                        }
                      )}
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
          <span>Page {currentPage}</span>
          <button onClick={handleNextPage} className="mx-2">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Categories;
