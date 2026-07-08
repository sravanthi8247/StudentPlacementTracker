import Placement from "../models/Placement.js";
import Student from "../models/Student.js";

// Update student placement status
const updateStudentPlacementStatus = async (studentId) => {
  const selectedPlacement = await Placement.findOne({
    student: studentId,
    status: "Selected",
  });

  await Student.findByIdAndUpdate(studentId, {
    placementStatus: selectedPlacement ? "Placed" : "Not Placed",
  });
};

// Add Placement
export const addPlacement = async (req, res) => {
    try {
      const placement = await Placement.create(req.body);
  
      await updateStudentPlacementStatus(req.body.student);
  
      res.status(201).json(placement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get All Placements
export const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find()
      .populate("student", "name rollNo")
      .populate("company", "companyName");

    res.json(placements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Placement
export const updatePlacement = async (req, res) => {
    try {
      const placement = await Placement.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      await updateStudentPlacementStatus(placement.student);
  
      res.json(placement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Delete Placement
export const deletePlacement = async (req, res) => {
    try {
      const placement = await Placement.findById(req.params.id);
  
      if (!placement) {
        return res.status(404).json({
          message: "Placement not found",
        });
      }
  
      await Placement.findByIdAndDelete(req.params.id);
  
      await updateStudentPlacementStatus(placement.student);
  
      res.json({
        message: "Placement deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };