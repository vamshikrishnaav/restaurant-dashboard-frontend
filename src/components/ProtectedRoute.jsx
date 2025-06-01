import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // check for user presence
  try {
    const token = localStorage.getItem("token");
    const data = jwtDecode(token);

    return data.role === "admin" ? children : <Navigate to="/login" />;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
