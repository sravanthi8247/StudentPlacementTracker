import express from "express";

import {
  addCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// All company routes require a logged-in user
router.use(protect);

// Add Company (admin only)
router.post("/", authorize("admin"), addCompany);

// Get All Companies
router.get("/", getCompanies);

// Update Company (admin only)
router.put("/:id", authorize("admin"), updateCompany);

// Delete Company (admin only)
router.delete("/:id", authorize("admin"), deleteCompany);

export default router;