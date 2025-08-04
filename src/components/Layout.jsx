import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import "../styles/Layout.css"

function Layout() {
  return (
    <div>
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
