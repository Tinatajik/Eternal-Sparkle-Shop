import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Header from "../../../component/admin/header/Header";
import { useNavigate, useLocation } from "react-router-dom";
import {
  setCategories,
  setCurrentPage,
  setLimit,
  setTotalPages,
  setError,
} from "../../../redux/admin/slices/CategorySlice";

const tableStyle = "border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { categories, currentPage, limit, totalPages, error } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get("page");
    const limitParam = new URLSearchParams(location.search).get("limit");

    const page = pageParam ? parseInt(pageParam) : 1;
    const newLimit = limitParam ? parseInt(limitParam) : limit;

    dispatch(setCurrentPage(page));
    dispatch(setLimit(newLimit));
  }, [location.search, limit, dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/categories`,
          {
            params: {
              limit,
              page: currentPage,
            },
          }
        );

        const data = response.data;
        const categoryList = data?.data?.categories || [];
        dispatch(setCategories(categoryList));
        dispatch(setError(null));

        if (categoryList.length === 0 && currentPage > 1) {
          dispatch(setError("Page not found"));
        }

        const totalItems = data?.total || 0;
        const calculatedTotalPages = Math.ceil(totalItems / limit);

        dispatch(setTotalPages(calculatedTotalPages));
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setCategories([]));
        dispatch(
          setError("Failed to fetch categories. Please try again later.")
        );
      }
    };

    fetchCategories();
  }, [currentPage, limit, dispatch]);

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
          <button className="bg-[#D6B59F] text-[#30373E] rounded-lg text-lg px-3 py-2 font-bold absolute right-24 top-20">
            Add Category
          </button>
        </div>
        <div className="flex justify-center items-center mt-10">
          {error ? (
            <p className="text-red-500 text-3xl">{error}</p>
          ) : (
            <>
              <table className="border-collapse border-2 border-[#D6B59F] text-[#30373E]">
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
                          month: "long",
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

export default Categories;
