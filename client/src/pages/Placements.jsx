import { useEffect, useState } from "react";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import PlacementForm from "../components/PlacementForm";
import "../styles/data-table.css";

import {
  getPlacements,
  deletePlacement,
  updatePlacement,
} from "../services/placementService";
import { getStoredUser } from "../services/authService";

function Placements() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [search, setSearch] = useState("");
  const currentUser = getStoredUser();
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const data = await getPlacements();
      setPlacements(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this placement?")) return;

    try {
      await deletePlacement(id);
      alert("Placement deleted successfully!");
      fetchPlacements();
    } catch (error) {
      console.error(error);
      alert("Failed to delete placement");
    }
  };

  const handleEdit = (placement) => {
    setSelectedPlacement(placement);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updatePlacement(selectedPlacement._id, updatedData);

      setSelectedPlacement(null);
      setSearch("");

      await fetchPlacements();

      alert("Placement Updated Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update placement");
    }
  };

  const filteredPlacements = placements.filter((placement) => (placement.student?.name || '').toLowerCase().includes(search.toLowerCase()) || (placement.company?.companyName || '').toLowerCase().includes(search.toLowerCase()) );

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <>
      <DashboardNavbar />

      <div className="students-container">
        <h1>Placement Management</h1>

        <input
          type="text"
          placeholder="🔍 Search by Student or Company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {isAdmin ? (
          <PlacementForm
            onPlacementAdded={fetchPlacements}
            selectedPlacement={selectedPlacement}
            onUpdatePlacement={handleUpdate}
          />
        ) : (
          <p className="read-only-note">
            You're viewing in read-only mode. Only admins can add, edit, or delete records.
          </p>
        )}

        <table className="students-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Company</th>
              <th>Package</th>
              <th>Date</th>
              <th>Status</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredPlacements.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 5}>No placements found</td>
              </tr>
            ) : (
              filteredPlacements.map((placement) => (
                <tr key={placement._id}>
                  <td>{placement.student?.name || 'N/A'}</td>
                  <td>{placement.company?.companyName || 'N/A'}</td>
                  <td>{placement.packageOffered} LPA</td>
                  <td>
                    {new Date(
                      placement.placementDate
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        placement.status === "Selected"
                          ? "status-badge--selected"
                          : placement.status === "Pending"
                          ? "status-badge--pending"
                          : "status-badge--rejected"
                      }`}
                    >
                      {placement.status}
                    </span>
                  </td>

                  {isAdmin && (
                    <td>
                      <button className="btn-edit" onClick={() => handleEdit(placement)}>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(placement._id)}>
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Placements;