import { Link } from "react-router-dom";

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
          onClick={onRemove}
          className="px-2 py-1 bg-[#D6B59F] text-[#30373E] font-bold  rounded-lg"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export { ProductCart };
