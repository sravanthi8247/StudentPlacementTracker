import express from "express";

import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  getDashboardStats,
} from "../controllers/studentController.js";

const router = express.Router();

// Add Student
router.post("/", addStudent);

// Dashboard Statistics
router.get("/dashboard/stats", getDashboardStats);

// Get All Students
router.get("/", getStudents);

// Update Student
router.put("/:id", updateStudent);

// Delete Student
router.delete("/:id", deleteStudent);

export default router;