import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import { fetchBooks } from "../Hooks/useGetBookData";

export function loader() {
  const booksPromise = fetchBooks();
  return defer({ books: booksPromise });
}

const dataPromise = useLoaderData();

const renderBooks = (books) => {
  const booksElements = books.map((book) => (
    <div key={book.id + book.volumeInfo.title}>
      <h5>{book.volumeInfo.title}</h5>
      <p>
        {book.volumeInfo?.authors?.[0]} {book.volumeInfo.authors?.[1]}{" "}
      </p>
      <img src={book.volumeInfo.imageLinks?.thumbnail} />
    </div>
  ));
};

function MyLibrary() {
  return (
    <div className="App">
      <h1>My Library will display here</h1>
      <Suspense fallback={<BarLoader color="#ff8c38" />}>
        <Await resolve={dataPromise.books}>{renderBooks}</Await>
      </Suspense>
    </div>
  );
}

export default MyLibrary;
