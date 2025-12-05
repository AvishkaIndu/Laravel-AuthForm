import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 12,
    completedTasks: 34,
    activeUsers: 8,
    revenue: 24500
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        axios
          .get("http://127.0.0.1:8000/api/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log("Dashboard data:", response.data);
            setLoading(false);
          })
          .catch((error) => {
            setError("Failed to fetch dashboard data.");
            setLoading(false);
            console.error(error);
          });
      } catch (parseError) {
        console.error("Error parsing user data:", parseError);
        handleLogout();
      }
    } else {
      console.log("No valid user data or token found, redirecting to login");
      handleLogout();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Arial', sans-serif;
        }
        
        .dashboard-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1.5rem 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: slideDown 0.6s ease-out;
        }
        
        .dashboard-title {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .user-avatar {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
          animation: bounce 0.8s ease-out 0.2s both;
        }
        
        .user-details h3 {
          margin: 0;
          color: #333;
          font-size: 1.1rem;
        }
        
        .user-details p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }
        
        .logout-btn {
          background: linear-gradient(135deg, #f093fb, #f5576c);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(240, 147, 251, 0.3);
        }
        
        .dashboard-content {
          padding: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: all 0.3s ease;
          animation: scaleIn 0.6s ease-out;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .stat-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        
        .stat-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .stat-card:nth-child(3) {
          animation-delay: 0.3s;
        }
        
        .stat-card:nth-child(4) {
          animation-delay: 0.4s;
        }
        
        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }
        
        .stat-icon.projects {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }
        
        .stat-icon.tasks {
          background: linear-gradient(135deg, #f093fb, #f5576c);
        }
        
        .stat-icon.users {
          background: linear-gradient(135deg, #4facfe, #00f2fe);
        }
        
        .stat-icon.revenue {
          background: linear-gradient(135deg, #43e97b, #38f9d7);
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: #666;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }
        
        .dashboard-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: slideUp 0.6s ease-out;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .recent-activity {
          list-style: none;
          padding: 0;
        }
        
        .activity-item {
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #f8f9ff, #f0f0ff);
          border-left: 4px solid #667eea;
          transition: all 0.3s ease;
          animation: slideRight 0.6s ease-out;
        }
        
        .activity-item:nth-child(1) { animation-delay: 0.1s; }
        .activity-item:nth-child(2) { animation-delay: 0.2s; }
        .activity-item:nth-child(3) { animation-delay: 0.3s; }
        
        .activity-item:hover {
          transform: translateX(10px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
        }
        
        .activity-text {
          color: #333;
          font-weight: 500;
        }
        
        .activity-time {
          color: #666;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
        
        .quick-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .action-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          flex: 1;
          min-width: 120px;
        }
        
        .action-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }
        
        .action-btn.secondary {
          background: linear-gradient(135deg, #f093fb, #f5576c);
        }
        
        .action-btn.secondary:hover {
          box-shadow: 0 15px 30px rgba(240, 147, 251, 0.4);
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.3);
          border-top: 5px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        .floating-bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        
        .bg-element {
          position: absolute;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          animation: floatBackground 12s ease-in-out infinite;
        }
        
        .bg-element1 {
          width: 200px;
          height: 200px;
          top: 10%;
          left: 80%;
          animation-delay: 0s;
        }
        
        .bg-element2 {
          width: 150px;
          height: 150px;
          top: 60%;
          left: 10%;
          animation-delay: 4s;
        }
        
        .bg-element3 {
          width: 100px;
          height: 100px;
          top: 80%;
          left: 70%;
          animation-delay: 8s;
        }
        
        @keyframes floatBackground {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-30px) translateX(-20px);
          }
          66% {
            transform: translateY(30px) translateX(20px);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -5px, 0);
          }
          70% {
            transform: translate3d(0, -3px, 0);
          }
          90% {
            transform: translate3d(0, -1px, 0);
          }
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      
      <div className="dashboard-container">
        <div className="floating-bg-elements">
          <div className="bg-element bg-element1"></div>
          <div className="bg-element bg-element2"></div>
          <div className="bg-element bg-element3"></div>
        </div>
        
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-details">
              <h3>{user?.name || 'User'}</h3>
              <p>{user?.email || 'user@example.com'}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        
        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon projects">📊</div>
              <div className="stat-number">{stats.totalProjects}</div>
              <div className="stat-label">Total Projects</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon tasks">✅</div>
              <div className="stat-number">{stats.completedTasks}</div>
              <div className="stat-label">Completed Tasks</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon users">👥</div>
              <div className="stat-number">{stats.activeUsers}</div>
              <div className="stat-label">Active Users</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon revenue">💰</div>
              <div className="stat-number">${stats.revenue.toLocaleString()}</div>
              <div className="stat-label">Revenue</div>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h2 className="card-title">Recent Activity</h2>
            <ul className="recent-activity">
              <li className="activity-item">
                <div className="activity-text">New user registered: john@example.com</div>
                <div className="activity-time">2 minutes ago</div>
              </li>
              <li className="activity-item">
                <div className="activity-text">Project "Website Redesign" completed</div>
                <div className="activity-time">1 hour ago</div>
              </li>
              <li className="activity-item">
                <div className="activity-text">Payment received: $2,500</div>
                <div className="activity-time">3 hours ago</div>
              </li>
            </ul>
          </div>
          
          <div className="dashboard-card">
            <h2 className="card-title">Quick Actions</h2>
            <div className="quick-actions">
              <button className="action-btn">New Project</button>
              <button className="action-btn secondary">Add User</button>
              <button className="action-btn">View Reports</button>
            </div>
          </div>
        </div>
        
        {error && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'linear-gradient(135deg, #fee, #fdd)',
            color: '#c33',
            padding: '15px 20px',
            borderRadius: '10px',
            border: '2px solid #fcc',
            animation: 'slideDown 0.3s ease-out',
            zIndex: 1000
          }}>
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;