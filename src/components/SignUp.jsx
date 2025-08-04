// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthForm.css";

import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BACKEND_URL;


export default function Signup() {
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
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
