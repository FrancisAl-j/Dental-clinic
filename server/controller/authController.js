import bcryptjs from "bcryptjs";
import Admin from "../models/adminModel.js";
import Cashier from "../models/cashierModel.js";
import jwt from "jsonwebtoken";
import Assistant from "../models/assistantModel.js";
import Patient from "../models/patientModel.js";

// Admin registration
const adminRegister = async (req, res, next) => {
  const { fullname, email, password, Cpassword } = req.body;
  if (Cpassword !== password) {
    return res.status(400).json("Password do not match");
  }

  if (!password || password.trim().length === 0) {
    return res.status(400).json({ message: "Password is required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newAdmin = new Admin({
    name: fullname,
    email,
    password: hashedPassword,
  });

  try {
    await newAdmin.save();
    res.status(201).json("Admin created successfully");
  } catch (error) {
    next(error);
  }
};

// User sign in
const adminSignin = async (req, res, next) => {
  const { email, password, clinicId } = req.body;

  try {
    let user = await Admin.findOne({ email });
    let userType = "Admin";
    if (!user) {
      user = await Assistant.findOne({ email });
      userType = "Assistant";
      if (!user) {
        user = await Cashier.findOne({ email });
        userType = "Cashier";
        if (!user) {
          return res.status(400).json({ message: "Invalid Credentials!" });
        }
      }
    }

    if (
      (user.role === "Assistant" || user.role === "Cashier") &&
      user.clinicId &&
      clinicId &&
      user.clinicId.toString() !== clinicId
    ) {
      return res
        .status(400)
        .json({ message: "Invalid Clinic for " + user.role });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      id: user._id, // Ensure this field is included
      clinicId: user.clinicId || null,
      userType: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    const { password: hashedPassword, ...rest } = user._doc;
    const expiryDate = new Date(Date.now() + 3600000); // Expiration of cookie is 1 hour

    res
      .cookie("token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Assistant sign up
const assistantSignup = async (req, res, next) => {
  const { username, email, password, Cpassword } = req.body;
  if (password !== Cpassword) {
    res.status(400).json({ message: "Password do not match!" });
  }

  if (!password || password.trim().length === 0) {
    return res.status(400).json({ message: "Password is required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const assistant = new Assistant({
    username,
    email,
    password: hashedPassword,
  });
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(400).json({ message: "Unauthenticated User!" });
    }

    assistant.clinicId = admin.clinicId;

    await assistant.save();
    res.status(200).json({ message: "Assitant succesfully created." });
  } catch (error) {
    next(error);
  }
};

// Sign up for cashier
const cashierSignup = async (req, res, next) => {
  const { username, email, password, Cpassword } = req.body;
  if (password !== Cpassword) {
    return res.status(400).json({ message: "Password do not match!" });
  }

  if (!password || password.trim().length === 0) {
    return res.status(400).json({ message: "Password is required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const cashier = new Cashier({
    username,
    email,
    password: hashedPassword,
  });
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(400).json({ message: "Unauthenticated User!" });
    }

    cashier.clinicId = admin.clinicId;

    await cashier.save();
    res.status(200).json({ message: "Cashier created successfully" });
  } catch (error) {
    next(error);
  }
};

// Sign up for patient
const patientSignup = async (req, res, next) => {
  const { username, email, password, Cpassword } = req.body;
  if (password !== Cpassword) {
    return res.status(400).json({ message: "Password do not match!" });
  }

  if (!password || password.trim().length === 0) {
    return res.status(400).json({ message: "Password is required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const patient = new Patient({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await patient.save();
    res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    next(error);
  }
};

// Sign in for patient
const patientSignin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Patient.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials!" });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        userType: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    const { password: hashedPassword, ...rest } = user._doc;
    const expiryDate = new Date(Date.now() + 3600000); // Expiration of cookie is 1 hour

    res
      .cookie("token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Sign out for all user
const signout = (req, res) => {
  res.clearCookie("token").status(200).json("Sign out success!");
};

export default {
  adminRegister,
  adminSignin,
  assistantSignup,
  cashierSignup,
  patientSignup,
  patientSignin,
  signout,
};
