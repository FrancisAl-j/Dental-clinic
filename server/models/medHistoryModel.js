import mongoose from "mongoose";

const questionsSchema = mongoose.Schema({
  healthy: {
    type: Boolean,
  },
  treatment: {
    type: Boolean,
  },
  illness: {
    type: Boolean,
  },
  hospitalized: {
    type: Boolean,
  },
  medication: {
    type: Boolean,
  },
  smoking: {
    type: Boolean,
  },
  addiction: {
    type: Boolean,
  },
  allergic: [String],
  bleedingTime: {
    type: String,
  },

  // For Women only question
  pregnant: {
    type: Boolean,
  },
  nursing: {
    type: Boolean,
  },
  pills: {
    type: Boolean,
  },
  // Women only ends here

  bloodType: {
    type: String,
  },
  bloodPressure: {
    type: String,
  },
  diseases: [String],

  // If yes
  yesTreatment: {
    type: String,
  },
  yesIllness: {
    type: String,
  },
  yesHospitalized: {
    type: String,
  },
  yesMedication: {
    type: String,
  },
});

const medHistorySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient-list",
    default: null,
  },
  questions: [questionsSchema],
});

const MedicalHistory = mongoose.model("Medcial History", medHistorySchema);

export default MedicalHistory;
