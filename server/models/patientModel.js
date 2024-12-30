import mongoose from "mongoose";

const interestedSchema = mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  name: {
    type: String,
  },
});

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
      default: true,
      required: true,
    },
    temporaryToken: {
      type: String,
      required: true,
    },
    interested: [interestedSchema],
    medicalHistory: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
