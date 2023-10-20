import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useGetSearchResults } from "../../Hooks/useGetSearchResults";
import { useGetAddBook } from "../../Hooks/useGetAddBook";
import Loading from "../../Components/Loading/Loading";

import Google from "../../Assets/poweredby.png";
import "./search.css";

import * as Toast from "@radix-ui/react-toast";
import "../Toast/toast.css";

export default function Search() {
  const {
    searchTerm,
    setSearchTerm,
    selected,
    setSelected,
    searchResults,
    loading,
    success,
    searchPerformed,
    handleSubmit,
    // addBook,
  } = useGetSearchResults();
  const { addBook, bookAdded } = useGetAddBook();

  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div id="searchArea" className="search-component-container">
      <div className="row">
        <div id="searchBox" className="offset-md-3 col-md-6 mb-3">
          <form onSubmit={handleSubmit}>
            <label htmlFor="search" className="form-label">
              <h3>Search for a book</h3>
            </label>
            <input
              type="text"
              className="input"
              placeholder="Search for a book here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <img src={Google} id="by-Google" />

            <div className="search-type-container">
              <div className="">
                <label>
                  <input
                    type="radio"
                    name="searchFilter"
                    className="form-check-input"
                    checked={true === selected}
                    onChange={(e) => {
                      setSelected(true);
                    }}
                    value="titleSearch"
                  />
                  Search by Title
                </label>
              </div>
              <div className="">
                <label>
                  <input
                    type="radio"
                    name="searchFilter"
                    className="form-check-input"
                    checked={false === selected}
                    onChange={(e) => {
                      setSelected(false);
                    }}
                    value="authorSearch"
                  />
                  Search by Author
                </label>
              </div>
            </div>
            <button type="submit" id="submit-search-button">
              <h5>Search</h5>
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div id="searchResults" className="">
          {searchResults.length === 0 && searchPerformed == true ? (
            <p>No results found.</p>
          ) : (
            <div className="search-results-container">
              {searchResults.map((result) => (
                <div
                  className="book-result-container"
                  id="result"
                  key={result.id}
                >
                  <img src={result.volumeInfo.imageLinks?.thumbnail} />
                  <h5>{result.volumeInfo.title}</h5>
                  <p>
                    {result.volumeInfo.authors?.[0]}{" "}
                    {result.volumeInfo.authors?.[1]}
                  </p>
                  <div id="book-description-container">
                    <p id="search-book-description">
                      {result.volumeInfo.description}
                    </p>
                  </div>
                  <Toast.Provider swipeDirection="right">
                    <button
                      className="add-to-library-button"
                      onClick={(e) => {
                        // Toast function
                        setOpen(false);
                        window.clearTimeout(timerRef.current);
                        timerRef.current = window.setTimeout(() => {
                          setOpen(true);
                        }, 100);

                        //Adds book to database
                        addBook(result.id);
                      }}
                    >
                      Add book to my library
                    </button>
                    <Toast.Root
                      className="ToastRoot"
                      open={open}
                      onOpenChange={setOpen}
                    >
                      <Toast.Title className="ToastTitle">
                        A book was added to your library
                      </Toast.Title>
                      {/* <Toast.Description asChild>
                        
                      </Toast.Description> */}
                      <Toast.Action
                        className="ToastAction"
                        asChild
                        altText="Go to my library"
                      >
                        <button className="Button small green">
                          <Link to="/mylibrary">Visit my library</Link>
                        </button>
                      </Toast.Action>
                    </Toast.Root>
                    <Toast.Viewport className="ToastViewport" />
                  </Toast.Provider>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
