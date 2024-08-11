import bcryptjs from "bcryptjs";
import Admin from "../models/adminModel.js";
import Cashier from "../models/assistantModel.js";
import jwt from "jsonwebtoken";
import Assistant from "../models/assistantModel.js";

// Admin registration
const adminRegister = async (req, res, next) => {
  const { username, email, password, Cpassword } = req.body;
  if (Cpassword !== password) {
    return res.status(400).json("Password do not match");
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newAdmin = new Admin({
    username,
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

// Admin sign in
const adminSignin = async (req, res, next) => {
  const { email, password, clinicId } = req.body;

  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    if (user.clinicId && clinicId && user.clinicId.toString() !== clinicId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      id: user._id, // Ensure this field is included
      clinicId: user.clinicId,
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

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const assistant = new Assistant({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await assistant.save();
    res.status(200).json({ message: "Assitant succesfully created." });
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
  signout,
};
