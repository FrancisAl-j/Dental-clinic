import { trusted } from "mongoose";
import Admin from "../models/adminModel.js";
import Assistant from "../models/assistantModel.js";
import Cashier from "../models/cashierModel.js";
import Clinic from "../models/clinicModel.js";
import Patient from "../models/patientModel.js";
import Appointment from "../models/appointmentModel.js";

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

// Updating clinic
const updateClinic = async (req, res, next) => {
  const { id } = req.params;
  const { clinicName, location, email, phone } = req.body;
  try {
    const updatedData = {
      clinicName,
      location,
      email,
      phone,
    };
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "You are not authenticated!" });
    }
    const updatedClinic = await Clinic.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedClinic) {
      return res.status(404).json({ message: "Clinic not found!" });
    }

    res.status(200).json(updatedClinic);
  } catch (error) {
    next(error);
  }
};

// Deleting clinic along with employees
const deleteClinic = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    const clinic = await Clinic.findByIdAndDelete(id);

    await Admin.findByIdAndUpdate(user._id, { clinicId: null });

    await Assistant.deleteMany({
      clinicId: id,
    });
    await Cashier.deleteMany({ clinicId: id });

    res
      .status(200)
      .json({ message: "Clinic and Employees deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

// Appointment scheduling
const appointment = async (req, res, next) => {
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const {
      patientName,
      patientAge,
      patientGender,
      clinicId,
      appointmentDate,
    } = req.body;

    const newAppointment = new Appointment({
      clinicId,
      patientId: req.user.user.id,
      patientName,
      patientAge,
      patientGender,
      appointmentDate,
      status: "Pending",
    });

    await newAppointment.save();
    res.status(200).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

export default {
  createClinic,
  getClinic,
  getClinics,
  viewClinic,
  updateClinic,
  deleteClinic,
  appointment,
};
