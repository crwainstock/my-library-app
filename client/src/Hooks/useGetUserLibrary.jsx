import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserData } from "./useGetUserData";
import { useGetLoginStatus } from "./useGetLoginStatus";

export const useGetUserLibrary = () => {
  const [userBooks, setUserBooks] = useState([]); //All books to be rendered for specific user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { userId } = useGetUserData();

  // The functions are defined inside the useEffect because that's how it was in the non-auth version when
  // rendering mylibrary was happening without a delay. But this doesn't seem to resolve the issue.
  useEffect(() => {
    console.log(userId);
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

    // GET ALL BOOKS FROM USER'S LIBRARY -- this function works in Postman,
    // but it's returning undefined here.
    const getUserLibrary = async () => {
      setLoading(true);
      try {
        //Get books from database for userId
        // let id = userId; // from useGetLoginStatus
        let results = await fetch(`users/userlibrary/${userId}`);
        let data = await results.json();
        console.log(data.books); //undefined sometimes
        let books = data.books;
        // console.log(books); //undefined sometimes
        //Loop through books and search using bookId with the searchMyBooks function
        //Should return full book data from Google & set books as that data

        // Adding this if/else statement here made the data rendering more predictable. Without it,
        // sometimes the data was loading and other times it was returning undefined. I'm not sure why exactly,
        // but this seems to have resolved the issue for now. Just kidding. The same thing is happening.
        if (books.length == 0) {
          console.log("Your library is empty.");
          return;
        } else {
          for (let i = 0; i < books.length; i++) {
            //console.log(books[i].bookId); //Seems to be accessing the bookId here
            await searchUserBooksById(books[i].bookId); //Use search function to look up book details using bookId
            console.log(books[i].bookId); //working!
          }
        }
        // console.log(userBooks);
        setLoading(false);
        return userBooks;
      } catch (error) {
        console.error("An error occurred during the request:", error);
        setError("An error occurred during the request.");
        setLoading(false);
      }
    };

    getUserLibrary(); //Get all book from specific user
  }, []);

  return {
    userBooks,
    setUserBooks,
    loading,
    setLoading,
    error,
    setError,
  };
};
