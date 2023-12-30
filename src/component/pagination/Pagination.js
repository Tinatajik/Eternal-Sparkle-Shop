import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => (
  <div className="flex justify-center items-center mt-2">
    <button
      onClick={handlePrevPage}
      className="mx-2"
      disabled={currentPage === 1}
    >
      Prev
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={handleNextPage}
      className="mx-2"
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;
