import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserData } from "./useGetUserData";
import { useGetLoginStatus } from "./useGetLoginStatus";

export const useGetUserLibrary = () => {
  const params = useParams(); //A part of react-router
  const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  // //   // this bookId is also used in the URL for this page
  const [userBooks, setUserBooks] = useState([]); //All books to be rendered for specific user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { userId } = useGetLoginStatus();

  // Is there a better way to call this function? Maybe when someone navigates to the MyLibrary page?
  // Maybe I can do that in router.
  useEffect(() => {
    getUserLibrary(); //Get all book from specific user
  }, []);

  // GET ALL BOOKS FROM USER'S LIBRARY -- this function works in Postman (the backend part),
  // but it's returning undefined here.
  const getUserLibrary = async () => {
    setLoading(true);
    try {
      //Get books from database for userId
      let id = userId; // from useGetLoginStatus
      let results = await fetch(`users/userlibrary/${id}`);
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

  // OLDER WORKING VERSION -- NOT WORKING AS IS
  // const getUserLibrary = async (userId) => {
  //   try {
  //     let options = {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(credentials),
  //     };
  //     const result = await fetch("/users/mylibrary/:id", options);

  //     const data = await result.json();
  //     console.log(data);
  //     if (!result.ok) {
  //       console.error(
  //         `Error in request to ${url}: ${result.status} - ${result.statusText}`
  //       );
  //       const data = await result.json();
  //       setError(data.error);
  //     } else {
  //       localStorage.setItem("token", data.token);
  //       console.log(localStorage.token);
  //       navigate("/mylibrary/:userId"); //This needs to navigate to specific user library page
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during the request:", error);
  //     setError("An error occurred during the request.");
  //   }
  // };

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

  return {
    userBooks,
    setUserBooks,
    loading,
    setLoading,
    error,
    setError,
    getUserLibrary,
    searchUserBooksById,
  };
};
