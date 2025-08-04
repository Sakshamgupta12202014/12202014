// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/userSlice.js";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
  const [message, setMessage] = useState("");
  const [btnTxt, setBtnTxt] = useState("");
  const [service, setService] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await axios
        .get(`${baseURL}/api/user/fetchCurrentUser`, { withCredentials: true })
        .then((response) => {
          if (response.data.authenticated === false) {
            console.log("User not authorised");
            setShowSignup(true);
            setService(false);
            setBtnTxt("Login");
          } else {
            setMessage(response.data.user);
            setService(true);
            setShowSignup(false);
            setBtnTxt("Logout");
            dispatch(
              login({ user: response.data.user, urls: response.data.urls })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchCurrentUser();
  }, [btnTxt]);

  const handleBtnClick = async (e) => {
    const btn = e.target.innerText;

    if (btn === "Login") {
      navigate("/login");
    } else {
      try {
        const response = await axios.get(`${baseURL}/api/user/logout`, {
          withCredentials: true,
        });

        if (response.data.msg) {
          toast.info(response.data.msg);
          setMessage("You are not logged in ");
          dispatch(logout());
          setBtnTxt("Login");
        }
      } catch (error) {
        toast.error("Logout API Error..");
      }
    }
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <h2>Home Page</h2>
        <p>{message}</p>
        {service && (
          <Link to="/urlshortener">
            <button>Short your URL</button>
          </Link>
        )}
        {btnTxt && <button onClick={handleBtnClick}>{btnTxt}</button>}
        {showSignup && (
          <Link to="/signup">
            <button>Register</button>
          </Link>
        )}
      </div>
    </div>
  );
}
