import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    placementDate: {
      type: Date,
      required: true,
    },

    packageOffered: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Selected", "Rejected", "Pending"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Placement", placementSchema);