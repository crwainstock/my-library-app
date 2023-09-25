import React from "react";
import { Link } from "react-router-dom";
import { useGetBookDetails } from "../Hooks/useGetBookDetails";

export default function Error() {
  const { error } = useGetBookDetails();

  return (
    <div className="error-container">
      <p>Uh oh! Something isn't right.</p>
      <p>{error}</p>
      <Link to="/" className="link-button">
        Return home
      </Link>
    </div>
  );
}
