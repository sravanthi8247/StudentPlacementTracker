import { useState } from "react";
import { addStudent } from "../services/studentService";

function StudentForm({ onStudentAdded }) {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addStudent(formData);
      alert("Student Added Successfully!");

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
      alert("Failed to add student");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>

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

      <button type="submit">Save Student</button>
    </form>
  );
}

export default StudentForm;