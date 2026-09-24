import { useState, useEffect } from "react";
import { addCompany } from "../services/companyService";

function CompanyForm({
    onCompanyAdded,
    selectedCompany,
    onUpdateCompany,
  }) {
  const [formData, setFormData] = useState({
    companyName: "",
    packageOffered: "",
    location: "",
    jobRole: "",
    eligibilityCGPA: "",
    driveDate: "",
  });
  useEffect(() => {
    if (selectedCompany) {
      setFormData({
        companyName: selectedCompany.companyName || "",
        packageOffered: selectedCompany.packageOffered || "",
        location: selectedCompany.location || "",
        jobRole: selectedCompany.jobRole || "",
        eligibilityCGPA: selectedCompany.eligibilityCGPA || "",
        driveDate: selectedCompany.driveDate
          ? selectedCompany.driveDate.substring(0, 10)
          : "",
      });
    } else {
      setFormData({
        companyName: "",
        packageOffered: "",
        location: "",
        jobRole: "",
        eligibilityCGPA: "",
        driveDate: "",
      });
    }
  }, [selectedCompany]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (selectedCompany) {
        await onUpdateCompany(formData);
      } else {
        await addCompany(formData);
        alert("Company Added Successfully!");
      }
  
      setFormData({
        companyName: "",
        packageOffered: "",
        location: "",
        jobRole: "",
        eligibilityCGPA: "",
        driveDate: "",
      });
  
      onCompanyAdded();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedCompany ? "Edit Company" : "Add Company"}</h2>

      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="packageOffered"
        placeholder="Package (LPA)"
        value={formData.packageOffered}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="jobRole"
        placeholder="Job Role"
        value={formData.jobRole}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        step="0.01"
        name="eligibilityCGPA"
        placeholder="Eligibility CGPA"
        value={formData.eligibilityCGPA}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="driveDate"
        value={formData.driveDate}
        onChange={handleChange}
        required
      />

        <button type="submit">
        {selectedCompany ? "Update Company" : "Save Company"}
        </button>
    </form>
  );
}

export default CompanyForm;