// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthForm.css";

import { toast } from "react-toastify";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/signup", form);
      if (response.data.authenticated) {
        console.log("SignUp successfull");
        toast.success("Registration Successfull");
        navigate("/login");
      } else {
        console.log("SignUp Error: ");
        toast.error("Invalid details");
      }
    } catch (error) {
      console.log("Error: User Sign up");
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
