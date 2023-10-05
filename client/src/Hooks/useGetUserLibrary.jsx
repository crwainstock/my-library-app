import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserData } from "./useGetUserData";

export const useGetUserLibrary = () => {
  const params = useParams(); //A part of react-router
  const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  //   // this bookId is also used in the URL for this page
  const [userBooks, setUserBooks] = useState([]); //All books to be rendered for specific user
  const [loading, setLoading] = useState(true); //For loading spinner

  const { credentials } = useGetUserData(); //Get credentials from login to use in getUserLibrary
  let userId;

  useEffect(() => {
    getUserLibrary(); //Get all book from specific user
    searchUserBooksById(); // Get book details based on book ids in user library
    console.log(userBooks, userId);
  }, []);

  const getUserLibrary = async () => {
    try {
      let options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      };
      const result = await fetch("/users/userlibrary/:id", options);

      const data = await result.json();
      console.log(data);
      if (!result.ok) {
        console.error(
          `Error in request to ${url}: ${result.status} - ${result.statusText}`
        );
        const data = await result.json();
        setError(data.error);
      } else {
        localStorage.setItem("token", data.token);
        console.log(localStorage.token);
        navigate("/mylibrary/:userId"); //This needs to navigate to specific user library page
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
      setError("An error occurred during the request.");
    }
  };

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
      console.log(data); //individual objects with book details
      setUserBooks((book) => [...book, data]); // Adding object of data to books array
      //Could add something here to alphabatize the books?
      console.log(userBooks);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // WORKING
  // This function gets books FROM DATABASE for specific user via users_books juntion table
  // and loops through them, using the bookId to search the GOOGLE BOOKS API and return all book data
  const fetchUserBooks = async () => {
    setLoading(true);
    try {
      //Get books from database for userId
      let id = userId;
      let results = await fetch(`users/userlibrary/${id}`);
      let data = await results.json();
      let books = data.books;
      console.log(books); //returns array of books objects
      //Loop through books and search using bookId with the searchMyBooks function
      //Should return full book data from Google & set books as that data
      for (let i = 0; i < books.length; i++) {
        //console.log(books[i].bookId); //Seems to be accessing the bookId here
        await searchUserBooksById(books[i].bookId); //Use search function to look up book details using bookId
        console.log(books[i].bookId);
      }
      console.log(userBooks);
      setLoading(false);
      return userBooks;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    userBooks,
    setUserBooks,
    loading,
    setLoading,
  };
};
