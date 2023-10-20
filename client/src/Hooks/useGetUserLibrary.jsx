import { useState, useEffect } from "react";
import { useGetLoginStatus } from "./useGetLoginStatus";

export const useGetUserLibrary = () => {
  const [userBooks, setUserBooks] = useState([]); //All books to be rendered for specific user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { userId } = useGetLoginStatus();

  useEffect(() => {
    fetchUserBooks(); //Get all book from specific user
  }, [userId, userBooks]);

  const searchUserBooksById = async (bookId) => {
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
      setUserBooks((book) => [...book, data]); // Adding object of data to books array
      //Could add something here to alphabatize the books?;

      setLoading(false);
    } catch (error) {
      console.error("An error occurred during the request:", error);
      setError("An error occurred during the request.");
      setLoading(false);
    }
  };

  const fetchUserBooks = async () => {
    setLoading(true);
    try {
      //Get books from database for userId
      let results = await fetch(`users/userlibrary/${userId}`);
      let data = await results.json();
      console.log(data);
      let books = data.books;
      console.log(books);

      // REMOVED LOGIC FOR LOOPING THROUGH THE BOOKS AND ADDING THEM TO userBook ARRAY.
      // NEED TO REVISIT LATER. UGH.

      //Loop through books and search using bookId with the searchMyBooks function
      //Should return full book data from Google & set books as that data
      // for (let i = 0; i < books.length; i++) {
      //   //console.log(books[i].bookId); //Seems to be accessing the bookId here
      //   await searchUserBooksById(books[i].bookId); //Use search function to look up book details using bookId
      //   // console.log(books[i].bookId);
      // }
      setLoading(false);
      return userBooks;
    } catch (error) {
      console.error("An error occurred during the request:", error);
      setError("An error occurred during the request.");
      setLoading(false);
      return null;
    }
  };

  return {
    userBooks,
    setUserBooks,
    loading,
    setLoading,
    error,
    setError,
    fetchUserBooks,
  };
};

export default useGetUserLibrary;
