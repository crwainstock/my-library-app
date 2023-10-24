import { useState } from "react";
import { useDataContext } from "./useDataContext";

export const useGetAddBook = () => {
  const { userId } = useDataContext();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookAdded, setBookAdded] = useState(false);

  // TO ADD A BOOK TO USER LIBRARY
  const addBook = async (e) => {
    setLoading(true);
    if (userId == null) {
      setBookAdded(false);
    } else {
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: e }),
      };
      try {
        let results = await fetch(`users/userlibrary/${userId}`, options);
        let data = await results.json();
        // console.log(data); // All books for all users for some reason.
        setLoading(false);
        setSuccess(true);
        setBookAdded(true);
      } catch (error) {
        console.error("An error occurred during the request:", error);
        setError("An error occurred during the request.");
      }
    }
  };

  return { addBook, bookAdded };
};
