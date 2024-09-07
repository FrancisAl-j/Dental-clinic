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
    background: {
      type: String,
      default:
        "https://www.shutterstock.com/image-photo/white-healthy-tooth-different-tools-600nw-1069579256.jpg",
    },
  },

  {
    timestamps: true,
  }
);

const Clinic = mongoose.model("Clinic", clinicSchema);

export default Clinic;
