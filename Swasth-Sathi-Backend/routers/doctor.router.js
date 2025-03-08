const express = require("express");
const {
  createDoctor,
  login,
  logout,
  checkAuth,
  updateDoctor,
  getAllDoctors,
  addReviewToDoctor,
} = require("../controllers/doctor.controller");

const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.post("/signup", createDoctor);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkauth", validateToken, checkAuth);
router.patch("/update", validateToken, updateDoctor);

router.get("/get", getAllDoctors);
router.post("/doctors/add_review", addReviewToDoctor);

module.exports = router;
