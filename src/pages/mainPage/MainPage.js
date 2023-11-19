import { Outlet, Link } from "react-router-dom";
export default function MainPage() {
  return (
    <>
      <div className="flex justify-around mt-7">
        <div>Main Page</div>
        <Link to="/adminPage">go to Admin Page</Link>
      </div>
    </>
  );
}
