import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
      });

      console.log("Response:", response.data);
      setSuccess("Registration successful! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        console.error("Error response:", err.response);
        if (err.response.data.errors) {
          setError(err.response.data.errors.email || "Registration failed. Please try again.");
        } else {
          setError(err.response.data.message || "Registration failed");
        }
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <>
      <style>{`
        .register-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Arial', sans-serif;
          padding: 20px;
        }
        
        .register-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          border-radius: 25px;
          padding: 2.5rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 450px;
          animation: zoomIn 0.7s ease-out;
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .register-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #f093fb, #f5576c, #4facfe);
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .register-title {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
          font-weight: 700;
          font-size: 2.4rem;
          animation: slideDown 0.8s ease-out 0.2s both;
          background: linear-gradient(135deg, #f093fb, #f5576c, #4facfe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          animation: slideRight 0.8s ease-out 0.4s both;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
          animation: slideLeft 0.8s ease-out 0.4s both;
          flex: 1;
        }
        
        .form-input {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #e1e5e9;
          border-radius: 15px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
          box-sizing: border-box;
          position: relative;
          color: #333;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #f093fb;
          box-shadow: 0 0 0 4px rgba(240, 147, 251, 0.15);
          transform: translateY(-2px);
          background: white;
          color: #333;
        }
        
        .form-input::placeholder {
          color: #999;
          opacity: 1;
        }
        
        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #555;
          font-size: 14px;
          transition: color 0.3s ease;
        }
        
        .register-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%);
          color: white;
          border: none;
          border-radius: 15px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: slideUp 0.8s ease-out 0.6s both;
          position: relative;
          overflow: hidden;
        }
        
        .register-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .register-btn:hover::before {
          left: 100%;
        }
        
        .register-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(240, 147, 251, 0.4);
        }
        
        .register-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .alert {
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          animation: bounceIn 0.4s ease-out;
          font-size: 14px;
          font-weight: 500;
        }
        
        .alert-error {
          background: linear-gradient(135deg, #fee, #fdd);
          color: #c33;
          border: 2px solid #fcc;
        }
        
        .alert-success {
          background: linear-gradient(135deg, #efe, #dfd);
          color: #363;
          border: 2px solid #cfc;
        }
        
        .login-link {
          text-align: center;
          margin-top: 2rem;
          animation: fadeIn 0.8s ease-out 0.8s both;
          padding-top: 1.5rem;
          border-top: 2px solid #f0f0f0;
        }
        
        .login-link a {
          color: #f093fb;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
        }
        
        .login-link a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -3px;
          left: 50%;
          background: linear-gradient(90deg, #f093fb, #f5576c);
          transition: all 0.3s ease;
        }
        
        .login-link a:hover::after {
          width: 100%;
          left: 0;
        }
        
        .login-link a:hover {
          color: #f5576c;
          transform: translateY(-1px);
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes bounceIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .floating-element {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: floatAround 8s ease-in-out infinite;
        }
        
        .element1 {
          width: 60px;
          height: 60px;
          top: 10%;
          left: 15%;
          animation-delay: 0s;
        }
        
        .element2 {
          width: 40px;
          height: 40px;
          top: 70%;
          right: 20%;
          animation-delay: 2s;
        }
        
        .element3 {
          width: 80px;
          height: 80px;
          bottom: 15%;
          left: 10%;
          animation-delay: 4s;
        }
        
        .element4 {
          width: 30px;
          height: 30px;
          top: 30%;
          right: 15%;
          animation-delay: 6s;
        }
        
        @keyframes floatAround {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) translateX(10px) rotate(120deg);
          }
          66% {
            transform: translateY(15px) translateX(-10px) rotate(240deg);
          }
        }
      `}</style>
      
      <div className="register-container">
        <div className="floating-elements">
          <div className="floating-element element1"></div>
          <div className="floating-element element2"></div>
          <div className="floating-element element3"></div>
          <div className="floating-element element4"></div>
        </div>
        
        <div className="register-card">
          <h1 className="register-title">Create Account</h1>
          
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}
          
          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-input"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-input"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create password"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-input"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm password"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading && <div className="loading-spinner"></div>}
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          
          <div className="login-link">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;