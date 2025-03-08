import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useAuthStore } from '../../context/useAuthStore';

const DoctorPortal = () => {
  const { logout, authDoctor } = useAuthStore();
  const navigate = useNavigate();
  const pieData = {
    labels: ['Consultations', 'Follow-ups', 'Surgeries'],
    datasets: [
      {
        data: [150, 80, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Appointments',
        data: [12, 19, 25, 30, 22, 18],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4 bg-gray-100 p-4 flex flex-col justify-between fixed h-full shadow-lg">
        <div className="flex-grow">
          <button
            className={'bg-green-500 text-white py-2 px-4 rounded mb-4 w-full'}
            onClick={() => navigate('/videocall')}
          >
            Go Online
          </button>
        </div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded w-full"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
      <div className="w-1/4"></div>
      <div className="w-3/4 p-4 ml-1/4 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Doctor Information</h1>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Edit</button>
        </div>
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <div className="text-lg font-bold">Name: {authDoctor.name}</div>
          <div className="text-gray-600">Degree: {authDoctor.certificateNo}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow-md flex items-center justify-center h-64">
            <Pie data={pieData} options={{ maintainAspectRatio: false, responsive: true }} />
          </div>
          <div className="bg-white p-4 rounded shadow-md flex items-center justify-center h-64">
            <Bar data={barData} options={{ maintainAspectRatio: false, responsive: true }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow-md mt-4">
          <div className="text-lg font-bold mb-4">Previous Meetings</div>
          <ul>
            //meeting history
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorPortal;
