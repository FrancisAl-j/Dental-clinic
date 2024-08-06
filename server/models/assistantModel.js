import mongoose from "mongoose";

const assistantSchema = mongoose.Schema(
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
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Assistant = mongoose.model("Assistant", assistantSchema);

export default Assistant;
