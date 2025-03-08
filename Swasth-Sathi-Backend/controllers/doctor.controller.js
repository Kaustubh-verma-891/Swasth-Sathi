const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor.model");
const Review = require("../models/review.model");
const { getReview } = require("../controllers/review.controller");

const createDoctor = async (req, res) => {
  try {
    const { name, email, phone, languagesKnown, certificateNo, mciRegNo, password } = req.body;
    if (!name || !email || !phone || !languagesKnown || !certificateNo || !mciRegNo) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const doctor = new Doctor({
      name,
      email,
      phone,
      languagesKnown,
      certificateNo,
      mciRegNo,
      password: hashedPassword,
    });
    await doctor.save();
    doctor.password = undefined; // Don't send password in response

    const token = jwt.sign({
      id: doctor._id,
      email: doctor.email,
    }
      , process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(201).json({ success: true, doctor });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, doctor.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    doctor.password = undefined; // Don't send password in response

    const token = jwt.sign({
      id: doctor._id,
      email: doctor.email,
    }
      , process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateDoctor = async (req, res) => {
  try {
    const { name, email, phone, languagesKnown, certificateNo, mciRegNo, password } = req.body;
    const doctor = await Doctor.findById(req.doctor._id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    doctor.name = name || doctor.name;
    doctor.email = email || doctor.email;
    doctor.phone = phone || doctor.phone;
    doctor.languagesKnown = languagesKnown || doctor.languagesKnown;
    doctor.certificateNo = certificateNo || doctor.certificateNo;
    doctor.mciRegNo = mciRegNo || doctor.mciRegNo;
    if (password) {
      doctor.password = await bcrypt.hash(password, 12);
    }
    await doctor.save();
    doctor.password = undefined; // Don't send password in response
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().lean();
    for (let doctor of doctors) {
      const populatedReviews = await Promise.all(
        doctor.reviews.map(async (reviewId) => {
          return await Review.findById(reviewId)
            .populate("givenBy", "name")
            .populate("givenTo", "name")
            .exec();
        })
      );
      doctor.reviews = populatedReviews;
    }
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addReviewToDoctor = async (req, res) => {
  try {
    const { doctorId, reviewId } = req.body;
    const doctor = await Doctor.findById(doctorId);
    const review = await Review.findById(reviewId);

    if (!doctor || !review) {
      return res.status(404).json({ error: "Doctor or Review not found" });
    }

    doctor.reviews.push(reviewId);
    await doctor.save();

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDoctor, login, logout, checkAuth, updateDoctor, getAllDoctors, addReviewToDoctor };
