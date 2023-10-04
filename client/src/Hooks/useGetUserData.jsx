import { useEffect, useState } from "react";
import { useNavigate, Form } from "react-router-dom";

export const useGetUserData = () => {
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
      if (!result.ok) setError(data.error);
      else {
        //store token locally
        localStorage.setItem("token", data.token);
        //redirect to private page
        navigate("/mylibrary");
      }
    } catch (error) {
      setError(error);
    }
  };
};
