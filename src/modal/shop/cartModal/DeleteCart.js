import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white p-6 z-20 rounded-lg shadow-lg">
              <p className="text-lg font-semibold mb-4">{message}</p>
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-white bg-gray-500 rounded-lg mr-2"
                >
                  No
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
