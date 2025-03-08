const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')


// self made requires
const { dbConfig } = require('./config/dbConfig')
const paymentRouter = require('./routers/payment.router')
const reviewRouter = require('./routers/review.router')
const patientRouter = require('./routers/patient.router')
const doctorRouter = require('./routers/doctor.router')
const aiRouter = require('./routers/ai.router')
// AI Intregration Require

const { GoogleAuth } = require("google-auth-library");
const fs = require("fs");

// builtin middlewares
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const auth = new GoogleAuth({
   keyFilename: "google-key.json",  // Ensure this file is in your backend root directory
   scopes: "https://www.googleapis.com/auth/cloud-platform",
});




//routes
app.use('/payment', paymentRouter)
app.use('/patient', patientRouter)
app.use('/review', reviewRouter)
app.use('/doctor', doctorRouter)
app.use('/ai', aiRouter)


app.listen(process.env.PORT || 5000, async () => {
   await dbConfig();
   console.log('server connected successfully...')
})