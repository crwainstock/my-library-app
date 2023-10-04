import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
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
