import Clinic from "../models/clinicModel.js";
import Admin from "../models/adminModel.js";
import Assistant from "../models/assistantModel.js";
import Cashier from "../models/cashierModel.js";
import Service from "../models/serviceModel.js";
import Patient from "../models/patientModel.js";
import ActivityLogs from "../models/logsModel.js";

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
      await Admin.deleteMany({ clinicId });
      await Assistant.deleteMany({ clinicId });
      await Service.deleteMany({ clinicId });
      await Clinic.deleteMany({ clinicId });

      await Admin.findByIdAndDelete(id);
    }
    if (type === "Dentist") {
      await Admin.findByIdAndDelete(id);
    } else {
      return res.status(400).json({ message: "Failed to delete dentist." });
    }

    res.status(200).json({ message: "Deleted." });
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

    const admins = await Admin.find({ clinicId });

    //console.log(admins);

    for (const admin of admins) {
      let adminId = admin._id;

      console.log(adminId);

      const dentist = await Admin.findById(adminId);
      let type = dentist.type;

      if (type === "Owner") {
        console.log(`${dentist.name} is the owner`);
        dentist.clinicId = null;

        await dentist.save();
      }

      if (type === "Dentist") {
        console.log(`${dentist.name} is not the owner`);
        await Admin.findByIdAndDelete(adminId);
      }
    }

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

// TODO: Clinic api
const fetchEmployees = async (req, res, next) => {
  try {
    const owner = await Admin.findById(req.user.id);
    if (!owner) {
      return res.status(401).json({ message: "Dentist not authenticated." });
    }
    const clinicId = owner.clinicId;

    const dentist = await Admin.find({ clinicId, type: "Dentist" });
    const assistant = await Assistant.find({ clinicId });

    res.status(200).json({ dentists: dentist, assistants: assistant });
  } catch (error) {
    next(error);
  }
};

const deleteEmployees = async (req, res, next) => {
  const { id } = req.params;
  try {
    const owner = await Admin.findById(req.user.id);
    if (!owner) {
      return res.status(401).json({ message: "Owner is not authenticated." });
    }

    if (id !== undefined) {
      await Admin.findByIdAndDelete(id);
    }
    if (id !== undefined) {
      await Assistant.findByIdAndDelete(id);
    }

    const activityLogs = new ActivityLogs({
      clinic: owner.clinicId,
      details: `Deleted employee: ${id}`,
      name: owner.name,
      role: "Owner",
    });

    await activityLogs.save();

    res.status(200).json({ message: "Employee Deleted." });
  } catch (error) {
    next(error);
  }
};

const updateEmployees = async (req, res, next) => {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const owner = await Admin.findById(req.user.id);
    if (!owner) {
      return res.status(401).json({ message: "Owner is not authenticated." });
    }

    if (id !== undefined) {
      await Admin.findByIdAndUpdate(id, { active });
    }
    if (id !== undefined) {
      await Assistant.findByIdAndUpdate(id, { active });
    }

    let action;
    if (active) {
      action = "Activate";
    } else {
      action = "Inactive";
    }

    const activityLogs = new ActivityLogs({
      clinic: owner.clinicId,
      details: `${action} the account of employee: ${id}`,
      name: owner.name,
      role: "Owner",
    });

    await activityLogs.save();

    res.status(200).json({ message: "Updated Successfully." });
  } catch (error) {
    next(error);
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
  fetchEmployees,
  deleteEmployees,
  updateEmployees,
};
