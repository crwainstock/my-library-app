import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { DataProvider } from "./Context/DataProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultQueryOptions: {
    // Set default options for all queries
    staleTime: 30000, // Data will be considered stale after 30 seconds
    refetchOnMount: true, // Don't automatically refetch data when the component mounts
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <React.StrictMode>
        <App />
        <ReactQueryDevtools initialIsOpen />
      </React.StrictMode>
    </DataProvider>
  </QueryClientProvider>
);
