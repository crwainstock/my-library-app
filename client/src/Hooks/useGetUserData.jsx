// This custom hook has the login function for users to access their personal libraries.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGetUserData = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [userId, setUserId] = useState(null);
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
        setUserId(data.userId);
        console.log(userId);
        console.log(localStorage.token);

        navigate("/mylibrary");
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
    userId,
  };
};
