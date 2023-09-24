import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useGetBookDetails } from "../Hooks/useGetBookDetails";
import "./BookDetail.css";

function BookDetail() {
  const {
    book,
    loading,
    error,
    success,
    rating,
    review,
    bookData,
    handleReviewChange,
    handleReviewSubmit,
    handleRatingSubmit,
    handleRatingChange,
  } = useGetBookDetails();

  // console.log(book);

  return (
    <div className="book-detail-container">
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}

      <div id="nav" className="navbar-container">
        <Link to="/">
          <button className="home-button">
            <h5>Home</h5>
          </button>
        </Link>
        <Link to="/myLibrary">
          <button className="mylibrary-button">
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

      <div id="ratings" className="">
        <form>
          <div className="rating">
            <input
              value="5"
              name="rate"
              id="star5"
              type="radio"
              checked={rating === 5}
              onChange={handleRatingChange}
            />
            <label title="text" for="star5"></label>
            <input value="4" name="rate" id="star4" type="radio" />
            <label title="text" for="star4"></label>
            <input value="3" name="rate" id="star3" type="radio" checked="" />
            <label title="text" for="star3"></label>
            <input value="2" name="rate" id="star2" type="radio" />
            <label title="text" for="star2"></label>
            <input value="1" name="rate" id="star1" type="radio" />
            <label title="text" for="star1"></label>
          </div>
        </form>
        <form onSubmit={handleReviewSubmit} className="review-form-container">
          <label htmlFor="review" className="form-label">
            {bookData.review ? (
              <h3>Update your review here.</h3>
            ) : (
              <h3>Write your review here.</h3>
            )}
          </label>
          <input
            type="textarea"
            className="input"
            placeholder="What do you think about this book?"
            value={review}
            onChange={handleReviewChange}
          ></input>
          <button type="submit">Save your review</button>
        </form>
      </div>
    </div>
  );
}

export default BookDetail;
