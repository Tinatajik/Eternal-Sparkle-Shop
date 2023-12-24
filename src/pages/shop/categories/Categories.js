import React from "react";
import { Link } from "react-router-dom";
import { ProductPage } from "../../../router/path-route/PathRoute";

const Category = ({ category, products }) => (
  <div className="flex flex-col gap-3">
    <p className="text-[#0D3B66] text-xl font-bold ml-10">{category.name}</p>
    <div className="flex gap-5">
      <Link to={`/categories/${category._id}`}>
        <img
          className="w-[12rem] h-[15rem] mb-20 rounded-lg"
          src={category.icon}
          alt={category.name}
        />
      </Link>

      <div className="flex gap-5 justify-center">
        {Array.isArray(products) &&
          products.slice(0, 6).map((product) => (
            <Link to={`/productPage/${product._id}`}>
              <div
                key={product._id}
                className="flex flex-col justify-center items-center w-[10rem] gap-4 text-[#30373E] text-lg font-bold text-center border border-2"
              >
                <img
                  className="w-full h-[10rem] rounded-lg"
                  src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                  alt={product.name}
                />
                <div className="flex flex-col gap-2">
                  <p>{product.name}</p>
                  <p className="">{product.price} $</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  </div>
);

export default Category;
