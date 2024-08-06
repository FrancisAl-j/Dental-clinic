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

// Admin sign in
const adminSignin = async (req, res, next) => {
  const { email, password, clinicId } = req.body;

  try {
    const user = await Admin.findOne({ username, clinicId });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  adminRegister,
  adminSignin,
};
