import React from "react";
import { useDataContext } from "../Hooks/useDataContext";
import Loading from "../Components/Loading/Loading";

function Home() {
  const { books, loading } = useDataContext();
  console.log(books); //returning empty array
  return (
    <div className="App">
      <h1>My Library App</h1>
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}
      <Search />
      <MyLibrary />
    </div>
  );
}

export default Home;
