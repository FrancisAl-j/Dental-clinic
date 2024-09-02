import mongoose from "mongoose";

const dentalRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    treatments: [String],
    conditions: [String],
    chartDetails: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const DentalRecord = mongoose.model("DentalRecord", dentalRecordSchema);

export default DentalRecord;
