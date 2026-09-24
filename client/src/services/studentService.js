import api from "./api.js";

// Get all students
export const getStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

// Add student
export const addStudent = async (studentData) => {
  const response = await api.post("/students", studentData);
  return response.data;
};

// Update student
export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/students/${id}`, studentData);
  return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};

// Dashboard Statistics
export const getDashboardStats = async () => {
  const response = await api.get("/students/dashboard/stats");
  return response.data;
};
