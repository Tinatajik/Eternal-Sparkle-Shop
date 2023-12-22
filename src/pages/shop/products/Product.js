import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setProduct,
  setQuantity,
  setIsLoading,
} from "../../../redux/shop/productShopSlice";

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, quantity, isLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) {
          dispatch(setProduct(null));
          return;
        }

        console.log("Fetching product data for ID:", productId);

        dispatch(setIsLoading(true));

        const response = await axios.get(
          `http://localhost:8000/api/products/${productId}`
        );

        const productData = response.data.data.product;
        console.log("Fetched product data:", productData);
        dispatch(setProduct(productData));
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchProduct();
  }, [dispatch, productId]);

  const handleIncrease = () => {
    if (quantity < product?.quantity) {
      dispatch(setQuantity(quantity + 1));
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(setQuantity(quantity - 1));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    console.log("Product is null. Selected Product ID:", productId);
    return <div>No product found.</div>;
  }

  return (
    <div className="flex mt-10 ml-20 gap-10">
      <img
        className="w-[25%]"
        src={`http://localhost:8000/images/products/thumbnails/${product?.thumbnail}`}
        alt={product?.name}
      />
      <div className="flex flex-col gap-4 text-lg text-[#F95738] font-bold mt-6">
        <h2 className="text-2xl">{product?.name}</h2>
        <p>Category: {product?.category?.name}</p>
        <p>Subcategory: {product?.subcategory?.name}</p>
        <p>{product?.brand}</p>
        <p>{`${product?.price} $`}</p>
        {product?.quantity > 0 ? (
          <div className="flex gap-4 bg-[#0D3B66] w-1/2 justify-center px-3 py-1 mt-4 rounded-lg text-[#F4D35E] ml-9">
            <button onClick={handleIncrease}>+</button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => dispatch(setQuantity(Number(e.target.value)))}
              className="w-1/4 bg-[#0D3B66]"
            />
            <button onClick={handleDecrease}>-</button>
          </div>
        ) : (
          <p className="text-[#F4D35E]">No inventory available</p>
        )}
        {product?.quantity > 0 && (
          <button className="bg-[#F4D35E] text-[#0D3B66] mt-5 rounded-lg text-lg font-bold py-1">
            Add To Cart
          </button>
        )}
      </div>
      <div
        className="text-[#0D3B66] font-bold ml-10 p-5 w-1/2 mt-10"
        dangerouslySetInnerHTML={{ __html: product?.description }}
      ></div>
    </div>
  );
};

export default Product;
