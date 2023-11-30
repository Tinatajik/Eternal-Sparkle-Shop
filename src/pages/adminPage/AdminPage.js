import { Link } from "react-router-dom";
import Form from "./form/Form";

export default function AdminPage() {
  return (
    <>
      <div className="flex justify-around items-center mt-5">
      <Link to="/"><img width="60" height="60" src="https://img.icons8.com/bubbles/50/back.png" alt="back"/></Link>
        <div><img width="100" height="100" src="https://img.icons8.com/bubbles/100/system-administrator-female.png" alt="system-administrator-female"/></div>
      </div>
      <Form />
    </>
  );
}
