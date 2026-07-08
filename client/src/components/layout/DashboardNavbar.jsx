import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { clearAuthData } from "../../services/authService";

function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthData();
    navigate("/login");
  };

  return (
    <header className="dashboard__header">
      <div className="container dashboard__header-inner">
        <Link to="/dashboard" className="dashboard__logo">
          <span className="dashboard__logo-icon">SPT</span>
          Placement Tracker
        </Link>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/dashboard">
            <Button size="sm">Dashboard</Button>
          </Link>

          <Link to="/students">
            <Button size="sm">Students</Button>
          </Link>

          <Link to="/companies">
            <Button size="sm">Companies</Button>
          </Link>

          <Link to="/placements">
            <Button size="sm">Placements</Button>
          </Link>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;