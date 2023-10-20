import { useState } from "react";
import { useDataContext } from "./useDataContext";

export const useGetDeleteBook = () => {
  const { userId } = useDataContext();
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDBBooks = async (bookId) => {
    console.log(bookId); //bookId
    setLoading(true);
    try {
      //Get all database books
      let results = await fetch(`users/userlibrary/${userId}`);
      let data = await results.json();

      //Loop through books, look for bookId
      for (let i = 0; i < data.length; i++) {
        if (bookId === data[i].bookId) {
          let bookToDelete = data[i].id;
          let bookData = data[i]; //individual book data from database
          setBookData(bookData); //individual book data from database -- used in rendering review
          // console.log(bookData);

          return bookToDelete; //id of book to update for DELETE function below
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
    // console.log(bookToDelete);
    let options = {
      method: "DELETE",
    };
    try {
      let results = await fetch(`users/userlibrary/${bookToDelete}`, options);
      let data = await results.json();

      setLoading(false);
      window.location.reload(); //To manually refresh the page & update data -- idk why it wasn't working through the fetch functions
      setSuccess(true); //For success message upon delete
      // setTimeout(function () {
      //   setSuccess(false); //To remove success message after a few seconds -- not necessary with page refresh, though. Could be smoother.
      // }, 5000);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  return { deleteBook };
};
