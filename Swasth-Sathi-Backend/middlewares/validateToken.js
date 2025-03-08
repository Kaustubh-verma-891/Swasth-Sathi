const JWT = require('jsonwebtoken');
const Doctor = require('../models/doctor.model');

const validateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({ success: false, message: "Unauthorized" })
        }
        const jwtVerified = JWT.verify(token, process.env.JWT_SECRET)
        if (!jwtVerified) {
            return res.status(401).json({ message: "Error verifing" })
        }
        const doctor = await Doctor.findById(jwtVerified.id).select("-password")
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" })
        }
        req.doctor = doctor
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = validateToken