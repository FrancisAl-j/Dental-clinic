import bcryptjs from "bcryptjs";
import Admin from "../models/adminModel.js";

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

export default {
  adminRegister,
};
