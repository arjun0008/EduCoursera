import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Courses from "../components/Courses";
import CourseDetail from "../components/CourseDetail";
import Cart from "../components/Cart";
import PurchasedCourses from "../components/PurchasedCourses";
import ProtectedRoute from "../ProtectedRoute";
import PublicRoute from "../PublicRoute";
import Profile from "../components/Profile";
import Cancel from "../components/webhook/cancel";
import Success from "../components/webhook/success";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:pk" element={<CourseDetail />} />

      {/* Protected Routes */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/purchased" element={<ProtectedRoute><PurchasedCourses /></ProtectedRoute>} />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/courses" />} />

      {/* webhook */}

      <Route path="/payment/success" element={ <ProtectedRoute><Success/></ProtectedRoute> } />
      <Route path="/payment/cancel" element={ <ProtectedRoute><Cancel/></ProtectedRoute> } />
    </Routes>
  );
};

export default AppRoutes;
