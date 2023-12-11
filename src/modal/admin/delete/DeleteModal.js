import React from "react";

const DeleteModal = ({ product, onDeleteConfirm, onModalClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <p>Do you want to delete this product?</p>
        <div className="flex items-center justify-center">
          <p>{product.name}</p>
          <img
            className="w-[7rem] bg-white rounded-full"
            src={product.images}
            alt={product.name}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={onDeleteConfirm}
            className="mx-2 bg-red-500 text-white px-3 py-1 rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={onModalClose}
            className="mx-2 bg-gray-500 text-white px-3 py-1 rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
