const express = require("express");
const router = express.Router();
const { savePatient, getPatient, addReview } = require("../controllers/patient.controller");

const validatePatientInput = (req, res, next) => {
  const { name, gender, age, language, phone, address } = req.body;

  if (!name || !gender || !age || !language || !phone || !address) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number format",
    });
  }

  if (req.body.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }
  }

  if (age < 0 || age > 150) {
    return res.status(400).json({
      success: false,
      message: "Invalid age",
    });
  }

  next();
};

router.post("/save", validatePatientInput, savePatient);
router.post("/get", getPatient);
router.patch("/add_review/:id", addReview)

module.exports = router;
