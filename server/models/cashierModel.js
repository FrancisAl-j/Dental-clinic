import mongoose from "mongoose";

const cashierSchema = new mongoose.Schema(
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
    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
    },
    role: {
      type: String,
      default: "Cashier",
    },
  },
  {
    timestamps: true,
  }
);

const Cashier = mongoose.model("Cashier", cashierSchema);
export default Cashier;
