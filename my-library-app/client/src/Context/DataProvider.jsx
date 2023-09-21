import { createContext } from "react";
import useGetLibraryData from "../Hooks/useGetLibraryData";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const { data, loading, error } = useGetLibraryData();

  const value = { data, loading, error };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
