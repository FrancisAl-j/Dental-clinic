import mongoose from "mongoose";

const patientListSchema = mongoose.Schema({
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
    required: true,
  },
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
});

const Patient_List = mongoose.model("Patient-list", patientListSchema);

export default Patient_List;
