import { useEffect, useState } from "react";
import CompanyForm from "../components/CompanyForm";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import {
    getCompanies,
    deleteCompany,
    updateCompany,
  } from "../services/companyService";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [search, setSearch] = useState("");

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
            style={{
                width: "100%",
                padding: "12px",
                margin: "20px 0",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
            }}
        />

      <CompanyForm
  onCompanyAdded={fetchCompanies}
  selectedCompany={selectedCompany}
  onUpdateCompany={handleUpdate}
 />

      <table className="students-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Package (LPA)</th>
            <th>Location</th>
            <th>Job Role</th>
            <th>Eligibility CGPA</th>
            <th>Drive Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredCompanies.length === 0 ? (
            <tr>
              <td colSpan="7">No companies found</td>
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

                <td>
                    <button
                        onClick={() => handleEdit(company)}
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
                        onClick={() => handleDelete(company._id)}
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
  );
}

export default Companies;