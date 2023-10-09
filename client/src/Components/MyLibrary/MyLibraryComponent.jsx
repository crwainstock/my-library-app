import React from "react";
// import { useEffect } from "react";
// import { useDataContext } from "../../Hooks/useDataContext";
import { useGetBookDetails } from "../../Hooks/useGetBookDetails";
import { useGetSearchResults } from "../../Hooks/useGetSearchResults";
import { useGetUserLibrary } from "../../Hooks/useGetUserLibrary";
import { useGetLoginStatus } from "../../Hooks/useGetLoginStatus";
import { Link } from "react-router-dom";
import "./MyLibrary.css";

export default function MyLibraryComponent() {
  // const { books, loading } = useDataContext(); // This can be used in version of app without multiple users
  const { deleteBook } = useGetBookDetails();
  const { bookAdded, setBookAdded } = useGetSearchResults();
  const { userBooks } = useGetUserLibrary();
  const { isLoggedIn, userId } = useGetLoginStatus(); // eventually use this to prompt login if not logged in

  return (
    <div className="my-library-container">
      {userBooks.length === 0 ? (
        <div className="empty-library-container">
          <h3>Your library is empty.</h3>
          <Link to="/" className="link-button">
            Search for books on the home page
          </Link>
        </div>
      ) : (
        userBooks.map((book) => (
          <div
            className="book-card"
            id="book"
            key={book.id + book.volumeInfo.title}
          >
            <h5>{book.volumeInfo.title}</h5>
            <p>
              {book.volumeInfo?.authors?.[0]} {book.volumeInfo.authors?.[1]}{" "}
            </p>
            <img src={book.volumeInfo.imageLinks?.thumbnail} />
            <div className="button-container">
              <Link to={`/myLibrary/${book.id}`}>
                <button id="seeMore" className="">
                  See More
                </button>
              </Link>
              <div id="deleteIcon" className="" key={book.id}>
                <button
                  id="deleteBook"
                  className=""
                  onClick={(e) => {
                    deleteBook(book.id);
                  }}
                >
                  {" "}
                  Delete Book{" "}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
