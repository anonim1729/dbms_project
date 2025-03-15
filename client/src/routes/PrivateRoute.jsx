import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);
  
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.account_type)) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

export default PrivateRoute;