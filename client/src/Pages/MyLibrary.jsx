import React from "react";
import { Navigate } from "react-router-dom";
import { useGetUserLibrary } from "../Hooks/useGetUserLibrary";
import MyLibraryComponent from "../Components/MyLibrary/MyLibraryComponent";
import Loading from "../Components/Loading/Loading";
import { useGetLoginStatus } from "../Hooks/useGetLoginStatus";

function MyLibrary() {
  const { isLoggedIn } = useGetLoginStatus();
  console.log(isLoggedIn);
  const { loading } = useGetUserLibrary();

  return (
    <div>
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}
      {/* This isn't working as planned, so revisit later. Keeps loading the login page even if the user is logged in. */}
      {/* {!isLoggedIn ? <Navigate replace to="/login" /> : <MyLibraryComponent />} */}

      <MyLibraryComponent />
    </div>
  );
}

export default MyLibrary;
