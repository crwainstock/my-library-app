import React from "react";
import { useDataContext } from "../Hooks/useDataContext";

function Home() {
  const { books, loading } = useDataContext();
  console.log(books); //returning empty array
  return (
    <div className="App">
      <h1>My Library App</h1>
      {loading == true && (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
