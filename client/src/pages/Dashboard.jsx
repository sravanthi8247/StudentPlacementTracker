import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { clearAuthData, getStoredUser } from '../services/authService';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const user = getStoredUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="container dashboard__header-inner">
          <Link to="/" className="dashboard__logo">
            <span className="dashboard__logo-icon">SPT</span>
            Placement Tracker
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="dashboard__main">
        <div className="container">
          <div className="dashboard__card">
            <h1>Welcome, {user.name}</h1>
            <p className="dashboard__subtitle">You are successfully logged in.</p>

            <div className="dashboard__details">
              <div className="dashboard__detail">
                <span>Email</span>
                <strong>{user.email}</strong>
              </div>
              <div className="dashboard__detail">
                <span>College</span>
                <strong>{user.college}</strong>
              </div>
              <div className="dashboard__detail">
                <span>Branch</span>
                <strong>{user.branch}</strong>
              </div>
              <div className="dashboard__detail">
                <span>Year</span>
                <strong>{user.year}</strong>
              </div>
              <div className="dashboard__detail">
                <span>Role</span>
                <strong className="dashboard__role">{user.role}</strong>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
