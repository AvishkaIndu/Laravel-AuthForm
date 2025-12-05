import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .home-container {
          min-height: 100vh;
          width: 100vw;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .home-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a"><stop offset="0%25" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%25" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="150" fill="url(%23a)"/><circle cx="800" cy="300" r="200" fill="url(%23a)"/><circle cx="400" cy="700" r="180" fill="url(%23a)"/><circle cx="700" cy="800" r="120" fill="url(%23a)"/></svg>') no-repeat center center;
          background-size: cover;
          filter: blur(100px);
          opacity: 0.8;
        }
        
        .home-content {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border-radius: 32px;
          padding: 4rem 3rem;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25), 
                      0 0 0 1px rgba(255, 255, 255, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3);
          text-align: center;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255, 255, 255, 0.18);
          position: relative;
          z-index: 10;
          max-width: 600px;
          width: 90%;
        }
        
        .home-title {
          color: #ffffff;
          font-weight: 800;
          font-size: 3.2rem;
          margin-bottom: 1.5rem;
          text-shadow: 0 4px 25px rgba(0, 0, 0, 0.4);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        
        .home-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.2rem;
          margin-bottom: 3rem;
          font-weight: 400;
          text-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.01em;
        }
        
        .button-container {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .nav-button {
          padding: 16px 32px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          min-width: 140px;
        }
        
        .nav-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 25px 50px rgba(102, 126, 234, 0.25);
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
          color: white;
          text-decoration: none;
        }
        
        .nav-button:active {
          transform: translateY(0);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.15);
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
        
        @media (max-width: 768px) {
          .home-title {
            font-size: 2.5rem;
          }
          
          .home-subtitle {
            font-size: 1rem;
          }
          
          .button-container {
            flex-direction: column;
            align-items: center;
          }
          
          .nav-button {
            width: 100%;
            max-width: 250px;
          }
        }
      `}</style>
      
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">Laravel React Authentication</h1>
          <p className="home-subtitle">
            Secure, modern authentication system built with Laravel 11 and React
          </p>
          
          <div className="button-container">
            <button
              className="nav-button"
              onClick={() => navigateTo('/login')}
            >
              Sign In
            </button>
            <button
              className="nav-button"
              onClick={() => navigateTo('/register')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

