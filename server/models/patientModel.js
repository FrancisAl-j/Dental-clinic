import mongoose from "mongoose";

const patientSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Patient",
    },
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
    temporaryToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
