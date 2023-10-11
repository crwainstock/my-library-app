import { createContext } from "react";
import useGetLibraryData from "../Hooks/useGetLibraryData";
import useGetLoginStatus from "../Hooks/useGetLoginStatus";
import useGetUserLibrary from "../Hooks/useGetUserLibrary";

export const DataContext = createContext();

export function DataProvider({ children }) {
  // These can be used in the non-auth version of the app
  // const { books, loading, error } = useGetLibraryData();
  // const value = { books, loading, error };

  const { userBooks } = useGetUserLibrary();
  const { isLoggedIn, userId } = useGetLoginStatus();
  const value = { userBooks, isLoggedIn, userId };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
