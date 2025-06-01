import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import "./Auth.css";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate(); // ✅ initialize navigate

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);

    // ✅ Simulate registration success and redirect
    navigate("/login"); // Navigate to login page after registration
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
        <p className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegistrationPage;
