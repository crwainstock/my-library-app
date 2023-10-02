import React from "react";
import { useDataContext } from "../Hooks/useDataContext";

import NavBar from "../Components/NavBar/NavBar";
import MyLibraryComponent from "../Components/MyLibrary/MyLibraryComponent";
import Loading from "../Components/Loading/Loading";

function MyLibrary() {
  const { loading } = useDataContext();

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
