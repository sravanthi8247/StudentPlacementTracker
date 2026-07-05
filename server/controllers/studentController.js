import Student from "../models/Student.js";

// Add Student
export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const placedStudents = await Student.countDocuments({
      placementStatus: "Placed",
    });

    const notPlacedStudents = await Student.countDocuments({
      placementStatus: "Not Placed",
    });

    const placementRate =
      totalStudents === 0
        ? 0
        : ((placedStudents / totalStudents) * 100).toFixed(1);

    res.json({
      totalStudents,
      placedStudents,
      notPlacedStudents,
      placementRate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};