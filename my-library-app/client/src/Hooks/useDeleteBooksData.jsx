import { useEffect, useState } from "react";

const useDeleteBookData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //FUNCTION TO GET DATABASE BOOKS BASED ON BOOKID FOR DELETE FUNCTION
  const fetchDBBooks = async (bookId) => {
    setLoading(true);
    try {
      console.log(bookId);
      //Get all database books
      let results = await fetch(`/mylibrary`);
      let data = await results.json();

      //Loop through books, look for bookId
      for (let i = 0; i < data.length; i++) {
        if (bookId === data[i].bookId) {
          let bookToDelete = data[i].id;
          // console.log(bookToDelete);
          return bookToDelete; //id of book to delete to be used in delete function below
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //DELETE FUNCTION -- USES ID RETURNED IN PREVIOUS FUNCTION TO DELETE BOOK FROM DATABASE
  const deleteBook = async (e) => {
    setLoading(true);
    let bookToDelete = await fetchDBBooks(e); //id of book to delete
    // console.log(bookToDelete);
    let options = {
      method: "DELETE",
    };
    try {
      let results = await fetch(`/myLibrary/${bookToDelete}`, options);
      let data = await results.json();

      setLoading(false);
      window.location.reload(); //To manually refresh the page & update data -- idk why it wasn't working through the fetch functions
      setSuccess(true); //For success message upon delete
      // setTimeout(function () {
      //   setSuccess(false); //To remove success message after a few seconds -- not necessary with page refresh, though. Could be smoother.
      // }, 5000);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    deleteBook();
  }, []);

  return { data, loading, error };
};

export default useDeleteBookData;
