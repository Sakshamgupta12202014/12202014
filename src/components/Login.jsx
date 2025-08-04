// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BACKEND_URL;

import { login } from "../store/userSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseURL}/api/user/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (response.data.authenticated) {
        toast.success(response.data.msg);
        navigate("/");
      } else {
        toast.error(response.data.msg);
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        "API Error: " +
          (error.response?.data?.error || "Login failed. Please try again")
      );
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={loginUser} className="auth-form">
        <h2>Login</h2>
        <input
          placeholder="Email"
          value={email}
          name="email"
          autoComplete="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          value={password}
          name="password"
          autoComplete="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
