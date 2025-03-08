import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PatientCard = () => {
  const location = useLocation();
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    // Simulating fetching patient details dynamically
    fetch('/api/patient-details')
      .then(response => response.json())
      .then(data => setPatientData(data))
      .catch(error => console.error('Error fetching patient details:', error));
  }, []);

  if (!patientData) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
  }

  const { name, age, patientId, doctor, selectedMedicine, notes } = patientData;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src="app-logo.png" alt="App Logo" className="h-8 w-8 mr-2" />
            <span className="text-gray-600">App Logo</span>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <p className="text-gray-500">{doctor.degree}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-gray-600">Age: {age}</p>
          <p className="text-gray-600">Patient ID: {patientId}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold">Medicine Recommended</h4>
          <p className="bg-blue-100 text-blue-800 p-2 rounded">{selectedMedicine || "No medicine selected"}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Doctor's Notes</h4>
          <p className="text-gray-600">{notes || "No notes provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
