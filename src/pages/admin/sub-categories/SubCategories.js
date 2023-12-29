import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../component/admin/header/Header";
import {
  setSubcategories,
  setCurrentPage,
  setLimit,
  setCategoryNames,
  setTotalPages,
  setError,
} from "../../../redux/admin/slices/SubCategorySlice";

const tableStyle = "border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1";

const SubCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    subcategories,
    currentPage,
    limit,
    categoryNames,
    totalPages,
    error,
  } = useSelector((state) => state.subcategories);

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get("page");
    const limitParam = new URLSearchParams(location.search).get("limit");

    const page = pageParam ? parseInt(pageParam) : 1;
    const newLimit = limitParam ? parseInt(limitParam) : limit;

    dispatch(setCurrentPage(page));
    dispatch(setLimit(newLimit));
  }, [location.search, limit, dispatch]);

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
        dispatch(setSubcategories(subcategoryList));
        dispatch(setError(null));

        if (subcategoryList.length === 0 && currentPage > 1) {
          dispatch(setError("Page not found"));
        }

        const totalItems = data?.total || 0;
        const calculatedTotalPages = Math.ceil(totalItems / limit);

        dispatch(setTotalPages(calculatedTotalPages));

        const names = await Promise.all(
          subcategoryList.map(async (subcategory) => {
            const categoryName = await fetchCategoryName(subcategory.category);
            return categoryName;
          })
        );

        dispatch(setCategoryNames(names));
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setSubcategories([]));
        dispatch(setCategoryNames([]));
        dispatch(
          setError("Failed to fetch subcategories. Please try again later.")
        );
      }
    };

    fetchData();
  }, [currentPage, limit, dispatch]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    dispatch(setCurrentPage(nextPage));
    updateUrl(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    dispatch(setCurrentPage(prevPage));
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
          <button className="bg-[#D6B59F] text-[#30373E] rounded-lg text-lg px-3 py-2 font-bold absolute right-24 top-20">
            Add Subcategory
          </button>
        </div>
        <div className="flex justify-center items-center mt-10">
          {error ? (
            <p className="text-red-500 text-3xl">{error}</p>
          ) : (
            <>
              <table className="border-collapse border-2 border-[#D6B59F] text-[#30373E]">
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
