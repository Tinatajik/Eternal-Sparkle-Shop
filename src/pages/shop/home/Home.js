import React, { useEffect, useState } from "react";
import axios from "axios";
import Category from "../categories/Categories";
import ShopLatest from "../shop-latest/ShopLatest";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const limit = 6;
  const currentPage = 1;

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories", {
        params: {
          limit,
          page: currentPage,
        },
      });
      console.log("Categories response:", response.data);
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products?limit=${limit}&page=${currentPage}&category=${categoryId}`
      );
      console.log(
        `Products response for category ${categoryId}:`,
        response.data
      );
      setProducts((prevProducts) => [
        ...prevProducts,
        { categoryId, products: response.data.data.products },
      ]);
    } catch (error) {
      console.error(
        `Error fetching products for category ${categoryId}:`,
        error
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  useEffect(() => {
    categories.forEach((category) => {
      fetchProducts(category._id);
    });
  }, [categories]);

  return (
    <>
      <img
        className="relative"
        src="https://www.stoneandstrand.com/cdn/shop/files/Ring_Stack_Website_Banner_1440x.png?v=1698953067"
        alt="Banner"
      />
      <div className="absolute mt-[-10rem] right-28 flex flex-col justify-center items-center gap-5 text-[#F4D35E]  font-bold text-xl">
        <p className=" ">ALWAYS SEEKING THE RARE & BEAUTIFUL</p>
        <button className="bg-[#0D3B66] w-1/2 py-2 rounded-lg">Shop Now</button>
      </div>
      <div className="flex flex-col justify-center items-center mt-5 w-full">
        <h2 className="text-4xl text-[#F95738]">Shop by Category</h2>
        <div className="flex flex-col gap-3 ml-4">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <Category
                key={category._id}
                category={category}
                products={
                  Array.isArray(products) &&
                  products.find((item) => item.categoryId === category._id)
                    ?.products
                }
              />
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      </div>
      <div className="w-full bg-[#0D3B66] flex justify-center items-center mt-5">
        <p className="w-[40%]  text-[#F4D35E] text-lg p-6">
          They say you should always ask someone about their values on a first
          date, so here are ours. We make our pieces at the same places other
          premium brands do, so you're getting that high-level quality — but
          without the high-level price. You're welcome.
        </p>
      </div>
      <ShopLatest />
    </>
  );
}
