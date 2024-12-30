import mongoose from "mongoose";

const logsSchema = new mongoose.Schema(
  {
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
    },
    role: {
      type: String,
    },
    name: {
      type: String,
    },
    details: {
      type: String,
    },
    dentist: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLogs = mongoose.model("ActivityLogs", logsSchema);
export default ActivityLogs;
