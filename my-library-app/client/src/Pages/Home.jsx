import React from "react";
import { useDataContext } from "../Hooks/useDataContext";
import Loading from "../Components/Loading/Loading";
import MyLibrary from "../Pages/MyLibrary";

function Home() {
  // This is only needed if the book data will be accessed directly in this page. Currently,
  // it's being rendered through the MyLibrary page, so the useDataContext isn't needed here.
  // const { books, loading } = useDataContext();
  // console.log(books);
  return (
    <div className="App">
      <h1>My Library App</h1>
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}
      {/* <Search /> */}
      <MyLibrary />
    </div>
  );
}

export default Home;
