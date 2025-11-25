import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p className="text-blue-700 underline">
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
