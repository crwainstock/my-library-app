import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserLibrary } from "./useGetUserLibrary";

export const useGetBookDetails = () => {
  const { userBooks, setUserBooks } = useGetUserLibrary();
  console.log(userBooks); //empty

  const [book, setBook] = useState([]); //Book info from Google
  const [bookData, setBookData] = useState([]); //Book info from database
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const ID = params.id;

  const searchMyBooksById = async (ID) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: ID }),
    };
    try {
      //Search Google using bookId from database
      let results = await fetch(`/mylibrary/searchById`, options);
      let data = await results.json();
      console.log(data); //returning full object of book data from Google -- working

      setBook(data);

      console.log(book);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred during the request:", error);
      setError("An error occurred during the request.");
      setLoading(false);
    }
  };

  // FUNCTION WORKS WITH NON-AUTH VERSION OF THE APP -- for adding new book
  // const fetchDBBooks = async (bookId) => {
  //   // console.log(bookId); //bookId
  //   setLoading(true);
  //   try {
  //     //Get all database books
  //     let results = await fetch(`/mylibrary`);
  //     let data = await results.json();

  //     //Loop through books, look for bookId
  //     for (let i = 0; i < data.length; i++) {
  //       if (bookId === data[i].bookId) {
  //         let bookToUpdate = data[i].id;
  //         let bookData = data[i]; //individual book data from database
  //         setBookData(bookData); //individual book data from database -- used in rendering review
  //         // console.log(bookData);

  //         return bookToUpdate; //id of book to update for PUT function below
  //       }
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err);
  //     setLoading(false);
  //   }
  // };

  // THIS FUNCTION WORKS WITH THE NON-AUTH VERSION OF THE APP
  //DELETE FUNCTION -- USES ID RETURNED IN PREVIOUS FUNCTION TO DELETE BOOK FROM DATABASE
  // const deleteBook = async (e) => {
  //   setLoading(true);
  //   let bookToDelete = await fetchDBBooks(e); //id of book to delete
  //   // console.log(bookToDelete);
  //   let options = {
  //     method: "DELETE",
  //   };
  //   try {
  //     let results = await fetch(`/mylibrary/${bookToDelete}`, options);
  //     let data = await results.json();

  //     setLoading(false);
  //     window.location.reload(); //To manually refresh the page & update data -- idk why it wasn't working through the fetch functions
  //     setSuccess(true); //For success message upon delete
  //     // setTimeout(function () {
  //     //   setSuccess(false); //To remove success message after a few seconds -- not necessary with page refresh, though. Could be smoother.
  //     // }, 5000);
  //   } catch (err) {
  //     setError(err);
  //     setLoading(false);
  //   }
  // };

  // THIS FUNCTION WORKS WITH THE NON-AUTH VERSION OF THE APP
  // const updateReview = async () => {
  //   let bookToUpdate = await fetchDBBooks(book.id);
  //   // console.log(bookToUpdate);
  //   const options = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ review: review }),
  //   };
  //   try {
  //     let results = await fetch(`/mylibrary/${bookToUpdate}`, options);
  //     // console.log(results);
  //     let data = await results.json();
  //     // console.log(data);

  //     setLoading(false);

  //     window.location.reload(); //To remove success message after a few seconds -- not necessary with page refresh, though. Could be smoother.
  //     setSuccess(true); //To show success message
  //   } catch (err) {
  //     setError(err);
  //     setLoading(false);
  //   }
  // };
  //For review input field
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // updateReview(review); // NEEDS TO BE UDPATED WITH AUTH VERSION OF FUNCTION
    setReview("");
    // console.log(review); // Ok, setting review works.
  };

  // // TO UPDATE RATING FOR BOOK
  // const updateRating = async () => {
  //   let bookToUpdate = await fetchDBBooks(book.id);
  //   // console.log(bookToUpdate);
  //   const options = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ rating: rating }),
  //   };
  //   try {
  //     let results = await fetch(`/myLibrary/${bookToUpdate}`, options);
  //     console.log(results);
  //     let data = await results.json();
  //     console.log(data);

  //     setLoading(false);
  //     setSuccess(true); //To show success message
  //     setTimeout(function () {
  //       window.location.reload(); //To remove success message after a few seconds -- not necessary with page refresh, though. Could be smoother.
  //     }, 5000);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   searchMyBooksById(ID);
  //   // fetchDBBooks(ID);
  // }, []);

  return {
    book,
    loading,
    error,
    // success,
    // review,
    // rating,
    // bookData,
    // deleteBook,
    // handleReviewChange,
    // handleReviewSubmit,
  };
};
