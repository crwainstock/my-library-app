import React from "react";
import { useDataContext } from "../Hooks/useDataContext";
import Loading from "../Components/Loading/Loading";
import NavBar from "../Components/NavBar/NavBar";
import Search from "../Components/Search/Search";
import "./home.css";

function Home() {
  //This is needed so it knows whether the data is loading or not.
  const { books, loading } = useDataContext();
  // console.log(books);
  return (
    <div className="App">
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}
      <div className="home-container">
        <div className="home-info">
          <h1>My Library</h1>
          <p>Explore and collect your favorite children's books.</p>
        </div>
        <Search />
      </div>
    </div>
  );
}

export default Home;
