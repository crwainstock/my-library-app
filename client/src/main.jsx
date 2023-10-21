import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { DataProvider } from "./Context/DataProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </DataProvider>
  </QueryClientProvider>
);
