import React from "react";
import Loading from "../Components/Loading/Loading";
// import { useDataContext } from "../Hooks/useDataContext";
// import { Link, useParams } from "react-router-dom";
import { useGetBookDetails } from "../Hooks/useGetBookDetails";

function BookDetail() {
  const { book, loading } = useGetBookDetails();
  console.log(book);

  return (
    <div className="book-detail-container">
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}

      <h2>This is where book details will go</h2>
    </div>
  );
}

export default BookDetail;
