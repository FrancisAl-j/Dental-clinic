import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema(
  {
    clinicName: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
  },

  {
    timestamps: true,
  }
);

const Clinic = mongoose.model("Clinic", clinicSchema);

export default Clinic;
