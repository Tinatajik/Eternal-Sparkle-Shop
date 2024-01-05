import React from "react";

const tableStyle = "border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1";

const CategoryTable = ({ categories }) => (
  <table className="border-collapse border-2 border-[#D6B59F] text-[#30373E]">
    <tr className={tableStyle}>
      <th className={tableStyle}>Category</th>
      <th className={tableStyle}>Date</th>
      <th className={tableStyle}></th>
    </tr>
    {categories.map((category) => (
      <tr key={category._id}>
        <td className={tableStyle}>{category.name}</td>
        <td className={tableStyle}>
          {new Date(category.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </td>
        <td className={tableStyle}>
          <div className="flex gap-3">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </td>
      </tr>
    ))}
  </table>
);

export default CategoryTable;
