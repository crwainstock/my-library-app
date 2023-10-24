import { useState, useEffect } from "react";
import { useGetLoginStatus } from "./useGetLoginStatus";

export const useGetUserLibrary = () => {
  const [userBooks, setUserBooks] = useState([]); //All books to be rendered for specific user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { userId } = useGetLoginStatus();

  useEffect(() => {
    fetchUserBooks(); //Get all book from specific user
  }, [userId]);

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
      // console.log(data); //individual objects with book details

      setUserBooks((book) => [...book, data]); // Adding object of data to books array
      //Could add something here to alphabatize the books?
      // console.log(userBooks);
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
      // console.log(data);
      let books = data.books;

      for (let i = 0; i < books.length; i++) {
        await searchUserBooksById(books[i].bookId); //Use search function to look up book details using bookId
      }
      // console.log(userBooks);
      setLoading(false);
      // return userBooks;
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
