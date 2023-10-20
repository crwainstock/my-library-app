import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserLibrary } from "./useGetUserLibrary";

const useGetUpdateReview = () => {
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // updateReview(review); // NEEDS TO BE UDPATED WITH AUTH VERSION OF FUNCTION
    setReview("");
    // console.log(review); // Ok, setting review works.
  };
};
