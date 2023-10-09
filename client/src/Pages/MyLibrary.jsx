import React from "react";
import { Redirect } from "react-router-dom";
import { useGetUserLibrary } from "../Hooks/useGetUserLibrary";
import MyLibraryComponent from "../Components/MyLibrary/MyLibraryComponent";
import Loading from "../Components/Loading/Loading";
import { useGetLoginStatus } from "../Hooks/useGetLoginStatus";

function MyLibrary() {
  const { isLoggedIn } = useGetLoginStatus();
  const { loading } = useGetUserLibrary();
  const { navigate } = useNavigate();

  return (
    <div>
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}
      {!isLoggedIn && <Redirect to="/login" />}
      <MyLibraryComponent />
    </div>
  );
}

export default MyLibrary;
