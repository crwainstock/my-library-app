import React from "react";
import { useGetSearchResults } from "../../Hooks/useGetSearchResults";
import { useGetDeleteBook } from "../../Hooks/useGetDeleteBook";
import { Link } from "react-router-dom";
import "./MyLibrary.css";
import useGetUserLibraryQuery from "../../Hooks/useGetUserLibraryQuery";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function MyLibraryComponent() {
  // const { books, loading } = useDataContext(); // This can be used in version of app without multiple users

  // userBooks can also be accessed directly through the useGetUserLibrary hook below. I was just
  // testing out whether it would work the same if accessing the variable through the data provider
  // const { userBooks, loading, fetchUserBooks } = useGetUserLibrary();

  const { userBooks } = useGetUserLibraryQuery();
  console.log(userBooks);
  console.log(booksError);
  // eventually use this to prompt login if not logged in
  // const { deleteBook } = useGetBookDetails(); // for non-auth app version
  const { bookAdded, setBookAdded } = useGetSearchResults();
  const { deleteBook } = useGetDeleteBook();

  // console.log(isLoggedIn);
  return (
    <div className="my-library-container">
      {/* Add something here to not render this first bit if the app is loading. 
      If it's not loading but still empty, then render this. */}
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
            <h5>{book?.volumeInfo.title}</h5>
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
