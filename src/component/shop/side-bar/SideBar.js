import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/categories"
        );
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleCategoryClick = async (categoryId) => {
    setSelectedCategoryId(categoryId);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/subcategories?category=${categoryId}`
      );
      setSubcategories(response.data.data.subcategories);
    } catch (error) {
      console.error(`Error fetching subcategories:`, error);
    }
  };
  return (
    <div className="bg-[#EEE8E3] text-[#30373E] z-20 text-lg w-1/2 h-screen md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block">
      <ul>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <li
              key={category._id}
              className={`w-full h-full py-3 px-4 border-b border-[#30373E] ${
                selectedCategoryId === category._id ? "bg-[#D6B59F]" : ""
              }`}
            >
              <Link
                to={`/categories/${category._id}`}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
              </Link>
              {selectedCategoryId === category._id &&
                Array.isArray(subcategories) &&
                subcategories.length > 0 && (
                  <ul>
                    {subcategories.map((subcategory) => (
                      <li
                        key={subcategory._id}
                        className="border-light-border text-[#0D3B66] ml-4"
                      >
                        <Link to={`/subcategories/${subcategory._id}`}>
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
