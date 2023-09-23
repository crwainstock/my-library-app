import React from "react";
// import { useDataContext } from "../Hooks/useDataContext";
// import { Link, useParams } from "react-router-dom";
import { useGetBookDetails } from "../Hooks/useGetBookDetails";

function BookDetail() {
  const { book, loading } = useGetBookDetails();
  console.log(book);
  //   const params = useParams(); //A part of react-router
  //   console.log(params);
  //   const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  //   // this bookId is also used in the URL for this page

  return (
    <div className="book-detail-container">
      <h2>This is where book details will go</h2>
    </div>
  );
}

export default BookDetail;
