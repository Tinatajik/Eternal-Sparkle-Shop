import { Link } from "react-router-dom";
export default function Header() {
  return (
    <>
      <div className="flex justify-between px-12 mt-5">
        <div>Search</div>
        <div>Logo</div>
        <div className="flex gap-4">
          <Link to="/adminPage">go to Admin Page</Link>
          <div>Cart</div>
        </div>
      </div>
    </>
  );
}
