import { useEffect, useState } from "react";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import PlacementForm from "../components/PlacementForm";

import {
  getPlacements,
  deletePlacement,
  updatePlacement,
} from "../services/placementService";

function Placements() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [search, setSearch] = useState("");

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
          style={{
            width: "100%",
            padding: "12px",
            margin: "20px 0",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <PlacementForm
          onPlacementAdded={fetchPlacements}
          selectedPlacement={selectedPlacement}
          onUpdatePlacement={handleUpdate}
        />

        <table className="students-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Company</th>
              <th>Package</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPlacements.length === 0 ? (
              <tr>
                <td colSpan="6">No placements found</td>
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
                        style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            color: "#fff",
                            fontWeight: "bold",
                            background:
                                placement.status === "Selected"
                                ? "#16a34a"
                                : placement.status === "Pending"
                                ? "#f59e0b"
                                : "#dc2626",
                        }}
                    >
                        {placement.status}
                    </span>
                </td>

                  <td>
                    <button
                      onClick={() => handleEdit(placement)}
                      style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "8px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(placement._id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
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