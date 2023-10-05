import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import MyLibrary from "./Pages/MyLibrary";
// , { loader as booksLoader }
import BookDetail from "./Pages/BookDetail";
// , { loader as detailLoader }
import Login from "./Pages/Login"; // action as loginAction, // loader as loginLoader,
import Error from "./Components/Error";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route
        path="login"
        element={<Login />}
        errorElement={<Error />}
        // loader={loginLoader}
        // action={loginAction}
      />
      <Route
        path="mylibrary"
        element={<MyLibrary />}
        errorElement={<Error />}
      />
      <Route
        path="mylibrary/:id"
        element={<BookDetail />}
        errorElement={<Error />}
      />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
