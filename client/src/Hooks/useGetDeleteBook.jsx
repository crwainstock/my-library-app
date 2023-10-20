import { useState } from "react";
import { useDataContext } from "./useDataContext";

export const useGetDeleteBook = () => {
  const { userId } = useDataContext();
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchDBBooks = async (bookId) => {
    console.log(bookId);
    setLoading(true);
    try {
      //Get all database books
      let results = await fetch(`users/userlibrary/${userId}`);
      let data = await results.json();
      let bookData = data.books;
      console.log(bookData); //Showing books for specific user; books is an array with bookId, libraryId, review

      //Loop through books, look for bookId
      for (let i = 0; i < bookData.length; i++) {
        if (bookId === bookData[i].bookId) {
          let bookToDeleteId = bookData[i].libraryId;
          console.log(bookToDeleteId);
          //   let bookData = data[i]; //individual book data from database
          //   setBookData(bookData); //individual book data from database -- used in rendering review
          console.log(bookData);

          return bookToDeleteId; //id of book to update for DELETE function below
        }
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const deleteBook = async (e) => {
    setLoading(true);
    let bookToDelete = await fetchDBBooks(e); //id of book to delete
    console.log(bookToDelete);
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookToDelete: bookToDelete }),
    };
    try {
      let results = await fetch(`users/userlibrary/${userId}`, options);
      let data = await results.json();

      setLoading(false);
      window.location.reload(); //To manually refresh the page & update data
    } catch (error) {
      console.error("An error occurred during the request:", error);
      setError("An error occurred during the request.");
      setLoading(false);
    }
  };
  return { deleteBook };
};
