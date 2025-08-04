import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function Header() {

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const navItems = [
    { name: "Home", path: "/", isAuth: true },
    { name: "Short url", path: "/urlshortener", isAuth: isAuthenticated },
    { name: "Login", path: "/login", isAuth: !isAuthenticated },
    { name: "Sign Up", path: "/signup", isAuth: !isAuthenticated },
  ];

  return (
    <div className="header">
      <nav className="nav">
        <ul className="nav-list">
          {navItems.map((item) => {
            if (item.isAuth === true) {
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
