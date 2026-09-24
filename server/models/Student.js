import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    rollNo: {
      type: String,
      required: true,
      unique: true,
    },

    branch: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    cgpa: {
      type: Number,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    phone: {
      type: String,
      required: true,
    },

    placementStatus: {
      type: String,
      enum: ["Placed", "Not Placed"],
      default: "Not Placed",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);