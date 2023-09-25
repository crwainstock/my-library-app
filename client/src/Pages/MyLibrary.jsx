import React from "react";
import { useDataContext } from "../Hooks/useDataContext";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import MyLibraryComponent from "../Components/MyLibrary/MyLibraryComponent";
import "./MyLibrary.css";

function MyLibrary() {
  return (
    <div>
      <NavBar />
      <MyLibraryComponent />
    </div>
  );
}

export default MyLibrary;
