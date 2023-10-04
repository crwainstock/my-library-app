import React from "react";
import { useGetUserData } from "../Hooks/useGetUserData";

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

  return (
    <div>
      <div>
        <input
          value={credentials.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="input"
        />
        <input
          value={credentials.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="input"
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
