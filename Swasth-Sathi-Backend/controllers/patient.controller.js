const Patient = require("../models/patient.model");
const { generatePatientId } = require("../utils/patientIdGeneratar");

const patientController = {
  savePatient: async (req, res) => {
    try {
      const patientId = await generatePatientId();
      const {
        name,
        gender,
        age,
        language,
        phone,
        alternativeNumber,
        email,
        address,
      } = req.body;

      const newPatient = new Patient({
        patientId,
        name,
        gender,
        age,
        language,
        phone,
        alternativeNumber: alternativeNumber || "0000000000",
        email,
        address,
      });

      const savedPatient = await newPatient.save();

      res.status(201).json({
        success: true,
        message: "Patient information saved successfully",
        data: savedPatient,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error saving patient information",
        error: error.message,
      });
    }
  },

  getPatient: async (req, res) => {
    try {
      const { patientId, phone } = req.body;
      const patient = await Patient.findOne({ patientId }).populate("reviews").exec();

      if (!patient || patient.phone !== phone) {
        return res
          .status(404)
          .json({ success: false, message: "Patient not found" });
      }

      res.status(200).json({ success: true, data: patient });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching patient information",
        error: error.message,
      });
    }
  },

  addReview: async (req, res) => {
    try {
      const { id } = req.params;
      const { reviewId } = req.body;

      const patient = await Patient.findById(id);
      if (!patient) {
        return res
          .status(404)
          .json({ success: false, message: "Patient not found" });
      }

      patient.reviews.push(reviewId);
      await patient.save();

      res
        .status(200)
        .json({
          success: true,
          message: "Review added successfully",
          data: patient,
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error adding review",
        error: error.message,
      });
    }
  },
};

module.exports = patientController;
