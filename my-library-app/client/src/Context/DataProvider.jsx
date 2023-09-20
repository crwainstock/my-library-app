import { createContext } from "react";
import useGetLandingData from "../hooks/useGetLandingData";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const { data, loading, error } = useGetLandingData();

  const value = { data, loading, error };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// Created this data provider to share context data with components in the App.
