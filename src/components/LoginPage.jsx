import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";

const LoginPage = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ must be here

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Login Data:", formData);
    // localStorage.setItem("user", JSON.stringify(formData)); // simulate login

    const userloggedIn = await axios.post(
      "http://localhost:3000/api/v1/user/sign-in",
      { number, password },
      { withCredentials: true }
    );

    console.log(document.cookie);
    navigate("/dashboard"); // ✅ use navigate function properly
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="tel"
          name="number"
          placeholder="Phone Number"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
