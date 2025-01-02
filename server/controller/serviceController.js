import Admin from "../models/adminModel.js";
import Assistant from "../models/assistantModel.js";
import Cashier from "../models/cashierModel.js";
import Service from "../models/serviceModel.js";
import Patient from "../models/patientModel.js";
import Appointment from "../models/appointmentModel.js";
import Clinic from "../models/clinicModel.js";
import ActivityLogs from "../models/logsModel.js";

// Creating Services
const createService = async (req, res, next) => {
  const { name, description, category, features, imageLogo, bgImage, dentist } =
    req.body;

  const emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!dentist) {
    emptyFields.push("dentist");
  }

  if (emptyFields.length > 0) {
    return res.status({ message: "Please fill in all fields.", emptyFields });
  }

  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin Unauthenticated" });
    }

    const clinic = await Clinic.findById(admin.clinicId);
    const location = clinic.location;

    const newService = new Service({
      name,
      description,
      category,
      features,
      imageLogo,
      bgImage,
      clinicId: admin.clinicId,
      dentist,
      address: location,
    });

    await newService.save();

    clinic.service = true;

    await clinic.save();

    const activityLogs = new ActivityLogs({
      name: admin.name,
      role: "Dentist",
      clinic: admin.clinicId,
      details: `Added a new service: ${name}`,
    });

    await activityLogs.save();

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

    const activityLogs = new ActivityLogs({
      name: admin.name,
      role: "Dentist",
      clinic: admin.clinicId,
      details: `Update the service ${name}`,
    });

    await activityLogs.save();

    res.status(200).json({ message: "Service successfully updated" });
  } catch (error) {
    next(error);
  }
};

// Deleting service
const deleteService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated!" });
    }
    const service = await Service.findByIdAndDelete(id);

    res.status(200).json({ message: "Service deleted." });
  } catch (error) {
    next(error);
  }
};

// Fetching service patient side
const patientService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated!" });
    }
    const service = await Service.findById(id).populate("dentist");
    await Service.findByIdAndUpdate(id, { $inc: { visited: 0.5 } });

    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

const clinicServices = async (req, res, next) => {
  const { clinicId } = req.query;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const services = await Service.find({ clinicId });

    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

// Patient see this paginated services of clinics
const paginatedServices = async (req, res, next) => {
  const { clinicId } = req.query;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenthicated" });
    }

    const services = await Service.find({ clinicId });
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalServices = services.length;
    results.pageCount = Math.ceil(services.length / limit);

    if (lastIndex < services.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
      };
    }

    const result = services.slice(startIndex, lastIndex);
    res.status(200).json({ results, result });
  } catch (error) {
    next(error);
  }
};

// Get services for patients
const patientGetServices = async (req, res, next) => {
  const { clinicId } = req.query;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated!" });
    }

    const services = await Service.find({ clinicId });

    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

const fetchAllServices = async (req, res) => {
  const { query, location } = req.query;
  try {
    const allServices = await Service.find({
      name: { $regex: query, $options: "i" },
      address: { $regex: location, $options: "i" },
    }).populate("clinicId");

    res.status(200).json(allServices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const allServices = async (req, res, next) => {
  try {
    const services = await Service.find()
      .sort({ visited: -1 })
      .populate("clinicId")
      .exec();

    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

const fetchDentists = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated." });
    }

    //console.log("Admin" + admin);

    const clinicId = admin.clinicId;

    const dentists = await Admin.find({ clinicId });

    res.status(200).json(dentists);
  } catch (error) {
    next(error);
  }
};

export default {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
  patientService,
  paginatedServices,
  patientGetServices,
  fetchAllServices,
  fetchDentists,
  allServices,
  clinicServices,
};
