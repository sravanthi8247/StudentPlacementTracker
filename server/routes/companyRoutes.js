import express from "express";

import {
  addCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";

const router = express.Router();

// Add Company
router.post("/", addCompany);

// Get All Companies
router.get("/", getCompanies);

// Update Company
router.put("/:id", updateCompany);

// Delete Company
router.delete("/:id", deleteCompany);

export default router;