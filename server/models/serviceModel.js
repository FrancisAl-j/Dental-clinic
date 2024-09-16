import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  features: [String],
  imageLogo: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBdH4C8W5F9FnEymmC6Kn-n9Sn5pJgSSsBhA&s",
  },
  bgImage: {
    type: String,
    default:
      "https://www.shutterstock.com/image-photo/white-healthy-tooth-different-tools-600nw-1069579256.jpg",
  },
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
  },
  visited: {
    type: Number,
    default: 0,
  },
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
