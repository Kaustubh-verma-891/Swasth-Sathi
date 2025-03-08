const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  languagesKnown: {
    type: [String],
    required: true,
    validate: {
      validator: function (languages) {
        return languages.includes("English");
      },
      message: "At least English must be known.",
    },
  },
  mciRegNo: {
    type: String,
    required: true,
  },
  certificateNo: {
    type: String,
    required: true,
  },
  patientsAttended: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },

  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
