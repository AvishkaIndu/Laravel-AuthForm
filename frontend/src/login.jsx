import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      console.log("Response:", response.data);
      if (response.data.token && response.data.user) {
        setSuccess("Login successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      } else {
        setError("Invalid login response. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.error || "Login failed. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
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
        
        .login-container {
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
        
        .login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a"><stop offset="0%25" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%25" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="120" fill="url(%23a)"/><circle cx="700" cy="800" r="80" fill="url(%23a)"/></svg>') no-repeat center center;
          background-size: cover;
          filter: blur(80px);
          opacity: 0.8;
        }
        
        .login-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.2), 
                      0 0 0 1px rgba(255, 255, 255, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3);
          width: 100%;
          max-width: 450px;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255, 255, 255, 0.18);
          position: relative;
          z-index: 10;
        }
        
        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          border-radius: 24px;
          pointer-events: none;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .login-title {
          text-align: center;
          margin-bottom: 3rem;
          color: #ffffff;
          font-weight: 800;
          font-size: 2.5rem;
          animation: fadeIn 0.8s ease-out 0.2s both;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.02em;
          position: relative;
        }
        
        .login-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.6));
          border-radius: 2px;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
          animation: fadeIn 0.8s ease-out 0.4s both;
        }
        
        .form-input {
          width: 100%;
          padding: 18px 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          font-size: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          box-sizing: border-box;
          color: #ffffff;
          font-weight: 500;
        }
        
        .form-input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1),
                      0 0 0 1px rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.15);
        }
        
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
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
        
        .login-btn {
          width: 100%;
          padding: 20px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeIn 0.8s ease-out 0.6s both;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .login-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .login-btn:hover::before {
          left: 100%;
        }
        
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        .login-btn:active {
          transform: translateY(0);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }
        
        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .alert {
          padding: 16px 20px;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          animation: slideDown 0.3s ease-out;
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
        
        .register-link {
          text-align: center;
          margin-top: 2.5rem;
          animation: fadeIn 0.8s ease-out 0.8s both;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
        }
        
        .register-link a {
          color: #ffffff;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s ease;
          position: relative;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .register-link a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 50%;
          background: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }
        
        .register-link a:hover::after {
          width: 100%;
          left: 0;
        }
        
        .register-link a:hover {
          text-shadow: 0 4px 15px rgba(255, 255, 255, 0.5);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        
        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        
        .shape1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .shape2 {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }
        
        .shape3 {
          width: 60px;
          height: 60px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
      
      <div className="login-container">
        <div className="floating-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
        </div>
        
        <div className="login-card">
          <h1 className="login-title">Welcome Back</h1>
          
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
                placeholder="Enter your password"
              />
            </div>
            
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading && <div className="loading-spinner"></div>}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          
          <div className="register-link">
            Don't have an account? <Link to="/register">Sign up here</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;