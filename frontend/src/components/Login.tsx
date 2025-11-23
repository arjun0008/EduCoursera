import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api";

interface LoginFormData {
  username_or_email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to previous page or /courses by default
  const from = (location.state as any)?.from?.pathname || "/courses";

  const [formData, setFormData] = useState<LoginFormData>({ username_or_email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post<LoginResponse>("accounts/login/", formData, { headers: { "Content-Type": "application/json" } });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // Navigate to previous page or /courses
      navigate(from, { replace: true });
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#148FA2',
          marginBottom: '20px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '500',
        }}
      >
        Login
      </h2>

      <input
        name="username_or_email"
        placeholder="Username or Email"
        onChange={handleChange}
        required
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '16px',
          fontFamily: 'Roboto, sans-serif',
        }}
      />
      
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '16px',
          fontFamily: 'Roboto, sans-serif',
        }}
      />
      
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#148FA2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontFamily: 'Roboto, sans-serif',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Login
      </button>

      <p
        style={{
          marginTop: '10px',
          textAlign: 'center',
          fontSize: '14px',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#148FA2', textDecoration: 'none' }}>
          Register here
        </Link>
      </p>
    </form>
  );
};

export default Login;
