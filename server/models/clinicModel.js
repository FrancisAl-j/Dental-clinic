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
    logo: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s",
    },
  },

  {
    timestamps: true,
  }
);

const Clinic = mongoose.model("Clinic", clinicSchema);

export default Clinic;
