import { Link } from "react-router-dom";

const tableStyle = "border-2 border-[#F95738] text-[#0D3B66] text-md px-3 py-1";

const ProductCart = ({ id, name, price, imageUrl }) => {
  return (
    <tr>
      <td className={tableStyle}>
        <Link to={`/productPage/${id}`}>
          <img
            className="w-[6rem] h-[5rem] bg-white rounded-xl"
            src={imageUrl}
            alt="image-product"
          />
        </Link>
      </td>
      <td className={tableStyle}>{name}</td>
      <td className={tableStyle}>{price}</td>
      <td className={tableStyle}>
        <div className="flex gap-4 bg-[#0D3B66]  justify-center py-1  rounded-lg text-[#F4D35E]">
          <button>+</button>
          <button>1</button>
          <button>-</button>
        </div>
      </td>
      <td className={tableStyle}>
        <button className="px-2 py-1 bg-[#EE964B] font-bold text-[#F4D35E] rounded-lg">
          Delete
        </button>
      </td>
    </tr>
  );
};

export { ProductCart };
