// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/login", {
        email: email,
        password: password,
      });
      if (response.data.authenticated) {
        console.log("You are successfully logged in");
        toast.success("logged in successfully..");
        navigate("/urlshortener");
      } else {
        console.log("Login Error: ");
        // setError(response.data.error || "Login failed. Please try again.");
        toast.error("Invalid credentials...");
        navigate("/login");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        "API Error: " +
          (error.response?.data?.error || "Login failed. Please try again.")
      );
      navigate("/login");
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
        {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
      </form>
    </div>
  );
}
