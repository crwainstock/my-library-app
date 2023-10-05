import { useEffect, useState } from "react";

export const useGetLoginStatus = () => {
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

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
      const result = await fetch("/users/mylibrary", options);
      const data = await result.json();
      setUserId(data.id);
      console.log(userId);
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
        console.log("user_id:", data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { isLoggedIn, setIsLoggedIn, message, setMessage, userId };
};
