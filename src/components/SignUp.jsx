// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthForm.css";

import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BACKEND_URL;

import closedEye from "./closed-eye.png";
import openEye from "./open-eye.png";

export default function Signup() {
  const [eye, setEye] = useState("close");
  const [type, setType] = useState("password");

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/user/signup`, form);
      if (response.data.authenticated) {
        toast.success(response.data.msg);
        navigate("/login");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("API Error: User Sign up");
    }
  };

  const handlePasswordVisibility = (e) => {
    if (eye === "open") {
      setEye("close");
    } else {
      setEye("open");
    }

    setType(type === "password" ? "text" : "password");
    return true;
  };

  return (
    <div className="auth-container">
      <form onSubmit={signupUser} className="auth-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          name="name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          value={form.email}
          placeholder="Email"
          type="email"
          name="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <div className="password-div">
          <input
            placeholder="Password"
            type={type}
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <img
            className="visibility"
            src={eye === "open" ? openEye : closedEye}
            alt={eye === "close" ? "view" : "hide"}
            width="25px"
            height="25px"
            onClick={(e) => handlePasswordVisibility(e)}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
