const express = require("express");
const { generateQuestions, generateReport } = require("../controllers/ai.controller");

const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.post("/generate-questions", generateQuestions);
router.post("/generate-report", generateReport);

module.exports = router;
