import { useState } from "react";
import { useDataContext } from "./useDataContext";

export const useGetDeleteBook = () => {
  const { userId } = useDataContext();
};
