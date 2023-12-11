import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../../component/admin/header/Header";
import { CategoryApi, ProductApi } from "../../../api/api";
import DeleteModal from "../../../modal/admin/delete/DeleteModal";
import {
  setProducts,
  setCurrentPage,
  setLimit,
  setCategories,
  setTotalPages,
  setError,
  setSelectedProduct,
  setModalState,
} from "../../../redux/admin/slices/ProductsSlice";

const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";

const TotalPage = () => {
  const currentPage = useSelector((state) => state.products.currentPage);
  const totalPages = useSelector((state) => state.products.totalPages);

  return (
    <span>
      Page {currentPage} of {totalPages}
    </span>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    products,
    currentPage,
    limit,
    categories,
    totalPages,
    error,
    selectedProduct,
    isModalOpen,
  } = useSelector((state) => state.products);

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get("page");
    const limitParam = new URLSearchParams(location.search).get("limit");

    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const newLimit = limitParam ? parseInt(limitParam, 10) : limit;

    dispatch(setCurrentPage(page));
    dispatch(setLimit(newLimit));
  }, [location.search, limit, dispatch]);

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

        dispatch(setProducts(productList));
        dispatch(setError(null));

        if (productList.length === 0 && currentPage > 1) {
          dispatch(setError("Page not found"));
        }

        const categoriesResponse = await axios.get(CategoryApi);

        const categoriesData = categoriesResponse.data;
        const categoryList = categoriesData?.data?.categories || [];

        dispatch(setCategories(categoryList));

        const totalItems = productsData?.total || 0;
        const calculatedTotalPages = Math.ceil(totalItems / limit);

        dispatch(setTotalPages(calculatedTotalPages));
      } catch (error) {
        console.error("Error fetching data:", error);

        dispatch(setProducts([]));
        dispatch(setError("Failed to fetch products. Please try again later."));
      }
    };

    fetchProducts();
  }, [currentPage, limit, dispatch]);

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

  const handleDeleteClick = (product) => {
    dispatch(setSelectedProduct(product));
    dispatch(setModalState(true));
  };

  const handleModalClose = () => {
    dispatch(setSelectedProduct(null));
    dispatch(setModalState(false));
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${ProductApi}/${selectedProduct._id}`);

      const updatedProductsResponse = await axios.get(ProductApi, {
        params: {
          limit,
          page: currentPage,
        },
      });

      const updatedProductsData = updatedProductsResponse.data;
      const updatedProductList = updatedProductsData?.data?.products || [];

      dispatch(setProducts(updatedProductList));

      if (updatedProductList.length === 0 && currentPage > 1) {
        const newPage = Math.max(currentPage - 1, 1);
        updateUrl(newPage);
      }

      const totalItems = updatedProductsData?.total || 0;
      const calculatedTotalPages = Math.ceil(totalItems / limit);

      dispatch(setTotalPages(calculatedTotalPages));

      handleModalClose();
    } catch (error) {
      console.error("Error deleting product:", error);

      handleModalClose();
    }
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
                      <div className="flex gap-3 font-bold">
                        <button className="px-2 py-1 bg-[#F4D35E] text-[#EE964B] rounded-lg">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="px-2 py-1 bg-[#EE964B] text-[#F4D35E] rounded-lg"
                        >
                          Delete
                        </button>
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
          <TotalPage />
          <button
            onClick={handleNextPage}
            className="mx-2"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        {selectedProduct && isModalOpen && (
          <DeleteModal
            product={selectedProduct}
            onDeleteConfirm={handleDeleteConfirm}
            onModalClose={handleModalClose}
          />
        )}
      </div>
    </>
  );
};

export default Products;
