import React from "react";
import { useGetBookDetails } from "../../Hooks/useGetBookDetails";
import "./BookDetailInfo.css";
import { useGetUserLibrary } from "../../Hooks/useGetUserLibrary";

export default function BookDetailInfo() {
  // From non-auth version of the app
  // const { book, loading, error, success, review, bookData } =
  //   useGetBookDetails();

  const { userBooks } = useGetBookDetails();

  return (
    <div id="bookDetails" className="">
      {/* {success ? (
        <div id="success" className="">
          <h3>Your review has been updated!</h3>
        </div>
      ) : (
        <div></div>
      )} */}
      <div className="book-detail-info">
        <div className="">
          <img className="" src={book.volumeInfo?.imageLinks?.thumbnail} />
          <h5>{book?.volumeInfo?.title}</h5>
          <p>
            {book.volumeInfo?.authors?.[0]} {book.volumeInfo?.authors?.[1]}{" "}
          </p>
        </div>
        <div className="book-description-container">
          <p>{book?.volumeInfo?.description.replace(/(<([^>]+)>)/gi, "")}</p>
        </div>

        {bookData.review ? (
          <div className="review-container">
            <p>{bookData.review}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
