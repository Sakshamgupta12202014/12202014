// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";
import { toast } from "react-toastify";

export default function Home() {
  const [message, setMessage] = useState("");
  const [btnTxt, setBtnTxt] = useState("");
  const [service, setService] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await axios
        .get("/api/user/fetchCurrentUser", { withCredentials: true })
        .then((response) => {
          if (response.data.authenticated === false) {
            console.log("User not authorised");
            setService(false);
            setBtnTxt("Login");
          } else {
            setMessage(response.data.user);
            setService(true);
            setBtnTxt("Logout");
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
        const response = await axios.get("/api/user/logout", {
          withCredentials: true,
        });

        if (response.data.msg) {
          toast.info(response.data.msg);
          setMessage("You are not logged in ");
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
      </div>
    </div>
  );
}
