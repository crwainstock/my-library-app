// This is where the data from the database will be fetched
// and sent to the provider/useContext to be used throughout the app.

import { useEffect, useState } from "react";

const useGetLibraryData = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Uses id to search Google books and return book details
    const searchMyBooksById = async (bookId) => {
      setLoading(true);
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: bookId }),
      };
      try {
        //Search Google using bookId from database
        let results = await fetch(`/mylibrary/searchById`, options);
        let data = await results.json();
        console.log(data); //Search is working, but rendering is not. -- individual objects with book details

        setBooks((book) => [...book, data]); // Adding object of data to books array
        console.log(books);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const fetchBooks = async () => {
      setLoading(true);
      try {
        //Get books from database
        let results = await fetch("/mylibrary");
        // console.log(results);
        let data = await results.json();
        // console.log(data);
        //Loop through books and search using bookId with the searchMyBooks function
        //Should return full book data from Google & set books as that data
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i].bookId); //Seems to be accessing the bookId here
          await searchMyBooksById(data[i].bookId); //Use search function to look up book details using bookId
        }
        console.log(books);
        setLoading(false);
        // return books;
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchBooks();
    // console.log(books);
  }, []);

  return { books, loading, error };
};

export default useGetLibraryData;
