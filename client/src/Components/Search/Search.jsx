import React from "react";
import { useGetSearchResults } from "../../Hooks/useGetSearchResults";
import "./search.css";

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

  return (
    <div id="searchArea" className="container ">
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

            <div className="row mt-3">
              <div className="col form-check">
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
                  Search by Book Title
                </label>
              </div>
              <div className="col form-check">
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
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      {success ? (
        <div className="rounded bg-info mb-4">
          <h3>A book was added to your library!</h3>
        </div>
      ) : (
        <div></div>
      )}
      {loading ? (
        <div className="spinner-border text-warning mb-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div id="searchResults" className="container mt-2 mb-4">
          <div className="row">
            {searchResults.map((result) => (
              <div
                className="col-lg-4 col-md-6 col-12 ps-3 pe-3"
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
                {/* Add something here to render a message if trying to add book to library more than once. 
                Add success message if book is added successfully.*/}

                <button
                  className="rounded btn btn-success"
                  onClick={(e) => {
                    addBook(result.id);
                  }}
                >
                  Add Book to my Library
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
