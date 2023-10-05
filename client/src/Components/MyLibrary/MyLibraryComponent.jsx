import React from "react";
// import { useEffect } from "react";
import { useDataContext } from "../../Hooks/useDataContext";
import { useGetBookDetails } from "../../Hooks/useGetBookDetails";
import { useGetSearchResults } from "../../Hooks/useGetSearchResults";
import { useGetUserLibrary } from "../../Hooks/useGetUserLibrary";
import { Link } from "react-router-dom";
import "./MyLibrary.css";

export default function MyLibraryComponent() {
  const { books, loading } = useDataContext();
  const { deleteBook } = useGetBookDetails();
  const { bookAdded, setBookAdded } = useGetSearchResults();
  const { userBooks, setUserBooks } = useGetUserLibrary();

  console.log(bookAdded);
  //I need the MyLibrary component to re-render with new book data if a new book is added. So far, it's not working.
  if (bookAdded == true) {
    window.location.reload();
    setBookAdded(false);
  }

  return (
    <div className="my-library-container">
      {books.length === 0 ? (
        <div className="empty-library-container">
          <h3>Your library is empty.</h3>
          <Link to="/" className="link-button">
            Search for books on the home page
          </Link>
        </div>
      ) : (
        books.map((book) => (
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
