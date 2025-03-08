const { v4: uuidv4 } = require('uuid');
const Patient = require('../models/patient.model');

async function generatePatientId() {
    let attempts = 0;
    let patientId = '';

    const isIdUnique = async (id) => {
        const existingPatient = await Patient.findOne({ patientId: id }).exec();
        return !existingPatient;
    };

    while (attempts < 20) {
        patientId = uuidv4().slice(0, 6).toUpperCase();

        if (await isIdUnique(patientId)) {
            return patientId;
        }

        attempts++;
    }

    throw new Error('Unable to generate a unique patient ID after 20 attempts');
}

module.exports = { generatePatientId };