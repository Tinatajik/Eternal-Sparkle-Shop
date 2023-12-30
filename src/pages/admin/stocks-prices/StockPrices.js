import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Pagination from "../../../component/pagination/Pagination";
import Header from "../../../component/admin/header/Header";
import {
  setProducts,
  setCurrentPage,
  setLimit,
  setTotalPages,
  setError,
} from "../../../redux/admin/slices/StocksSlice";

const tableStyle = "border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1";

const StocksPrices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, currentPage, limit, totalPages, error } = useSelector(
    (state) => state.stocks
  );

  const [editing, setEditing] = useState({});
  const [editedValues, setEditedValues] = useState({});
  const [saveButtonActive, setSaveButtonActive] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/products?limit=${limit}&page=${currentPage}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }

      const data = await response.json();
      const productList = data?.data?.products || [];
      dispatch(setProducts(productList));
      dispatch(setError(null));

      const totalItems = data?.total || 0;
      const calculatedTotalPages = Math.ceil(totalItems / limit);

      dispatch(setTotalPages(calculatedTotalPages));
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch(setProducts([]));
      dispatch(setError("Failed to fetch products. Please try again later."));
    }
  };

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get("page");
    const limitParam = new URLSearchParams(location.search).get("limit");

    const page = pageParam ? parseInt(pageParam) : 1;
    const newLimit = limitParam ? parseInt(limitParam) : limit;

    dispatch(setCurrentPage(page));
    dispatch(setLimit(newLimit));
  }, [location.search, limit, dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, limit, dispatch]);

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

  const handleEditClick = (productId, fieldName, value) => {
    setEditing((prevEditing) => ({
      ...prevEditing,
      [`${productId}_${fieldName}`]: true,
    }));
    setEditedValues((prevValues) => ({
      ...prevValues,
      [`${productId}_${fieldName}`]: value,
    }));
    setSaveButtonActive(true);
  };

  const handleInputChange = (e, productId, fieldName) => {
    const { value } = e.target;

    setEditedValues((prev) => {
      const editedField = `${productId}_${fieldName}`;
      return { ...prev, [editedField]: value };
    });

    setEditing((prevEditing) => ({
      ...prevEditing,
      [`${productId}_${fieldName}`]: true,
    }));

    setSaveButtonActive(true);
  };

  const handleInputBlur = (productId, fieldName) => {
    setEditing((prevEditing) => ({
      ...prevEditing,
      [`${productId}_${fieldName}`]: true,
    }));
  };

  const handleInputKeyDown = (e, productId, fieldName) => {
    if (e.key === "Escape") {
      setEditing((prevEditing) => ({
        ...prevEditing,
        [`${productId}_${fieldName}`]: false,
      }));
      setEditedValues((prev) => ({
        ...prev,
        [`${productId}_${fieldName}`]:
          products.find((product) => product._id === productId)?.quantity ||
          editedValues[`${productId}_${fieldName}`],
      }));
    }
  };
  useEffect(() => {
    const anyEditing = Object.values(editing).some((value) => value);
    setSaveButtonActive(anyEditing);
  }, [editing]);
  const handleSaveClick = async () => {
    try {
      const editedItems = [];

      for (const [fieldName, value] of Object.entries(editedValues)) {
        if (!fieldName || !value) {
          console.error(`Invalid product ID or field: ${fieldName}`);
          continue;
        }

        console.log("fieldName:", fieldName);

        const productId = fieldName.split("_")[0];
        const modifiedFieldName = fieldName.replace(`${productId}_`, "");

        const formData = new FormData();
        formData.append(modifiedFieldName, value);

        const response = await axios.patch(
          `http://localhost:8000/api/products/${productId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjlhYmU0MmJlMTA0ZTFmMmVlOWVmYyIsImlhdCI6MTcwMjU4OTQ4NSwiZXhwIjoxNzA1MTgxNDg1fQ.hQ5rfFFO47ZuiDU5i-3PXC4GT-59o6R3TZXuJTUyXSc`,
            },
          }
        );

        if (response.status !== 200) {
          console.error("Failed to save:", response);
          throw new Error(
            `Failed to save ${fieldName}. Status: ${response.status}`
          );
        }

        editedItems.push(response.data);
      }

      await Promise.all(editedItems);

      setEditing({});
      setEditedValues({});
      setSaveButtonActive(false);

      fetchProducts();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="absolute top-10 w-full">
        <div className="flex justify-end mt-10">
          <button
            onClick={handleSaveClick}
            className={`bg-[#D6B59F] text-[#30373E] rounded-lg text-lg px-3 py-2 font-bold absolute right-24 top-20 ${
              !saveButtonActive && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!saveButtonActive}
          >
            Save
          </button>
        </div>
        <div className="flex justify-center items-center mt-10">
          {error ? (
            <p className="text-red-500 text-3xl">{error}</p>
          ) : (
            <>
              <table className="border-collapse border-2 border-[#D6B59F] text-[#30373E]">
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
                        className="w-[6rem] h-[5rem] bg-white rounded-xl"
                        src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                        alt={`${product.name} Image`}
                      />
                    </td>
                    <td className={tableStyle}>{product.name}</td>
                    <td className={tableStyle}>
                      {editing[`${product._id}_price`] ? (
                        <input
                          type="number"
                          name="price"
                          className="outline-none"
                          value={
                            editedValues[`${product._id}_price`] ||
                            product.price
                          }
                          onChange={(e) => {
                            handleInputChange(e, product._id, "price");
                            console.log(editedValues);
                          }}
                          onBlur={() => handleInputBlur(product._id, "price")}
                          onKeyDown={(e) =>
                            handleInputKeyDown(e, product._id, "price")
                          }
                        />
                      ) : (
                        <span
                          onClick={() =>
                            handleEditClick(product._id, "price", product.price)
                          }
                          className="cursor-pointer"
                        >
                          {product.price}
                        </span>
                      )}
                    </td>
                    <td className={tableStyle}>
                      {editing[`${product._id}_quantity`] ? (
                        <input
                          type="number"
                          name="quantity"
                          className="outline-none"
                          value={
                            editedValues[`${product._id}_quantity`] ||
                            product.quantity
                          }
                          onChange={(e) =>
                            handleInputChange(e, product._id, "quantity")
                          }
                          onBlur={() =>
                            handleInputBlur(product._id, "quantity")
                          }
                          onKeyDown={(e) =>
                            handleInputKeyDown(e, product._id, "quantity")
                          }
                        />
                      ) : (
                        <span
                          onClick={() =>
                            handleEditClick(
                              product._id,
                              "quantity",
                              product.quantity
                            )
                          }
                          className="cursor-pointer"
                        >
                          {saveButtonActive
                            ? editedValues[`${product._id}_quantity`] ||
                              product.quantity
                            : product.quantity}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </table>
            </>
          )}
        </div>
        <Pagination
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default StocksPrices;
