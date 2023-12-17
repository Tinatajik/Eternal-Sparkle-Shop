import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchSubcategories,
} from "../../../redux/admin/slices/ProductModalSlice";

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.productModal.categories);
  const subcategories = useSelector(
    (state) => state.productModal.subcategories
  );
  const loadingCategories = useSelector(
    (state) => state.productModal.loadingCategories
  );
  const loadingSubcategories = useSelector(
    (state) => state.productModal.loadingSubcategories
  );

  const [productName, setProductName] = useState(product ? product.name : "");
  const [categoryId, setCategoryId] = useState(product ? product.category : "");
  const [subcategoryId, setSubcategoryId] = useState(
    product ? product.subcategory : ""
  );
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [image, setImage] = useState(product ? product.thumbnail : null);
  const [price, setPrice] = useState(product ? product.price : "");
  const [quantity, setQuantity] = useState(product ? product.quantity : "");
  const [brand, setBrand] = useState(product ? product.brand : "");
  const [previewImage, setPreviewImage] = useState(
    product
      ? `http://localhost:8000/images/products/thumbnails/${product.thumbnail}`
      : null
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSubcategories(categoryId));
    }
  }, [categoryId, dispatch]);

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      name: productName,
      category: categoryId,
      subcategory: subcategoryId,
      description,
      thumbnail: image,
      price,
      quantity,
      brand,
    };

    onSave(updatedProduct);
    onClose();
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
    <div
      className={`modal ${
        isOpen ? "flex" : "hidden"
      } fixed overflow-scroll overflow-x-hidden inset-0 items-center justify-center z-50`}
    >
      <div className="modal-overlay absolute w-full h-[240%] bg-gray-900 opacity-50" />
      <div className="modal-container mt-[20%] bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Product Details</p>
            <button
              className="modal-close p-2 bg-gray-900 text-white hover:bg-gray-700 rounded-full focus:outline-none focus:shadow-outline"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <label className="block text-sm font-bold mb-2">
            Product Name:
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>

          <label className="block text-sm font-bold mb-2">
            Category:
            <select
              className="border rounded w-full py-2 px-3"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              style={{ color: "black", backgroundColor: "white" }}
            >
              <option value="" disabled>
                {loadingCategories
                  ? "Loading categories..."
                  : "Select a category"}
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-bold mb-2">
            Subcategory:
            <select
              className="border rounded w-full py-2 px-3"
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              style={{ color: "black", backgroundColor: "white" }}
            >
              <option value="" disabled>
                {loadingSubcategories
                  ? "Loading subcategories..."
                  : "Select a subcategory"}
              </option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-bold mb-2">
            Price:
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label className="block text-sm font-bold mb-2">
            Quantity:
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>

          <label className="block text-sm font-bold mb-2">
            Brand:
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </label>
          <label className="block text-sm font-bold mb-2">
            Description:
            <ReactQuill
              theme="snow"
              value={description}
              onChange={(value) => setDescription(value)}
            />
          </label>

          <label className="block text-sm font-bold mb-2">
            Thumbnail:
            <input
              className="border rounded w-full py-2 px-3"
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Thumbnail Preview"
                className="mt-2 w-1/3 h-1/4"
              />
            )}
          </label>

          <div className="flex justify-end pt-2 gap-4">
            <button
              className="modal-close px-4 bg-gray-700 p-3 rounded-lg text-white hover:bg-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 bg-[#F95738] p-3 rounded-lg text-white hover:bg-[#F44C24]"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
