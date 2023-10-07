// This hook checks whether or not a user is logged in based on whether their jwt token matches
// Pairs with the get router function in users.js for /userlibrary, includes guard ensureUserLoggedIn function

import { useEffect, useState } from "react";

export const useGetLoginStatus = () => {
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userId, setUserId] = useState(null);

  useEffect(() => {
    requestData();
  }, []);

  // useEffect(() => {
  //   // Log the updated userId when it changes
  //   // console.log("userId updated:", userId);
  // }, [userId]);

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
      console.log(data);
      if (!result.ok) {
        console.log(data.error);
        setIsLoggedIn(false);
        setMessage(data.error);
        //console.log(isLoggenIn)
      } else {
        console.log(data.message);
        setIsLoggedIn(true);
        //console.log(isLoggedIn)
        //changeId(data.id)
        // console.log("user_id:", userId); //undefined
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { isLoggedIn, setIsLoggedIn, message, setMessage };
};
