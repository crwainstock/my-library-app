import React from "react";
import { useGetSearchResults } from "../../Hooks/useGetSearchResults";
import Loading from "../../Components/Loading/Loading";
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

                  <button
                    className="add-to-library-button"
                    onClick={(e) => {
                      addBook(result.id);
                    }}
                  >
                    Add Book to my Library
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
