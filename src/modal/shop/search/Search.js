import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const handleInputChange = (event) => {
    const upperCaseSearchTerm = event.target.value.toUpperCase();
    setSearchTerm(upperCaseSearchTerm);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/products?name=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();

      console.log("API response:", responseData);
      if (responseData.data && Array.isArray(responseData.data.products)) {
        setSearchResults(responseData.data.products);
      } else {
        console.error(
          "API response does not contain the expected products array:",
          responseData
        );
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClickSearchIcon = () => {
    handleSearch();
  };

  return (
    <>
      <div className="w-full h-full  absolute top-0 left-0 z-30 bg-[#f6f4f2] ">
        <div className="flex justify-center items-center mt-20">
          <input
            className="px-6 py-2 bg-[#EEE8E3] text-black w-1/3 focus:outline-none text-lg rounded-md border"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <img
            className="absolute ml-[25rem] cursor-pointer"
            width="30"
            height="30"
            src="https://img.icons8.com/dusk/64/search--v1.png"
            alt="search--v1"
            onClick={handleClickSearchIcon}
          />
          <button
            onClick={onClose}
            className="absolute right-20 mt-1 cursor-pointer"
          >
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/color/48/cancel--v1.png"
              alt="cancel--v1"
            />
          </button>
        </div>
        {searchResults !== null && (
          <div className="ml-40 mt-20">
            {searchResults.length === 0 ? (
              <p className="text-xl text-center mr-40">No results found.</p>
            ) : (
              <>
                <ul>
                  {searchResults.map((product) => (
                    <Link onClick={onClose} to={`/productPage/${product._id}`}>
                      <li key={product._id} className="">
                        <p>{product.name}</p>
                        <img
                          className="w-[10rem] h-[10rem] rounded-full"
                          src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                          alt={product.name}
                        />
                      </li>
                    </Link>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
