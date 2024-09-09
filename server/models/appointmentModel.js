import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    patientAge: {
      type: Number,
      required: true,
    },
    patientEmail: {
      type: String,
      required: true,
    },
    patientGender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    patientContact: {
      type: String,
      required: true,
    },
    clinic: {
      type: String,
      required: true,
    },
    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Canceled"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
