import bcryptjs from "bcryptjs";
import Admin from "../models/adminModel.js";
import Cashier from "../models/cashierModel.js";
import jwt from "jsonwebtoken";
import Assistant from "../models/assistantModel.js";
import Patient from "../models/patientModel.js";
import { transporter } from "../sendingEmails/nodeMailer.js";

const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

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

  try {
    const payload = {
      username: username,
      email: email,
    };

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const patient = new Patient({
      username,
      email,
      password: hashedPassword,
      temporaryToken: jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400, // Expires in a day
      }),
    });

    const user = await patient.save();
    const token = await createToken(user._id);

    const activateEmail = {
      from: "Dental Suite Admin, dental-suite@gmail.com",
      to: user.email,
      subject: "Account Activation",
      text: `Hello ${user.username}, Activate your account by clinic the provided link`, // Plain text fallback
      html: `Hello <strong>${user.username}</strong>,<br><br>Activate your account by clicking the link provided!<br><br>
  <a href="http://localhost:5173/verify/email/${user.temporaryToken}">Click here to log in</a>`,
    };

    transporter.sendMail(activateEmail, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Activation Message Confirmation:", info.response);
      }
    });

    res.status(200).json({ user, token: token });
  } catch (error) {
    next(error);
  }
};

// Verifying token
const verifyToken = async (req, res, next) => {
  const { token } = req.params;
  try {
    const user = await Patient.findOne({ temporaryToken: token });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Temporary token has been expired!" });
    }

    const tempToken = token;

    jwt.verify(tempToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json({ message: "Activation link expired!" });
      }
    });

    user.temporaryToken = false;
    user.active = true;
    try {
      await user.save();

      const emailActivate = {
        from: "Dental Suite Admin, dental-suite@gmail.com",
        to: user.email,
        subject: "Localhost Account Activated",
        text: `Hello ${user.username}, Your account has been successfully activated!`,
        html: `Hello <strong>${user.username}</strong>,<br><br>Your account has been successfully activated!`,
      };

      transporter.sendMail(emailActivate, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Activation Message Confirmation:", info.response);
        }
      });

      res.status(200).json({ message: "Account successfully activated" });
    } catch (error) {
      next(error);
    }
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
      return res.status(400).json({ message: "Invalid Credentials!" });
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
  verifyToken,
};
