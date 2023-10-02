import React from "react";
import { useGetBookDetails } from "../Hooks/useGetBookDetails";
import Loading from "../Components/Loading/Loading";
import Error from "../Components/Error";
import BookDetailInfo from "../Components/Book Detail/BookDetailInfo";
import BookRatings from "../Components/Book Detail/BookRatings";
import NavBar from "../Components/NavBar/NavBar";

function BookDetail() {
  const { loading, error } = useGetBookDetails();

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
