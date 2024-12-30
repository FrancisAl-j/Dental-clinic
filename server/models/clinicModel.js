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
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    details: {
      type: String,
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
    tin: {
      type: String,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    service: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const Clinic = mongoose.model("Clinic", clinicSchema);

export default Clinic;
