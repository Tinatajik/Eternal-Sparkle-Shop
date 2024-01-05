import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../../../modal/shop/cartModal/DeleteCart";

const tableStyle = "border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1";

const ProductCart = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRemove = () => {
    onRemove();
    closeModal();
  };

  return (
    <tr>
      <td className={tableStyle}>
        <Link to={`/productPage/${id}`}>
          <img
            className="w-[6rem] h-[5rem] bg-white rounded-xl"
            src={`http://localhost:8000/images/products/thumbnails/${imageUrl}`}
            alt="image-product"
          />
        </Link>
      </td>
      <td className={tableStyle}>{name}</td>
      <td className={tableStyle}>{price}</td>
      <td className={tableStyle}>
        <div className="flex gap-4 bg-[#D6B59F] text-[#30373E]  justify-center py-1  rounded-lg ">
          <button onClick={onDecrease}>-</button>
          <button>{quantity}</button>
          <button onClick={onIncrease}>+</button>
        </div>
      </td>
      <td className={tableStyle}>
        <button
          onClick={openModal}
          className="px-2 py-1 bg-[#D6B59F] text-[#30373E] font-bold  rounded-lg"
        >
          Delete
        </button>
        <DeleteModal
          isOpen={showModal}
          onClose={closeModal}
          onConfirm={handleRemove}
          message="Are you sure you want to delete?"
        />
      </td>
    </tr>
  );
};

export { ProductCart };
