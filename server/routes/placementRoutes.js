import express from "express";

import {
  addPlacement,
  getPlacements,
  updatePlacement,
  deletePlacement,
} from "../controllers/placementController.js";

const router = express.Router();

// Add Placement
router.post("/", addPlacement);

// Get All Placements
router.get("/", getPlacements);

// Update Placement
router.put("/:id", updatePlacement);

// Delete Placement
router.delete("/:id", deletePlacement);

export default router;