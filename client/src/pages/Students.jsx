import DashboardNavbar from "../components/layout/DashboardNavbar";
import StudentForm from "../components/StudentForm";
import { useEffect, useState } from "react";
import {getStudents,  deleteStudent,updateStudent,} from "../services/studentService";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
  
    if (!confirmDelete) return;
  
    try {
      await deleteStudent(id);
      alert("Student deleted successfully!");
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Failed to delete student");
    }
  };
  const handleEdit = (student) => {
    setSelectedStudent(student);
  };
  
  const handleUpdate = async (updatedData) => {
    try {
      await updateStudent(selectedStudent._id, updatedData);

      setSelectedStudent(null);
      await fetchStudents();
      alert("Student Updated Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update student");
    }
  };
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.branch.toLowerCase().includes(search.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <div className="students-container">
      <DashboardNavbar />
      <h1>Student Management</h1>
      <input
        type="text"
        placeholder="🔍 Search by Name, Email, Branch or Roll No"
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

      <StudentForm
  onStudentAdded={fetchStudents}
  selectedStudent={selectedStudent}
  onUpdateStudent={handleUpdate}
/>

      <table className="students-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Roll No</th>
          <th>Branch</th>
          <th>Year</th>
          <th>CGPA</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan="9">No students found</td>
            </tr>
          ) : (
            filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.rollNo}</td>
                <td>{student.branch}</td>
                <td>{student.year}</td>
                <td>{student.cgpa}</td>
                <td>{student.phone}</td>
                <td>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "#fff",
                      fontWeight: "bold",
                      background:
                        student.placementStatus === "Placed"
                          ? "#16a34a"
                          : "#dc2626",
                    }}
                  >
                    {student.placementStatus}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => handleEdit(student)}
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
                    onClick={() => handleDelete(student._id)}
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

export default Students;