import { Link } from "react-router-dom";
import Form from "./form/Form";

export default function AdminPage() {
  return (
    <>
      <div className="flex justify-around mt-5">
        <div>Admin Page</div>
        <Link to="/">back MainPage</Link>
      </div>
      <Form />
    </>
  );
}
