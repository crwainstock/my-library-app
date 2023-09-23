import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="site-wrapper">
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
