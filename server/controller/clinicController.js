import Admin from "../models/adminModel.js";
import Clinic from "../models/clinicModel.js";

const createClinic = async (req, res, next) => {
  const { clinicName, location, email, phone } = req.body;
  try {
    console.log("Request User:", req.user); // Check if this is set
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(400).json("Unathenticated user!");
    }

    const clinic = new Clinic({ clinicName, location, email, phone });
    await clinic.save();

    admin.clinicId = clinic._id;
    await admin.save();

    res.status(200).json(clinic);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export default {
  createClinic,
};
