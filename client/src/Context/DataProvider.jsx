import { createContext } from "react";
// import useGetLibraryData from "../Hooks/useGetLibraryData";
import useGetLoginStatus from "../Hooks/useGetLoginStatus";
// import useGetUserLibrary from "../Hooks/useGetUserLibrary";
import useGetUserLibraryQuery from "../Hooks/useGetUserLibraryQuery";

export const DataContext = createContext();

export function DataProvider({ children }) {
  // These can be used in the non-auth version of the app
  // const { books, loading, error } = useGetLibraryData();
  // const value = { books, loading, error };

  // Currently, only the userBooks is used from here. The other data is accessed through the hooks
  // directly in each component.
  // const { userBooks } = useGetUserLibrary();
  // const { userBooks, loading } = useGetUserLibraryQuery();
  const { isLoggedIn, userId } = useGetLoginStatus();
  const value = { isLoggedIn, userId };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
