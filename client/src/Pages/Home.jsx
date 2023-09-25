import React from "react";
import { useDataContext } from "../Hooks/useDataContext";
import Loading from "../Components/Loading/Loading";
import NavBar from "../Components/NavBar/NavBar";
import Search from "../Components/Search/Search";

function Home() {
  //This is needed so it knows whether the data is loading or not.
  const { books, loading } = useDataContext();
  // console.log(books);
  return (
    <div className="App">
      <NavBar />
      <h1>My Library App</h1>
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}
      <Search />
      {/* <MyLibrary /> */}
    </div>
  );
}

export default Home;
