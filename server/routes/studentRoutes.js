import express from "express";

import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  getDashboardStats,
} from "../controllers/studentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// All student routes require a logged-in user
router.use(protect);

// Add Student (admin only)
router.post("/", authorize("admin"), addStudent);

// Dashboard Statistics
router.get("/dashboard/stats", getDashboardStats);

// Get All Students
router.get("/", getStudents);

// Update Student (admin only)
router.put("/:id", authorize("admin"), updateStudent);

// Delete Student (admin only)
router.delete("/:id", authorize("admin"), deleteStudent);

export default router;