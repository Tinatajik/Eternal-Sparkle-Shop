export default function ProductRow({
  product,
  getCategoryNameById,
  handleDeleteClick,
  handleEditProductClick,
}) {
  const imagePath = `http://localhost:8000/images/products/thumbnails/${product.thumbnail}`;
  const tableStyle =
    "border-2 border-[#D6B59F] text-[#30373E] text-md px-3 py-1";
  return (
    <tr key={product._id}>
      <td className={tableStyle}>
        <img
          className="w-[6rem] h-[5rem] bg-white rounded-xl"
          src={imagePath}
          alt={product.name}
        />
      </td>
      <td className={tableStyle}>{product.name}</td>
      <td className={tableStyle}>{getCategoryNameById(product.category)}</td>
      <td className={tableStyle}>
        <div className="flex gap-3 font-bold">
          <button
            onClick={() => handleEditProductClick(product)}
            className="px-2 py-1 bg-[#D6B59F] text-[#30373E] rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(product)}
            className="px-2 py-1 bg-[#D6B59F] text-[#30373E] rounded-lg"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
