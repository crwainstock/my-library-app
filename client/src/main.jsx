import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { DataProvider } from "./Context/DataProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  // defaultQueryOptions: {
  //   // Set your default query options here
  //   // For example, you can set default retry behavior, caching options, etc.
  // },
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
