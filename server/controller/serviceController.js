import Admin from "../models/adminModel.js";
import Assistant from "../models/assistantModel.js";
import Cashier from "../models/cashierModel.js";
import Service from "../models/serviceModel.js";

// Creating Services
const createService = async (req, res, next) => {
  const { name, description, category, features, imageLogo, bgImage } =
    req.body;
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
      imageLogo,
      bgImage,
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
    let user = await Admin.findById(req.user.id);
    if (!user) {
      user = await Assistant.findById(req.user.id);
      if (!user) {
        user = await Cashier.findById(req.user.id);
        if (!user) {
          return res.status(401).json({ message: "User not authenticated!" });
        }
      }
    }

    const services = await Service.find({ clinicId: user.clinicId });

    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

// Fetching specific service when click or visit
const getService = async (req, res, next) => {
  const { id } = req.params;
  try {
    let user = await Admin.findById(req.user.id);
    if (!user) {
      user = await Assistant.findById(req.user.id);
      if (!user) {
        user = await Cashier.findById(req.user.id);
        if (!user) {
          return res.status(401).json({ message: "User not authenticated!" });
        }
      }
    }
    const service = await Service.findById(id);
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

// Updating service
const updateService = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, imageLogo, bgImage } = req.body;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated!" });
    }
    const updatedData = {
      name,
      description,
      imageLogo,
      bgImage,
    };
    const service = await Service.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found!" });
    }

    res.status(200).json({ message: "Service successfully updated" });
  } catch (error) {
    next(error);
  }
};

export default { createService, getServices, getService, updateService };
