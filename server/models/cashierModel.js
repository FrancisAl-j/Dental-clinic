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
      type: true,
      required: true,
    },
    clinicId: {
      tpye: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
    },
  },
  {
    timestamps: true,
  }
);

const Cashier = mongoose.model("Cashier", cashierSchema);
export default Cashier;
