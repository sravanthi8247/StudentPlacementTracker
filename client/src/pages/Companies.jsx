import { useEffect, useState } from "react";
import CompanyForm from "../components/CompanyForm";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import "../styles/data-table.css";
import {
    getCompanies,
    deleteCompany,
    updateCompany,
  } from "../services/companyService";
import { getStoredUser } from "../services/authService";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [search, setSearch] = useState("");
  const currentUser = getStoredUser();
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
  
    if (!confirmDelete) return;
  
    try {
      await deleteCompany(id);
      alert("Company deleted successfully!");
      fetchCompanies();
    } catch (error) {
      console.error(error);
      alert("Failed to delete company");
    }
  };
  
  const handleEdit = (company) => {
    setSelectedCompany(company);
  };
  
  const handleUpdate = async (updatedData) => {
    try {
      await updateCompany(selectedCompany._id, updatedData);
  
      setSelectedCompany(null);
      setSearch("");
      await fetchCompanies();
  
      alert("Company Updated Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update company");
    }
  };
  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(search.toLowerCase()) ||
    company.location.toLowerCase().includes(search.toLowerCase()) ||
    company.jobRole.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <div className="students-container">
        <DashboardNavbar />
        <h1>Company Management</h1>
        <input
            type="text"
            placeholder="🔍 Search by Company, Location or Job Role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
        />

      {isAdmin ? (
        <CompanyForm
          onCompanyAdded={fetchCompanies}
          selectedCompany={selectedCompany}
          onUpdateCompany={handleUpdate}
        />
      ) : (
        <p className="read-only-note">
          You're viewing in read-only mode. Only admins can add, edit, or delete records.
        </p>
      )}

      <table className="students-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Package (LPA)</th>
            <th>Location</th>
            <th>Job Role</th>
            <th>Eligibility CGPA</th>
            <th>Drive Date</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {filteredCompanies.length === 0 ? (
            <tr>
              <td colSpan={isAdmin ? 7 : 6}>No companies found</td>
            </tr>
          ) : (
            filteredCompanies.map((company) => (
              <tr key={company._id}>
                <td>{company.companyName}</td>
                <td>{company.packageOffered}</td>
                <td>{company.location}</td>
                <td>{company.jobRole}</td>
                <td>{company.eligibilityCGPA}</td>
                <td>{new Date(company.driveDate).toLocaleDateString()}</td>

                {isAdmin && (
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(company)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(company._id)}>
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
  );
}

export default Companies;