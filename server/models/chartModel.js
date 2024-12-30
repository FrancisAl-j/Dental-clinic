import mongoose from "mongoose";

const teethSchema = new mongoose.Schema({
  toothNumber: {
    type: Number,
  },
  // Condition
  status: {
    type: String,
  },
  prosthetic: {
    type: String,
    default: "None",
  },
  surgery: {
    type: String,
    default: "None",
  },
  occlusal: {
    type: String,
    default: "None",
  },
  mesial: {
    type: String,
    default: "None",
  },
  distal: {
    type: String,
    default: "None",
  },
  buccal: {
    type: String,
    default: "None",
  },
  lingual: {
    type: String,
    default: "None",
  },
  bridge: {
    type: Boolean,
    default: false,
  },
  crown: {
    type: String,
    default: "None",
  },
});

const chartSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient-list",
    },
    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    teeth: [teethSchema],
    notes: [String],
  },

  {
    timestamps: true,
  }
);

const Chart = mongoose.model("Chart", chartSchema);

export default Chart;
