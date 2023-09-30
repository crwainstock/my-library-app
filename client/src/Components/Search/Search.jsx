import React from "react";
import { useGetSearchResults } from "../../Hooks/useGetSearchResults";
import Loading from "../../Components/Loading/Loading";
import "./search.css";

import { useEffect, useState, useRef } from "react";
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
    handleSubmit,
    addBook,
  } = useGetSearchResults();

  const [open, setOpen] = useState(false);
  const eventDateRef = useRef(new Date());
  const timerRef = useRef(0);

  function oneWeekAway(date) {
    const now = new Date();
    const inOneWeek = now.setDate(now.getDate() + 7);
    return new Date(inOneWeek);
  }

  function prettyDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(date);
  }

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
        <div id="searchResults" className="search-results-container">
          {searchResults.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <div className="row">
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
                  <p>{result.volumeInfo.description}</p>
                  <Toast.Provider swipeDirection="right">
                    <button
                      className="Button large violet"
                      onClick={(e) => {
                        // Toast function
                        setOpen(false);
                        window.clearTimeout(timerRef.current);
                        timerRef.current = window.setTimeout(() => {
                          eventDateRef.current = oneWeekAway();
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
                      <Toast.Description asChild>
                        <time
                          className="ToastDescription"
                          dateTime={eventDateRef.current.toISOString()}
                        >
                          {prettyDate(eventDateRef.current)}
                        </time>
                      </Toast.Description>
                      <Toast.Action
                        className="ToastAction"
                        asChild
                        altText="Goto schedule to undo"
                      >
                        <button className="Button small green">Undo</button>
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
