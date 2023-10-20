import React from "react";
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
