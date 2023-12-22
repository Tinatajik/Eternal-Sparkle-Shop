import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../../component/admin/header/Header";
import { CategoryApi, ProductApi } from "../../../api/api";
import DeleteModal from "../../../modal/admin/delete/DeleteModal";
import ProductModal from "../../../modal/admin/add-edit/ProductModal";
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
import ProductRow from "./ProductRow";

const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

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

  const [editedProduct, setEditedProduct] = useState(null);

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

  const handleAddProductClick = () => {
    setEditedProduct(null);
    setIsProductModalOpen(true);
  };

  const handleEditProductClick = (product) => {
    setEditedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (updatedProduct) => {
    try {
      if (editedProduct) {
        const formData = new FormData();
        formData.append("thumbnail", updatedProduct.thumbnail);
        formData.append("name", updatedProduct.name);
        formData.append("category", updatedProduct.category);
        formData.append("subcategory", updatedProduct.subcategory);
        formData.append("price", updatedProduct.price);
        formData.append("quantity", updatedProduct.quantity);
        formData.append("brand", updatedProduct.brand);
        formData.append("description", updatedProduct.description);

        await axios.patch(`${ProductApi}/${editedProduct._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjlhYmU0MmJlMTA0ZTFmMmVlOWVmYyIsImlhdCI6MTcwMjU4OTQ4NSwiZXhwIjoxNzA1MTgxNDg1fQ.hQ5rfFFO47ZuiDU5i-3PXC4GT-59o6R3TZXuJTUyXSc`,
          },
        });

        const updatedProductsResponse = await axios.get(ProductApi, {
          params: {
            limit,
            page: currentPage,
          },
        });

        const updatedProductsData = updatedProductsResponse.data;
        const updatedProductList = updatedProductsData?.data?.products || [];

        dispatch(setProducts(updatedProductList));
        const totalItems = updatedProductsData?.total || 0;
        const calculatedTotalPages = Math.ceil(totalItems / limit);
        if (calculatedTotalPages > totalPages) {
          const nextPage = currentPage + 1;
          updateUrl(nextPage);
        }

        dispatch(setTotalPages(calculatedTotalPages));

        handleModalClose();
      } else {
        const formData = new FormData();
        formData.append("thumbnail", updatedProduct.thumbnail);
        formData.append("name", updatedProduct.name);
        formData.append("category", updatedProduct.category);
        formData.append("subcategory", updatedProduct.subcategory);
        formData.append("price", updatedProduct.price);
        formData.append("quantity", updatedProduct.quantity);
        formData.append("brand", updatedProduct.brand);
        formData.append("description", updatedProduct.description);

        const response = await axios.post(ProductApi, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjlhYmU0MmJlMTA0ZTFmMmVlOWVmYyIsImlhdCI6MTcwMjU4OTQ4NSwiZXhwIjoxNzA1MTgxNDg1fQ.hQ5rfFFO47ZuiDU5i-3PXC4GT-59o6R3TZXuJTUyXSc`,
          },
        });

        const newProductData = response.data;

        const updatedProductsResponse = await axios.get(ProductApi, {
          params: {
            limit,
            page: currentPage,
          },
        });

        const updatedProductsData = updatedProductsResponse.data;
        const updatedProductList = updatedProductsData?.data?.products || [];

        dispatch(setProducts(updatedProductList));
        const totalItems = updatedProductsData?.total || 0;
        const calculatedTotalPages = Math.ceil(totalItems / limit);
        if (calculatedTotalPages > totalPages) {
          const nextPage = currentPage + 1;
          updateUrl(nextPage);
        }

        dispatch(setTotalPages(calculatedTotalPages));

        handleModalClose();
      }
    } catch (error) {
      console.error("Error saving product:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }

      dispatch(setError("Failed to save product. Please try again later."));
    }
  };

  const TotalPage = () => {
    return (
      <span>
        Page {currentPage} of {totalPages}
      </span>
    );
  };

  return (
    <>
      <Header />
      <div className="absolute top-10 w-full">
        <div className="flex justify-end mt-10">
          <button
            onClick={handleAddProductClick}
            className="bg-[#F95738] text-[#0D3B66] rounded-lg text-lg px-3 py-2 font-bold absolute right-24 top-20"
          >
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
                  <ProductRow
                    key={product._id}
                    product={product}
                    getCategoryNameById={getCategoryNameById}
                    handleDeleteClick={handleDeleteClick}
                    handleEditProductClick={handleEditProductClick}
                  />
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
        {isProductModalOpen && (
          <ProductModal
            isOpen={isProductModalOpen}
            onClose={() => setIsProductModalOpen(false)}
            onSave={handleSaveProduct}
            product={editedProduct}
          />
        )}
      </div>
    </>
  );
};

export default Products;
