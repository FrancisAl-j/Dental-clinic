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
import ActivityLogs from "../models/logsModel.js";
import { updateAppointment } from "../../client/src/redux/clinic/appointmentReducer.js";

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

const sendAppointmentCompleted = async (userEmail, name) => {
  const mailOption = {
    from: "dental-suite@gmail.com",
    to: userEmail,
    subject: "Appointment status",
    html: `<h1>Hello ${name}</h1>
          <p>Your appointment has been completed.!</p>
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
  const { clinicName, location, email, phone, logo, tin, details } = req.body;
  if (!clinicName || !location || !email || !phone || !logo || !details) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  if (!tin || tin.trim().length === 0) {
    return res
      .status(400)
      .json({ message: "Tax Number Identification is required" });
  }

  if (tin.trim().lengh < 9) {
    return res
      .status(500)
      .json({ message: "Tax Number Identification consists of 9 characters" });
  }

  if (phone.toString().length !== 11) {
    return res.status(400).json({ message: "Invalid phone number" });
  }
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(400).json("Unathenticated user!");
    }

    const adminId = admin._id;

    const clinic = new Clinic({
      clinicName,
      location,
      email,
      phone,
      logo,
      adminId,
      tin,
      details,
    });
    await clinic.save();

    //console.log("Admin before:" + admin);

    admin.clinicId = clinic._id;
    await admin.save();

    const updatedAdmin = await Admin.findById(req.user.id);

    //console.log(`Admin After: ${updatedAdmin}`);

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
      clinics = await Clinic.find({ active: true, service: true });
      return res.status(200).json(clinics);
    } else {
      clinics = await Clinic.find({
        location: { $regex: city.trim(), $options: "i" },
        active: true,
        service: true,
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
    let user = await Admin.findById(req.user.id);
    if (!user) {
      user = await Cashier.findById(req.user.id);
      if (!user) {
        return res.status(401).json({ message: "You are not authenticated!" });
      }
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
      user = await Cashier.findById(req.user.id);
      if (!user) {
        return res.status(401).json({ message: "You are not authenticated!" });
      }
    }

    const clinic = await Clinic.findByIdAndDelete(id);

    await Admin.findByIdAndUpdate(user._id, { clinicId: null });

    const admin = await Admin.findById(user._id);

    //console.log(`Admin after deleting: ${admin}`);

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
      dentist,
    } = req.body;

    const emptyFields = [];

    if (!patientName) {
      emptyFields.push("name");
    }
    if (!patientAge) {
      emptyFields.push("age");
    }
    if (!patientGender) {
      emptyFields.push("gender");
    }
    if (!patientEmail) {
      emptyFields.push("email");
    }
    if (!appointmentDate) {
      emptyFields.push("date");
    }
    if (!patientContact) {
      emptyFields.push("contact");
    }

    if (patientContact.toString().length !== 11) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    //console.log(dentist);

    const Dentist = await Admin.findById(dentist);

    const today = new Date();
    // Remove the time part for comparison
    today.setHours(0, 0, 0, 0);

    // Convert appointmentDate to a Date object
    const available = Dentist.available || []; // Default to an empty array if undefined
    const availableTime = Dentist.availableTime || [];
    console.log("Dentist availability:", available); // Debug log

    if (!Array.isArray(available) || available.length === 0) {
      return res
        .status(400)
        .json({ message: "The dentist's availability is not set." });
    }

    // Ensure appointmentDate is valid
    const appointmentDateObj = new Date(appointmentDate);
    if (isNaN(appointmentDateObj)) {
      return res
        .status(400)
        .json({ message: "Invalid appointment date format." });
    }

    appointmentDateObj.setHours(0, 0, 0, 0);
    const day = appointmentDateObj.getDay(); // Get day of the week (0-6)
    console.log("Appointment day:", day);

    if (!available.includes(day)) {
      return res.status(400).json({
        message: "Please choose a day when the dentist is available.",
      });
    }

    if (appointmentDateObj < today) {
      return res.status(400).json({
        message: "You cannot select a past date for the appointment.",
      });
    }

    const existingAppointment = await Appointment.findOne({
      clinicId,
      appointmentDate,
      appointmentTime,
      dentist,
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
      dentist,
    });

    await newAppointment.save();

    const activityLogs = new ActivityLogs({
      clinic: clinicId,
      role: "Patient",
      details: `Created an appointment to ${clinic}`,
      name: patientName,
    });

    await activityLogs.save();

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
    let user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const clinicId = user.clinicId;
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status, notif: true },
      { new: true }
    );

    const userId = appointment.patientId;

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found!" });
    }
    const patient = await Patient.findById(userId);

    const updatedAppointment = await Appointment.findById(id);
    const newPatient = await Patient_List.findOne({ patientId: patient._id });

    let activityLogs;
    if (updatedAppointment.status === "Confirmed") {
      await sendAppointmentStatus(patient.email, newPatient.patientName);
      activityLogs = new ActivityLogs({
        name: user.name,
        details: `${status} the appointment of ${appointment.patientName}`,
        role: "Dentist",
        clinic: clinicId,
      });
      await activityLogs.save();
      console.log("Send Successfully");
    }
    if (updatedAppointment.status === "Completed") {
      await sendAppointmentCompleted(patient.email, newPatient.patientName);
      activityLogs = new ActivityLogs({
        name: user.name,
        details: `${status} the appointment of ${appointment.patientName}`,
        role: "Dentist",
        clinic: clinicId,
      });
      await activityLogs.save();
      console.log("Send Successfully");
    }

    if (updateAppointment.status === "Canceled") {
      await cancelAppointmentNotif(patient.email, newPatient.patientName);
      activityLogs = new ActivityLogs({
        name: user.name,
        details: `${status} the appointment of ${appointment.patientName}`,
        role: "Dentist",
        clinic: clinicId,
      });
      await activityLogs.save();
      console.log("Send Successfully");
    } else {
      return res.json({ message: "Unavailable status value." });
    }

    console.log("Activtiy Logs ADDED: " + activityLogs);

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

    //console.log(id);

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

const notifOff = async (req, res, next) => {
  const { notif } = req.body;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const userId = user._id;
    const appointments = await Appointment.find({ patientId: userId })
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .exec();
    if (appointment.length === 0) {
      return res.status(404).json({ message: "No appointments found." });
    }

    // Use the first appointment or any specific one you want to update

    //console.log(appointments);
    for (const appointment of appointments) {
      const id = appointment._id;

      await Appointment.findByIdAndUpdate(id, { notif }, { new: true });
    }

    //console.log(id);

    //console.log(appointment);

    res.status(200).json({ message: "Updated." });
  } catch (error) {
    next(error);
  }
};

const fetchPatientLists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patients = await Patient_List.find({ clinicId: id });

    const total = patients.length;

    res.status(200).json(total);
  } catch (error) {
    next(error);
  }
};

const totalAppointments = async (req, res, next) => {
  const { id } = req.params;
  try {
    const appointments = await Appointment.find({ clinicId: id });

    const totalAppointments = appointments.length;

    res.status(200).json(totalAppointments);
  } catch (error) {
    next(error);
  }
};

const totalEmployees = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dentist = await Admin.find({ clinicId: id });
    const assistant = await Assistant.find({ clinicId: id });

    const total = dentist.length + assistant.length;

    res.status(200).json(total);
  } catch (error) {
    next(error);
  }
};

// Fetch Activity Logs

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
  notifOff,
  fetchPatientLists,
  totalAppointments,
  totalEmployees,
};
