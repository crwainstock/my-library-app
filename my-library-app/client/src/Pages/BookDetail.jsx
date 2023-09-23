import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useGetBookDetails } from "../Hooks/useGetBookDetails";

function BookDetail() {
  const {
    book,
    loading,
    error,
    success,
    review,
    bookData,
    handleChange,
    handleSubmit,
  } = useGetBookDetails();

  console.log(book);

  return (
    <div className="book-detail-container">
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}

      <div id="nav" className="">
        <Link to="/">
          <button className="">
            <h5>Home</h5>
          </button>
        </Link>
        <Link to="/myLibrary">
          <button className="">
            <h5>My Library</h5>
          </button>
        </Link>
      </div>
      <div id="bookDetails" className="">
        {success ? (
          <div id="success" className="">
            <h3>Your review has been updated!</h3>
          </div>
        ) : (
          <div></div>
        )}
        <div className="">
          <div className="">
            <img className="" src={book.volumeInfo?.imageLinks?.thumbnail} />
            <h5>{book?.volumeInfo?.title}</h5>
            <h6>
              {book.volumeInfo?.authors?.[0]} {book.volumeInfo?.authors?.[1]}{" "}
            </h6>
          </div>
          <div className="">
            <p>{book?.volumeInfo?.description}</p>
          </div>

          {bookData.review ? (
            <div className="">
              <div className="">
                <h5>{bookData.review}</h5>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div id="ratings" className="">
        <form onSubmit={handleSubmit}>
          <label htmlFor="review" className="form-label">
            {bookData.review ? (
              <h3>Update your review here.</h3>
            ) : (
              <h3>What did you think about this book?</h3>
            )}
          </label>
          <input
            type="textarea"
            className=""
            placeholder="Write your review here"
            value={review}
            onChange={handleChange}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default BookDetail;
