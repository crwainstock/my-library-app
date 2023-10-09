// This hook checks whether or not a user is logged in based on whether their jwt token matches
// Pairs with the get router function in users.js for /userlibrary, includes guard ensureUserLoggedIn function

import { useEffect, useState } from "react";

export const useGetLoginStatus = () => {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    requestData();
  }, []);

  //sets isLoggedIn based on whether token is present in header or not aka user is logged in
  const requestData = async () => {
    let options = {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      const result = await fetch("/users/userlibrary", options);
      const data = await result.json();
      // console.log(data);
      if (!result.ok) {
        console.log(result);
        if (result.statusText === "Unauthorized") {
          setIsLoggedIn(false);
          setMessage("You need to log into your account to see your library.");
        } else {
          console.log("An error occurred during the request:", error);
          setMessage("An error occurred during the request.");
        }
      } else {
        console.log(data.message);
        setIsLoggedIn(true);
        setUserId(data.userId);
      }
    } catch (error) {
      console.log(error.name);
      if (error.name === "Unauthorized") {
        setMessage("You need to log into your account to see your library.");
      } else {
        console.error("An error occurred during the request:", error);
        setMessage("An error occurred during the request.");
      }
    }
  };

  return { isLoggedIn, setIsLoggedIn, message, setMessage, userId };
};
