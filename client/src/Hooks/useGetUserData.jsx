import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useGetUserData = () => {
  //   const params = useParams(); //A part of react-router
  //   const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  //   // this bookId is also used in the URL for this page

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      };
      const result = await fetch("/users/login", options);

      const data = await result.json();
      if (!result.ok) {
        console.error(
          `Error in request to ${url}: ${result.status} - ${result.statusText}`
        );
        const data = await result.json();
        setError(data.error);
      } else {
        localStorage.setItem("token", data.token);
        console.log(localStorage.token);
        // navigate("/mylibrary");
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
      setError("An error occurred during the request.");
    }
  };

  const getUserLibrary = async () => {
    try {
      let options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      };
      const result = await fetch("/users/userlibrary/:id", options);

      const data = await result.json();
      if (!result.ok) {
        console.error(
          `Error in request to ${url}: ${result.status} - ${result.statusText}`
        );
        const data = await result.json();
        setError(data.error);
      } else {
        localStorage.setItem("token", data.token);
        console.log(localStorage.token);
        // navigate("/mylibrary");
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
      setError("An error occurred during the request.");
    }
  };

  return {
    credentials,
    setCredentials,
    error,
    setError,
    login,
    handleChange,
    navigate,
  };
};
