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
      default: true, // Turn to false if the testing is done
    },
    temporaryToken: {
      type: String,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    available: [Number],
    availableTime: [String],
    specialize: {
      type: String,
    },
    type: {
      type: String,
    },
    //! Adding a license number
  },

  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
