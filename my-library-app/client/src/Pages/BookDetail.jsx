import React from "react";
import { useDataContext, useParams } from "../Hooks/useDataContext";
import { Link } from "react-router-dom";

function BookDetail() {
  const { books, loading } = useDataContext();

  const params = useParams(); //A part of react-router
  const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  // this bookId is also used in the URL for this page

  return (
    <div className="book-detail-container">
      <h2>This is where book details will go</h2>
    </div>
  );
}

export default BookDetail;
