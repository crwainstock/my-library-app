import React from "react";
import { useDataContext } from "../Hooks/useDataContext";
import { Link } from "react-router-dom";

function MyLibrary() {
  const { books, loading } = useDataContext();
  //   console.log(books);
  return (
    <div className="my-library-container">
      {books.map((book) => (
        <div className="" id="book" key={book.id + book.volumeInfo.title}>
          <h5>{book.volumeInfo.title}</h5>
          <p>
            {book.volumeInfo?.authors?.[0]} {book.volumeInfo.authors?.[1]}{" "}
          </p>
          <img src={book.volumeInfo.imageLinks?.thumbnail} />
          <div className="">
            <Link to={`/myLibrary/${book.id}`}>
              <button id="seeMore" className="">
                See More
              </button>
            </Link>
            <div id="deleteIcon" className="col" key={book.id}>
              <button
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
      ))}
    </div>
  );
}

export default MyLibrary;
