const Review = require("../models/review.model");

const reviewController = {
  createReview: async (req, res) => {
    try {
      const {
        givenBy, 
        givenTo, 
        numberOfStars,
        comment,
      } = req.body;

      const newReview = new Review({
        givenBy,
        givenTo,
        numberOfStars,
        comment,
      });

      // Save to database
      const savedReview = await newReview.save();

      // Return just the ObjectId of the created review
      res.status(201).json({
        success: true,
        message: "Review created successfully",
        reviewId: savedReview._id,
      });
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({
        success: false,
        message: "Error creating review",
        error: error.message,
      });
    }
  },

  getReview: async (req, res) => {
    try {
      const { id } = req.params;

      const review = await Review.findById(id)
        .populate("givenBy", "name") 
        .populate("givenTo", "name") 
        .exec();

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      res.status(200).json({
        success: true,
        data: review,
      });
    } catch (error) {
      console.error("Error fetching review:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching review",
        error: error.message,
      });
    }
  },
};

module.exports = reviewController;
