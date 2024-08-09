import Admin from "../models/adminModel.js";
import Clinic from "../models/clinicModel.js";

const createClinic = async (req, res, next) => {
  const { clinicName, location, email, phone } = req.body;
  try {
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

const getClinic = async (req, res, next) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(400).json({ message: "Unauthenticated User!" });
    }
    const clinic = await Clinic.findById(id);
    res.status(200).json(clinic);
  } catch (error) {
    next(error);
  }
};

export default {
  createClinic,
  getClinic,
};
