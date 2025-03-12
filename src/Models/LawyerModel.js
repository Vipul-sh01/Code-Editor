import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    enrollmentId: {
      type: String,
      required: true,
      unique: true, 
      match: /^[A-Z]{1,3}\/\d{4,5}\/\d{4}$/, 
    },
    state: {
      type: String, 
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Suspended", "Retired"], 
      default: "Active",
    },
  },
  { timestamps: true }
);

export const Lawyer = mongoose.model("Lawyer", lawyerSchema);
