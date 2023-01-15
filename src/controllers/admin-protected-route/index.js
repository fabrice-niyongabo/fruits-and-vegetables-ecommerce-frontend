import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { token, role } = useSelector((state) => state.user);
  return token && token.trim() !== "" && role === "admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default AdminProtectedRoute;
