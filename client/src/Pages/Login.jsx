import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
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
        navigate("/private");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="">{message}</h3>}
      {errorMessage && <h3 className="">{errorMessage}</h3>}

      <Form method="post" className="login-form" replace>
        <input
          name="email"
          type="email"
          placeholder="Email address"
          className="input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
        />
        <button
          disabled={navigation.state === "submitting"}
          id="login-submit-button"
        >
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
