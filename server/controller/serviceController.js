import Admin from "../models/adminModel.js";
import Service from "../models/serviceModel.js";

// Creating Services
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

// Displaying services
const getServices = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated" });
    }

    const services = await Service.find({ clinicId: admin.clinicId });

    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

// Fetching specific service when click or visit
const getService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated!" });
    }
    const service = await Service.findById(id);
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

export default { createService, getServices, getService };
