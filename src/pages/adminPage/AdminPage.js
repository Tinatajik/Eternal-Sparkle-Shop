import { Link } from "react-router-dom";
export default function AdminPage() {
  return (
    <>
      <div className="flex justify-around mt-7">
        <div>Admin Page</div>
        <Link to="/">back MainPage</Link>
      </div>
    </>
  );
}
