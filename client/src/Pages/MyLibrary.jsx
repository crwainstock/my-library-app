import React from "react";

import MyLibraryComponent from "../Components/MyLibrary/MyLibraryComponent";
import Loading from "../Components/Loading/Loading";
import { useGetLoginStatus } from "../Hooks/useGetLoginStatus";

function MyLibrary() {
  const { isLoggedIn } = useGetLoginStatus();
  const { loading } = useGetUserLibrary();

  return (
    <div>
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}
      <MyLibraryComponent />
    </div>
  );
}

export default MyLibrary;
