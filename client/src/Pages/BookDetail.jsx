import React from "react";
import { Link } from "react-router-dom";
import { useGetBookDetails } from "../Hooks/useGetBookDetails";
import Loading from "../Components/Loading/Loading";
import Error from "../Components/Error";
import BookDetailInfo from "../Components/Book Detail/BookDetailInfo";
import BookRatings from "../Components/Book Detail/BookRatings";
import "./BookDetail.css";

function BookDetail() {
  const { loading, error } = useGetBookDetails();

  // console.log(book);
  // console.log(error);

  return (
    <div className="book-detail-container">
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}
      {error == true && (
        <div className="error">
          <Error />
        </div>
      )}

      <BookDetailInfo />
      <BookRatings />
    </div>
  );
}
export default BookDetail;
