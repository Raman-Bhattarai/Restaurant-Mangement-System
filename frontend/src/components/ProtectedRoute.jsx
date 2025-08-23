import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Example: check if token exists in localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedRoute;
