import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { clearAuthData, getStoredUser } from "../services/authService";
import { getDashboardStats } from "../services/studentService";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = getStoredUser();

  const [stats, setStats] = useState({
    totalStudents: 0,
    placedStudents: 0,
    notPlacedStudents: 0,
    placementRate: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  const handleLogout = () => {
    clearAuthData();
    navigate("/login");
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

            <p className="dashboard__subtitle">
              You are successfully logged in.
            </p>

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
                <strong className="dashboard__role">
                  {user.role}
                </strong>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div className="dashboard__card">
              <h3>Total Students</h3>
              <h1>{stats.totalStudents}</h1>
            </div>

            <div className="dashboard__card">
              <h3>Placed Students</h3>
              <h1>{stats.placedStudents}</h1>
            </div>

            <div className="dashboard__card">
              <h3>Not Placed</h3>
              <h1>{stats.notPlacedStudents}</h1>
            </div>

            <div className="dashboard__card">
              <h3>Placement Rate</h3>
              <h1>{stats.placementRate}%</h1>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;