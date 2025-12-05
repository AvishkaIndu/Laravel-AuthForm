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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .register-container {
          min-height: 100vh;
          width: 100vw;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .register-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a"><stop offset="0%25" stop-color="%23ffffff" stop-opacity="0.15"/><stop offset="100%25" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="150" cy="150" r="120" fill="url(%23a)"/><circle cx="850" cy="250" r="180" fill="url(%23a)"/><circle cx="300" cy="800" r="140" fill="url(%23a)"/><circle cx="750" cy="750" r="100" fill="url(%23a)"/><circle cx="500" cy="400" r="200" fill="url(%23a)"/></svg>') no-repeat center center;
          background-size: cover;
          filter: blur(100px);
          opacity: 0.9;
        }
        
        .register-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border-radius: 28px;
          padding: 3.5rem 3rem;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25), 
                      0 0 0 1px rgba(255, 255, 255, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3);
          width: 100%;
          max-width: 500px;
          animation: zoomIn 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          position: relative;
          z-index: 10;
        }
        
        .register-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
          border-radius: 28px;
          pointer-events: none;
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
          margin-bottom: 3rem;
          color: #ffffff;
          font-weight: 800;
          font-size: 2.6rem;
          animation: slideDown 0.8s ease-out 0.2s both;
          text-shadow: 0 4px 25px rgba(0, 0, 0, 0.4);
          letter-spacing: -0.02em;
          position: relative;
        }
        
        .register-title::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.5));
          border-radius: 2px;
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
          padding: 18px 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          font-size: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          box-sizing: border-box;
          color: #ffffff;
          font-weight: 500;
        }
        
        .form-input:focus {
          outline: none;
          border-color: rgba(102, 126, 234, 0.6);
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15),
                      0 0 0 1px rgba(102, 126, 234, 0.25);
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.12);
        }
        
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.65);
          opacity: 1;
        }
        
        .form-label {
          display: block;
          margin-bottom: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          font-size: 15px;
          letter-spacing: 0.02em;
        }
        
        .register-btn {
          width: 100%;
          padding: 20px;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(20px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 16px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideUp 0.8s ease-out 0.6s both;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.05em;
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
        
        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 25px 50px rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        .register-btn:active {
          transform: translateY(0);
          box-shadow: 0 15px 30px rgba(255, 255, 255, 0.15);
        }
          left: 100%;
        }
        
        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 25px 50px rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        .register-btn:active {
          transform: translateY(0);
          box-shadow: 0 15px 30px rgba(255, 255, 255, 0.15);
        }
        
        .register-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .alert {
          padding: 16px 20px;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          animation: bounceIn 0.4s ease-out;
          font-size: 15px;
          backdrop-filter: blur(10px);
          font-weight: 500;
        }
        
        .alert-error {
          background: rgba(255, 107, 107, 0.15);
          color: #ffffff;
          border: 1px solid rgba(255, 107, 107, 0.3);
        }
        
        .alert-success {
          background: rgba(81, 207, 102, 0.15);
          color: #ffffff;
          border: 1px solid rgba(81, 207, 102, 0.3);
        }
        
        .login-link {
          text-align: center;
          margin-top: 2.5rem;
          animation: fadeIn 0.8s ease-out 0.8s both;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
        }
        
        .login-link a {
          color: #ffffff;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        }
        
        .login-link a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -3px;
          left: 50%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: all 0.3s ease;
        }
        
        .login-link a:hover::after {
          width: 100%;
          left: 0;
        }
        
        .login-link a:hover {
          color: #764ba2;
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