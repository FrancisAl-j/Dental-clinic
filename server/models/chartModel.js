import mongoose from "mongoose";

const teethSchema = new mongoose.Schema({
  toothNumber: {
    type: Number,
  },
  status: {
    type: String,
  },
});

const chartSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  clicnicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  teeth: [teethSchema],
});

const Chart = mongoose.model("Chart", chartSchema);

export default Chart;
