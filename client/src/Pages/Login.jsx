import React from "react";
import { useGetUserData } from "../Hooks/useGetUserData";
import { useGetLoginStatus } from "../Hooks/useGetLoginStatus";
import "./login.css";

function Login() {
  const {
    credentials,
    setCredentials,
    error,
    setError,
    login,
    handleChange,
    navigate,
  } = useGetUserData();
  const { isLoggedIn } = useGetLoginStatus();

  return (
    <div>
      {isLoggedIn == true ? <h2>You are already logged in.</h2> : <div></div>}
      <div className="login-input-container">
        <input
          value={credentials.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="input"
          id="input-1"
        />
        <input
          value={credentials.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="input"
          id="input-2"
        />
        <button id="login-submit-button" onClick={login}>
          Log in
        </button>
      </div>
      {error.message}
    </div>
  );
}

export default Login;
