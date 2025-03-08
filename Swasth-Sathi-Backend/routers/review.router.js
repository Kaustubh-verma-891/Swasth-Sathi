const express = require("express");
const router = express.Router();
const {createReview,getReview} = require("../controllers/review.controller.js");
const mongoose = require("mongoose");

const validateReviewInput = async (req, res, next) => {
  try {
    const { givenBy, givenTo, numberOfStars } = req.body;

    if (!givenBy || !givenTo || !numberOfStars) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(givenBy) ||
      !mongoose.Types.ObjectId.isValid(givenTo)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient or doctor ID",
      });
    }

    if (numberOfStars < 1 || numberOfStars > 5) {
      return res.status(400).json({
        success: false,
        message: "Star rating must be between 1 and 5",
      });
    }

    const Patient = mongoose.model("Patient");
    const Doctor = mongoose.model("Doctor");

    const [patient, doctor] = await Promise.all([
      Patient.findById(givenBy),
      Doctor.findById(givenTo),
    ]);

    if (!patient || !doctor) {
      return res.status(404).json({
        success: false,
        message: "Patient or doctor not found",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error validating review data",
      error: error.message,
    });
  }
};

router.post("/create", validateReviewInput,createReview);
router.get("/get/:id", getReview);

module.exports = router;
