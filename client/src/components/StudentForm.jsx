import { useState, useEffect } from "react";
import { addStudent } from "../services/studentService";

function StudentForm({
  onStudentAdded,
  selectedStudent,
  onUpdateStudent,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    branch: "",
    year: "",
    cgpa: "",
    phone: "",
    placementStatus: "Not Placed",
  });
  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name || "",
        email: selectedStudent.email || "",
        rollNo: selectedStudent.rollNo || "",
        branch: selectedStudent.branch || "",
        year: selectedStudent.year || "",
        cgpa: selectedStudent.cgpa || "",
        phone: selectedStudent.phone || "",
        placementStatus: selectedStudent.placementStatus || "Not Placed",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        rollNo: "",
        branch: "",
        year: "",
        cgpa: "",
        phone: "",
        placementStatus: "Not Placed",
      });
    }
  }, [selectedStudent]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (selectedStudent) {
        await onUpdateStudent(formData);
      } else {
        await addStudent(formData);
        alert("Student Added Successfully!");
      }
  
      setFormData({
        name: "",
        email: "",
        rollNo: "",
        branch: "",
        year: "",
        cgpa: "",
        phone: "",
        placementStatus: "Not Placed",
      });
  
      onStudentAdded();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedStudent ? "Edit Student" : "Add Student"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="rollNo"
        placeholder="Roll Number"
        value={formData.rollNo}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="branch"
        placeholder="Branch"
        value={formData.branch}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        step="0.01"
        name="cgpa"
        placeholder="CGPA"
        value={formData.cgpa}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <select
        name="placementStatus"
        value={formData.placementStatus}
        onChange={handleChange}
      >
        <option>Not Placed</option>
        <option>Placed</option>
      </select>

      <button type="submit">
  {selectedStudent ? "Update Student" : "Save Student"}
</button>
    </form>
  );
}

export default StudentForm;