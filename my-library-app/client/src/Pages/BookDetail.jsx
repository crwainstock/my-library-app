import React from "react";
import { useDataContext } from "../Hooks/useDataContext";
import { Link } from "react-router-dom";

function BookDetail() {
  const { books, loading } = useDataContext();

  return (
    <div className="book-detail-container">
      <h2>This is where book details will go</h2>
    </div>
  );
}

export default BookDetail;
