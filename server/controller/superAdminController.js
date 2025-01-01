import Clinic from "../models/clinicModel.js";
import Admin from "../models/adminModel.js";
import Assistant from "../models/assistantModel.js";
import Cashier from "../models/cashierModel.js";
import Service from "../models/serviceModel.js";
import Patient from "../models/patientModel.js";

// Admins
const fetchAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().populate("clinicId");

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateActiveAdmin = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const admin = await Admin.findByIdAndUpdate(id, { active });

    res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAdmins = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);

    const { clinicId } = admin;

    const type = admin.type;

    if (type === "Owner") {
      await Admin.deleteMany({ clinicId: id });
      await Assistant.deleteMany({ clinicId: id });
      await Service.deleteMany({ clinicId: id });
      await Clinic.deleteMany({ clinicId: id });

      await Admin.findByIdAndDelete(id);
    } else {
      await Admin.findByIdAndDelete(id);
    }

    res.status(200).json({ messag: "Deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Clinics
const fetchAllClinics = async (req, res) => {
  try {
    const clinic = await Clinic.find();

    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateActiveClinic = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const clinic = await Clinic.findByIdAndUpdate(id, { active });

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteClinic = async (req, res) => {
  const { id } = req.params;
  try {
    const clinic = await Clinic.findById(id);

    const clinicId = clinic._id;

    const admin = await Admin.findOne({ clinicId });

    const adminId = admin._id;

    await Admin.findByIdAndUpdate(adminId, { clinicId: null });

    await Cashier.deleteMany({ clinicId: id });
    await Service.deleteMany({ clinicId: id });
    await Assistant.deleteMany({ clinicId: id });

    await Clinic.findByIdAndDelete(id);

    res.status(200).json({ message: "Clinic deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Users/Patients
const fetchPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateActiveStatus = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const patient = await Patient.findByIdAndUpdate(id, { active });

    res.status(200).json({ message: "Updated." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    await Patient.findByIdAndDelete(id);

    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  fetchAllAdmins,
  fetchAllClinics,
  updateActiveAdmin,
  updateActiveClinic,
  deleteAdmins,
  deleteClinic,
  fetchPatients,
  updateActiveStatus,
  deletePatient,
};
