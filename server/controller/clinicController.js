import Admin from "../models/adminModel.js";
import Assistant from "../models/assistantModel.js";
import Cashier from "../models/cashierModel.js";
import Clinic from "../models/clinicModel.js";
import Patient from "../models/patientModel.js";

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
    next(error);
  }
};

// Specific clinic
const getClinic = async (req, res, next) => {
  const { id } = req.params;

  try {
    let user = await Admin.findById(req.user.id);
    if (!user) {
      user = await Assistant.findById(req.user.id);
      if (!user) {
        user = await Cashier.findById(req.user.id);
        if (!user) {
          return res.status(400).json({ message: "Unexpected error" });
        }
      }
    }
    const clinic = await Clinic.findById(id);
    res.status(200).json(clinic);
  } catch (error) {
    next(error);
  }
};

// All clinics
const getClinics = async (req, res, next) => {
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const clinics = await Clinic.find();

    return res.status(200).json(clinics);
  } catch (error) {
    next(error);
  }
};

// Get Clinic by ID patient side
const viewClinic = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
  getClinics,
  viewClinic,
};
