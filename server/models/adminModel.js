import mongoose, { Schema } from "mongoose";

const adminSchema = new mongoose.Schema(
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
      type: mongoose.Schema.ObjectId,
      ref: "Clinic",
    },
  },

  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
