import { useState, useEffect } from "react";
import { addPlacement } from "../services/placementService";
import { getStudents } from "../services/studentService";
import { getCompanies } from "../services/companyService";

function PlacementForm({
  onPlacementAdded,
  selectedPlacement,
  onUpdatePlacement,
}) {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    company: "",
    placementDate: "",
    packageOffered: "",
    status: "Pending",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const studentsData = await getStudents();
    const companiesData = await getCompanies();

    setStudents(studentsData);
    setCompanies(companiesData);
  };

  useEffect(() => {
    if (selectedPlacement) {
      setFormData({
        student: selectedPlacement.student._id,
        company: selectedPlacement.company._id,
        placementDate: selectedPlacement.placementDate.substring(0, 10),
        packageOffered: selectedPlacement.packageOffered,
        status: selectedPlacement.status,
      });
    } else {
      setFormData({
        student: "",
        company: "",
        placementDate: "",
        packageOffered: "",
        status: "Pending",
      });
    }
  }, [selectedPlacement]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedPlacement) {
        await onUpdatePlacement(formData);
        alert("Placement Updated Successfully!");
      } else {
        await addPlacement(formData);
        alert("Placement Added Successfully!");
      }

      setFormData({
        student: "",
        company: "",
        placementDate: "",
        packageOffered: "",
        status: "Pending",
      });

      onPlacementAdded();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedPlacement ? "Edit Placement" : "Add Placement"}</h2>

      <select
        name="student"
        value={formData.student}
        onChange={handleChange}
        required
      >
        <option value="">Select Student</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.name}
          </option>
        ))}
      </select>

      <select
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
      >
        <option value="">Select Company</option>
        {companies.map((company) => (
          <option key={company._id} value={company._id}>
            {company.companyName}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="placementDate"
        value={formData.placementDate}
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

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option>Pending</option>
        <option>Selected</option>
        <option>Rejected</option>
      </select>

      <button type="submit">
        {selectedPlacement ? "Update Placement" : "Save Placement"}
      </button>
    </form>
  );
}

export default PlacementForm;