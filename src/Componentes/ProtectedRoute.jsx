import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  const rol = localStorage.getItem("rol");
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere admin y el usuario no es admin, redirige
  if (adminOnly && rol !== "ADMIN") {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;