import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    packageOffered: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    eligibilityCGPA: {
      type: Number,
      required: true,
    },
    driveDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", companySchema);