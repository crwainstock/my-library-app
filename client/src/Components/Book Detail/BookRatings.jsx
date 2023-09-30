import React from "react";
import { useGetBookDetails } from "../../Hooks/useGetBookDetails";
import "./BookRatings.css";

export default function BookRatings() {
  const {
    loading,
    error,
    review,
    rating,
    bookData,
    book,
    handleReviewChange,
    handleReviewSubmit,
  } = useGetBookDetails();

  return (
    <div id="ratings" className="">
      {/* <form>
        <div className="rating">
          <input
            value="5"
            name="rate"
            id="star5"
            type="radio"
            checked={rating === 5}
            // onChange={handleRatingChange}
          />
          <label title="text" htmlFor="star5"></label>
          <input
            value="4"
            name="rate"
            id="star4"
            type="radio"
            checked={rating === 4}
            // onChange={handleRatingChange}
          />
          <label title="text" htmlFor="star4"></label>
          <input
            value="3"
            name="rate"
            id="star3"
            type="radio"
            checked={rating === 3}
            // onChange={handleRatingChange}
          />
          <label title="text" htmlFor="star3"></label>
          <input
            value="2"
            name="rate"
            id="star2"
            type="radio"
            checked={rating === 2}
            // onChange={handleRatingChange}
          />
          <label title="text" htmlFor="star2"></label>
          <input
            value="1"
            name="rate"
            id="star1"
            type="radio"
            checked={rating === 1}
            // onChange={handleRatingChange}
          />
          <label title="text" htmlFor="star1"></label>
        </div>
      </form> */}
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
  );
}
