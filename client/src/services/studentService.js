import axios from "axios";

const API = "http://localhost:5000/api/students";

// Get all students
export const getStudents = async () => {
  const response = await axios.get(API);
  return response.data;
};

// Add student
export const addStudent = async (studentData) => {
  const response = await axios.post(API, studentData);
  return response.data;
};

// Update student
export const updateStudent = async (id, studentData) => {
  const response = await axios.put(`${API}/${id}`, studentData);
  return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};