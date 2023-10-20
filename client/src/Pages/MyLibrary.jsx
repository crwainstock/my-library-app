import React from "react";
import { Navigate } from "react-router-dom";
import Login from "./Login";
import { useGetUserLibrary } from "../Hooks/useGetUserLibrary";
import MyLibraryComponent from "../Components/MyLibrary/MyLibraryComponent";
import Loading from "../Components/Loading/Loading";
import { useGetLoginStatus } from "../Hooks/useGetLoginStatus";
import "../Components/MyLibrary/MyLibrary.css";

function MyLibrary() {
  const { isLoggedIn } = useGetLoginStatus();
  // console.log(isLoggedIn);
  const { loading } = useGetUserLibrary();

  return (
    <div className="mylibrary-container">
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}
      {isLoggedIn == false ? (
        <div className="need-to-login">
          <Login />
        </div>
      ) : (
        <MyLibraryComponent />
      )}
    </div>
  );
}

export default MyLibrary;
