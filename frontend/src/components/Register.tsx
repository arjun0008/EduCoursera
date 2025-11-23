import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";


interface RegisterFormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("accounts/register/", formData, { headers: { "Content-Type": "application/json" } });

      // Auto-login after registration
      const loginRes = await api.post<LoginResponse>(
        "accounts/login/",
        { username_or_email: formData.email, password: formData.password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("access", loginRes.data.access);
      localStorage.setItem("refresh", loginRes.data.refresh);

      // Navigate to /courses after registration
      navigate("/courses", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Registration or login failed");
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
        Register
      </h2>

      <input
        name="username"
        placeholder="Username"
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
        name="email"
        type="email"
        placeholder="Email"
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
        name="first_name"
        placeholder="First Name"
        onChange={handleChange}
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
        name="last_name"
        placeholder="Last Name"
        onChange={handleChange}
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
        name="password"
        type="password"
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
      
      <input
        name="password2"
        type="password"
        placeholder="Confirm Password"
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
        Register & Login
      </button>

      <p
        style={{
          marginTop: '10px',
          textAlign: 'center',
          fontSize: '14px',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#148FA2', textDecoration: 'none' }}>
          Login here
        </Link>
      </p>
    </form>
  );
};

export default Register;
