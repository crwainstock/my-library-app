import React from "react";
import { Navigate } from "react-router-dom";
import Login from "./Login";
// import { useGetUserLibrary } from "../Hooks/useGetUserLibrary";
import MyLibraryComponent from "../Components/MyLibrary/MyLibraryComponent";
import Loading from "../Components/Loading/Loading";
import { useGetLoginStatus } from "../Hooks/useGetLoginStatus";
import { useGetUserLibraryQuery } from "../Hooks/useGetUserLibraryQuery";
import "../Components/MyLibrary/MyLibrary.css";
// import { useDataContext } from "../Hooks/useDataContext";

function MyLibrary() {
  const { isLoggedIn } = useGetLoginStatus();
  const { loading } = useGetUserLibraryQuery();

  return (
    <div className="mylibrary-container">
      {loading ? (
        <div className="loading">
          <Loading />
        </div>
      ) : isLoggedIn ? (
        <MyLibraryComponent />
      ) : (
        <div className="need-to-login">
          <Login />
        </div>
      )}
    </div>
  );
}

export default MyLibrary;
