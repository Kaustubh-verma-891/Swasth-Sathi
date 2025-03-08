const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  givenBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient", // Use string instead of direct model reference
  },
  givenTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Doctor", // Use string instead of direct model reference
  },
  numberOfStars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
