import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../../../component/shop/side-bar/SideBar";

const SubcategoryPage = () => {
  const { subcategoryId } = useParams();
  const [subcategoryData, setSubCategoryData] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subcategoryResponse = await axios.get(
          `http://localhost:8000/api/subcategories/${subcategoryId}`
        );

        setSubCategoryData(subcategoryResponse.data.data.category);

        const productsResponse = await axios.get(
          `http://localhost:8000/api/products`,
          {
            params: {
              subcategory: subcategoryId,
              limit: 6,
            },
          }
        );

        setProducts(productsResponse.data.data.products);
      } catch (error) {
        console.error(
          `Error fetching category ${subcategoryId} data. Error:`,
          error
        );
      }
    };

    if (subcategoryId) {
      fetchData();
    }
  }, [subcategoryId]);

  return (
    <div>
      <Sidebar />
      <div className="absolute  w-full ml-[20rem] top-48 ">
        <div className="grid grid-cols-3 gap-4 w-3/4 ">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <Link to={`/productPage/${product._id}`}>
                <div key={product._id} className="flex">
                  <img
                    className="w-40 h-[10rem] rounded-lg"
                    src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                    alt={product.name}
                  />
                  <div className="flex flex-col gap-4 font-bold text-lg text-[#0D3B66] ml-3 mt-7">
                    <p>{product.name}</p>
                    <p>{product.price} $</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryPage;
