const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  alternativeNumber: {
    type: String,
    default: "0000000000"
  },
  email: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  sessions: [
    {
      type: Object,
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
