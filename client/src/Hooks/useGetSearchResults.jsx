import { useEffect, useState } from "react";

export const useGetSearchResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(true); // State variable for radio buttons -- true = search by title, false = search by author
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // I need this to limit results to books for kids,
  // but it's creating problems with search results (other categories exist that might be relevant)
  // See more in the notes here: https://docs.google.com/document/d/16H9LM7R9L0kpnlxoho1FrG1MixFCQ_XpMKUT5S937Tk/edit?usp=sharing
  const getJuvenileBooks = (books) => {
    const juvenileBooks = books.filter((book) => {
      return (
        book.volumeInfo.categories?.[0] === "Juvenile Fiction" ||
        book.volumeInfo.categories?.[0] === "Juvenile Nonfiction"
      );
    });
    setSearchResults(juvenileBooks);
    setSearchPerformed(true);
  };

  //Function to use Google Books API and search BY TITLES -- POST function in index.js uses API and searches titles with searchTerm in body
  const searchBooksByTitle = async (searchTerm) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: searchTerm }),
    };
    try {
      let results = await fetch(`/mylibrary/searchByTitle`, options);
      let data = await results.json();
      // console.log(data.items);
      getJuvenileBooks(data.items);
      // console.log(searchResults); //returning array of objects

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //Function to use Google Books API and search BY AUTHOR -- POST function in index.js uses API and searches AUTHORS with searchTerm in body
  const searchBooksByAuthor = async (searchTerm) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author: searchTerm }),
    };
    try {
      let results = await fetch(`/mylibrary/searchByAuthor`, options);
      let data = await results.json();
      // console.log(data.items);
      getJuvenileBooks(data.items);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If search by title (true) is selected, use title search function
    // If search by author (false) is selected, use author search function
    if (selected === true) {
      searchBooksByTitle(searchTerm);
    } else if (selected === false) {
      searchBooksByAuthor(searchTerm);
    }
    // searchResultsCB(searchResults); //Trying to pass data to parent here. Will need eventually for Adding books functionality
    setSearchTerm("");
    // console.log(searchResults); //returning array of objects
    return searchResults;
  };

  // Function to add book to database
  const addBook = async (e) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId: e }),
    };
    try {
      let results = await fetch(`/mylibrary`, options);
      let data = await results.json();
      console.log(data);
      setLoading(false);

      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    searchTerm,
    setSearchTerm,
    selected,
    setSelected,
    searchResults,
    loading,
    success,
    searchPerformed,
    handleSubmit,
    addBook,
  };
};
