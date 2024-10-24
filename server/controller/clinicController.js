import { trusted } from "mongoose";
import Admin from "../models/adminModel.js";
import Assistant from "../models/assistantModel.js";
import Cashier from "../models/cashierModel.js";
import Clinic from "../models/clinicModel.js";
import Patient from "../models/patientModel.js";
import Appointment from "../models/appointmentModel.js";
import Service from "../models/serviceModel.js";
import Patient_List from "../models/patientListModel.js";
import sendAppointmentsReminder, {
  transporter,
} from "../sendingEmails/nodeMailer.js";

const sendAppointmentStatus = async (userEmail, name) => {
  const mailOption = {
    from: "dental-suite@gmail.com",
    to: userEmail,
    subject: "Appointment status",
    html: `<h1>Hello ${name}</h1>
          <p>Your appointment has been confirmed!</p>
    `,
  };

  transporter.sendMail(mailOption);
};

const cancelAppointmentNotif = async (userEmail, name) => {
  const mailOption = {
    from: "denta-suite@gmail.com",
    to: userEmail,
    subject: "Appointment Cancelled",
    html: `<h1>Hello ${name}</h1>
          <p>Sorry for the inconvenience your appointment has been cancelled by the dentist</p>
    `,
  };

  transporter.sendMail(mailOption);
};

const createClinic = async (req, res, next) => {
  const { clinicName, location, email, phone, logo } = req.body;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(400).json("Unathenticated user!");
    }

    const clinic = new Clinic({ clinicName, location, email, phone, logo });
    await clinic.save();

    console.log("Admin before:" + admin);

    admin.clinicId = clinic._id;
    await admin.save();

    const updatedAdmin = await Admin.findById(req.user.id);

    console.log(`Admin After: ${updatedAdmin}`);

    res.status(200).json({ clinic, updatedAdmin });
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

// All clinics patient's side
const getClinics = async (req, res, next) => {
  const { city } = req.query; // Checks the city of the user if there is one or allowed by the user
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let clinics;
    if (!city || city.trim() === "") {
      clinics = await Clinic.find();
      return res.status(200).json(clinics);
    } else {
      clinics = await Clinic.find({
        location: { $regex: city.trim(), $options: "i" },
      });

      return res.status(200).json(clinics);
    }
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

    const admin = await Admin.findById(user._id);

    console.log(`Admin after deleting: ${admin}`);

    await Assistant.deleteMany({
      clinicId: id,
    });
    await Cashier.deleteMany({ clinicId: id });

    res
      .status(200)
      .json({ message: "Clinic and Employees deleted successfully!", admin });
  } catch (error) {
    next(error);
  }
};

// Appointment scheduling
const appointment = async (req, res, next) => {
  const { clinicId } = req.query;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const {
      patientName,
      patientAge,
      patientGender,
      patientEmail,
      clinicId,
      appointmentDate,
      patientContact,
      clinic,
      services,
      appointmentTime,
    } = req.body;

    const today = new Date();
    // Remove the time part for comparison
    today.setHours(0, 0, 0, 0);

    // Convert appointmentDate to a Date object
    const appointmentDateObj = new Date(appointmentDate);
    appointmentDateObj.setHours(0, 0, 0, 0); // Reset the time to ensure a fair comparison

    if (appointmentDateObj < today) {
      return res.status(400).json({
        message: "You cannot select a past date for the appointment.",
      });
    }

    const existingAppointment = await Appointment.findOne({
      clinicId,
      appointmentDate,
      appointmentTime,
    });

    if (existingAppointment) {
      return res
        .status(400)
        .json({ message: "Appointment Date and Time already taken" });
    }

    const newAppointment = new Appointment({
      clinicId,
      clinic,
      patientId: req.user.user.id,
      patientName,
      patientAge,
      patientGender,
      patientEmail,
      patientContact,
      appointmentDate,
      status: "Pending",
      services,
      appointmentTime,
    });

    await newAppointment.save();
    res.status(200).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

// Fetching appointment lists
const appointmentLists = async (req, res, next) => {
  try {
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    const clinicId = req.user.clinicId;

    const appointment = await Appointment.find({ clinicId: clinicId });
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Updating status
const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    const userId = appointment.patientId;

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found!" });
    }
    const patient = await Patient.findById(userId);

    const updatedAppointment = await Appointment.findById(id);
    const newPatient = await Patient_List.findOne({ patientId: patient._id });
    console.log(newPatient);
    if (updatedAppointment.status === "Confirmed") {
      await sendAppointmentStatus(patient.email, newPatient.patientName);
      console.log("Send Successfully");
    }

    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

// deleting appointments Patient's side
const deleteAppointment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User unauthenticated" });
    }

    console.log(id);

    const appointment = await Appointment.findById(id);
    const patientId = appointment.patientId; // Id for finding patient or user
    const patient = await Patient_List.findOne({ patientId: patientId });
    const newUser = await Patient.findById(patientId);
    await Appointment.findByIdAndDelete(id);

    await cancelAppointmentNotif(newUser.email, patient.patientName);

    res.status(200).json({ message: "Appointment Deleted" });
  } catch (error) {
    next(error);
  }
};

// Fetching Patients
const getPatients = async (req, res, next) => {
  try {
    let user = await Admin.findById(req.user.id);
    if (!user) {
      user = await Assistant.findById(req.user.id);
      if (!user) {
        user = await Cashier.findById(req.user.id);
        if (!user) {
          return res.status(401).json({ message: "User not authenticated" });
        }
      }
    }
    const clinicId = req.user.clinicId;

    const appointments = await Appointment.find({ clinicId: clinicId }).exec();

    res.status(200).json(appointments);
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
  appointmentLists,
  updateStatus,
  getPatients,
  deleteAppointment,
};
