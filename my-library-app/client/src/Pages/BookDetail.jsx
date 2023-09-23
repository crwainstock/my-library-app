import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
// import { useDataContext } from "../Hooks/useDataContext";
// import { Link, useParams } from "react-router-dom";
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
        {/* The styling for the buttons here could be better...kind of weird at different screen sizes */}
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
      <div id="bookDetails" className="col w-75 mt-6 mb-6">
        {success ? (
          <div id="success" className="rounded bg-info mb-4">
            <h3>Your review has been updated!</h3>
          </div>
        ) : (
          <div></div>
        )}
        <div className="row md-9">
          <div className="col">
            <img
              className="rounded mx-auto d-block mb-3"
              src={book.volumeInfo?.imageLinks?.thumbnail}
            />
            <h5>{book?.volumeInfo?.title}</h5>
            <h6>
              {book.volumeInfo?.authors?.[0]} {book.volumeInfo?.authors?.[1]}{" "}
            </h6>
          </div>
          <div className="col-md-8">
            <p>{book?.volumeInfo?.description}</p>
          </div>

          {bookData.review ? (
            <div className="row mt-4">
              <div className="col">
                <h5>{bookData.review}</h5>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div id="ratings" className="offset-md-3 col-md-6 mb-3 mt-4">
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
            className="form-control"
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
