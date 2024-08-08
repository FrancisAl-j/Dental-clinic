import Clinic from "../models/clinicModel.js";

const createClinic = async (req, res, next) => {
  const { clinicName, location, email, phone } = req.body;
};

export default {
  createClinic,
};
