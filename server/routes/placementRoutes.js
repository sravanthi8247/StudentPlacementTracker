import express from "express";

import {
  addPlacement,
  getPlacements,
  updatePlacement,
  deletePlacement,
} from "../controllers/placementController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// All placement routes require a logged-in user
router.use(protect);

// Add Placement (admin only)
router.post("/", authorize("admin"), addPlacement);

// Get All Placements
router.get("/", getPlacements);

// Update Placement (admin only)
router.put("/:id", authorize("admin"), updatePlacement);

// Delete Placement (admin only)
router.delete("/:id", authorize("admin"), deletePlacement);

export default router;