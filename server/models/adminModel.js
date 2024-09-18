import mongoose, { Schema } from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      default: "Admin",
    },
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
    temporaryToken: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
