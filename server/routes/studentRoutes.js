import express from "express";

import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// Add Student
router.post("/", addStudent);

// Get All Students
router.get("/", getStudents);

// Update Student
router.put("/:id", updateStudent);

// Delete Student
router.delete("/:id", deleteStudent);

export default router;