import Admin from "../models/adminModel.js";
import Cashier from "../models/cashierModel.js";
import Assistant from "../models/assistantModel.js";
import Patient from "../models/patientModel.js";
import bcryptjs from "bcryptjs";

const userUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
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

export default { userUpdate };
