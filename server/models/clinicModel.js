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
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdefault-logo&psig=AOvVaw2DHxtP6or-bEb4ZgbwpqNm&ust=1725032062997000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPjxiqzDmogDFQAAAAAdAAAAABAE",
    },
  },

  {
    timestamps: true,
  }
);

const Clinic = mongoose.model("Clinic", clinicSchema);

export default Clinic;
