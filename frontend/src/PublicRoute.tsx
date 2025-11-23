import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("access");
  if (token) {
    return <Navigate to="/courses" />;
  }
  return <>{children}</>;
};

export default PublicRoute;
