import Admin from "../models/adminModel.js";
import Clinic from "../models/clinicModel.js";

const createClinic = async (req, res, next) => {
  const { clinicName, location, email, phone } = req.body;
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(400).json("Unathenticated user!");
    }

    const clinic = new Clinic({ clinicName, location, email, phoe });
    await clinic.save();

    admin.clinicId = clinic._id;

    await admin.save();

    rse.status(200).json(clinic);
  } catch (error) {
    next(error);
  }
};

export default {
  createClinic,
};
