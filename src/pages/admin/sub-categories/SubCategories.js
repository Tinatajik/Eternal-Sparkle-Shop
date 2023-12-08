import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../component/admin/header/Header";

const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";

const SubCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [subcategories, setSubcategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [categoryNames, setCategoryNames] = useState([]);
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
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/subcategories?limit=${limit}&page=${currentPage}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch subcategories. Status: ${response.status}`
          );
        }

        const data = await response.json();
        const subcategoryList = data?.data?.subcategories || [];
        setSubcategories(subcategoryList);
        setError(null);

        if (subcategoryList.length === 0 && currentPage > 1) {
          setError("Page not found");
        }

        const totalItems = data?.total || 0;
        const calculatedTotalPages = Math.ceil(totalItems / limit);

        setTotalPages(calculatedTotalPages);

        const names = await Promise.all(
          subcategoryList.map(async (subcategory) => {
            const categoryName = await fetchCategoryName(subcategory.category);
            return categoryName;
          })
        );

        setCategoryNames(names);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSubcategories([]);
        setCategoryNames([]);
        setError("Failed to fetch subcategories. Please try again later.");
      }
    };

    fetchData();
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
    navigate(`/sub-categories?page=${page}&limit=${limit}`);
  };

  const fetchCategoryName = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/categories/${categoryId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch category. Status: ${response.status}`);
      }

      const data = await response.json();
      const category = data?.data?.category || {};
      return category.name;
    } catch (error) {
      console.error("Error fetching category:", error);
      return "Unknown Category";
    }
  };

  return (
    <>
      <Header />
      <div className="absolute top-10 w-full">
        <div className="flex justify-end mt-10">
          <button className="bg-[#F95738] text-[#0D3B66] rounded-lg text-lg px-3 py-2 font-bold absolute right-24 top-20">
            Add Subcategory
          </button>
        </div>
        <div className="flex justify-center items-center mt-10">
          {error ? (
            <p className="text-red-500 text-3xl">{error}</p>
          ) : (
            <>
              <table className="border-collapse border-2 border-[#F95738] text-[#0D3B66] ">
                <thead>
                  <tr className={tableStyle}>
                    <th className={tableStyle}>Subcategory</th>
                    <th className={tableStyle}>Category</th>
                    <th className={tableStyle}></th>
                  </tr>
                </thead>
                <tbody>
                  {subcategories.map((subcategory, index) => (
                    <tr key={subcategory._id}>
                      <td className={tableStyle}>{subcategory.name}</td>
                      <td className={tableStyle}>{categoryNames[index]}</td>
                      <td className={tableStyle}>
                        <div className="flex gap-3">
                          <button>Edit</button>
                          <button>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
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

export default SubCategories;
