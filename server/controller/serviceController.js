import Admin from "../models/adminModel.js";
import Service from "../models/serviceModel.js";

const createService = async (req, res, next) => {
  const { name, description, category, features } = req.body;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin Unauthenticated" });
    }

    const newService = new Service({
      name,
      description,
      category,
      features,
      clinicId: admin.clinicId,
    });

    await newService.save();

    res.status(200).json({ message: "Service created" });
  } catch (error) {
    next(error);
  }
};

export default { createService };
