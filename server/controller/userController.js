import Admin from "../models/adminModel.js";
import Cashier from "../models/cashierModel.js";
import Assistant from "../models/assistantModel.js";
import Patient from "../models/patientModel.js";
import bcryptjs from "bcryptjs";
import Clinic from "../models/clinicModel.js";
import Appointment from "../models/appointmentModel.js";
import Service from "../models/serviceModel.js";

const userUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password, available, availableTime } = req.body;
  try {
    let user = await Admin.findById(req.user.id);
    if (!user) {
      user = await Assistant.findById(req.user.id);
      if (!user) {
        user = await Cashier.findById(req.user.id);
        if (!user) {
          user = await Patient.findById(req.user.user.id);
          if (!user) {
            return res
              .status(401)
              .json({ message: "You can only update your own account" });
          }
        }
      }
    }

    const updatedData = {
      username,
      email,
      available,
      availableTime,
    };

    if (password) {
      updatedData.password = bcryptjs.hashSync(password, 10);
    }

    let updatedUser;

    if (req.user.userType === "Admin") {
      updatedUser = await Admin.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
    } else if (req.user.userType === "Assistant") {
      updatedUser = await Assistant.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
    } else if (req.user.userType === "Cashier") {
      updatedUser = await Cashier.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
    } else if (req.user.user.userType === "Patient") {
      updatedUser = await Patient.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
    }

    const { password: _, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next();
  }
};

const deletePatient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    const patient = await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully deleted." });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "You are not authenticated" });
    }

    const clinicId = user.clinicId;

    await Clinic.findByIdAndDelete(clinicId);
    await Assistant.deleteMany({ clinicId });
    await Cashier.deleteMany({ clinicId });

    const admin = await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: "Admin successfully deleted" });
  } catch (error) {
    next(error);
  }
};

// History of appointments of Patient
const viewAppointment = async (req, res, next) => {
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const patientId = req.user.user.id;

    const appointment = await Appointment.find({ patientId: patientId });
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Cancelling Appointments
const cancelAppointment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const appointment = await Appointment.findByIdAndUpdate(id, {
      status: "Canceled",
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.status(200).json({ message: "Appointment Canceled" });
  } catch (error) {
    next(error);
  }
};

const getDentists = async (req, res, next) => {
  const { serviceId } = req.query;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const service = await Service.findById(serviceId)
      .populate("dentist")
      .exec();

    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

// For Content-based Filtering
const interestedServices = async (req, res, next) => {
  const { id, name } = req.body;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: error.messagee });
    }

    const alreadyInterested = await Patient.findOne({
      "interested.service": id,
    });

    if (alreadyInterested) {
      console.log("Already existing");
      return res
        .status(400)
        .json({ message: "Service is already in interested list." });
    }

    const interestedData = {
      service: id,
      name,
    };

    user.interested.push(interestedData);

    await user.save();

    res.status(200).json({ message: "Added to interested." });
  } catch (error) {
    next(error);
  }
};

export default {
  userUpdate,
  deletePatient,
  deleteAdmin,
  viewAppointment,
  cancelAppointment,
  interestedServices,
  getDentists,
};
