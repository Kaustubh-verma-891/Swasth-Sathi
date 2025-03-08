import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VideoCallPage from './doctor/pages/VideoCall.jsx';
import LoginPage from './doctor/pages/login.jsx';
import DoctorPortal from './doctor/pages/DoctorProfile.jsx';
import SignupPage from './doctor/pages/SignUp.jsx';
import PatientCard from './doctor/pages/patientCard.jsx';
import { useAuthStore } from './context/useAuthStore.js';

function App() {
  const { authDoctor, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authDoctor) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/doctorprofile" element={authDoctor ? <DoctorPortal /> : <Navigate to='/' />} />
        <Route path="/videocall" element={authDoctor ? <VideoCallPage /> : <Navigate to='/' />} />
        <Route path="/patientcard" element={authDoctor ? <PatientCard /> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
