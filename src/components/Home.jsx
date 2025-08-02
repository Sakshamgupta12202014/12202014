// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

export default function Home() {
  const [message, setMessage] = useState("");
  const [btnTxt, setBtnTxt] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUrls = async () => {
      await axios
        .get("/api/urls")
        .then((response) => {
          if (response.data.authenticated === false) {
            console.log("User not authorised");
            setMessage("You are not logged in");
            setBtnTxt("Login");
          } else {
            setMessage(response.data.email);
            setBtnTxt("Logout");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getAllUrls();
  }, []);

  const handleBtnClick = async (e) => {
    const btn = e.target.innerText;

    if (btn === "Login") {
      navigate("/login");
    } else if (btn === "Logout") {
      try {
        const response = await axios.get("/api/user/logout", {
          withCredentials: true,
        });

        if (response.data.logout) {
          console.log("Successfully logged out");
          navigate("/login");
        } else {
          console.log("Cannot login");
        }
      } catch (error) {
        console.log("Logout API Error");
      }
    }
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <h2>Home Page</h2>
        <p>{message}</p>
        {btnTxt && <button onClick={handleBtnClick}>{btnTxt}</button>}
      </div>
    </div>
  );
}
