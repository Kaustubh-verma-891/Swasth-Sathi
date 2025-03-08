import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const STATIC_PATIENT_ID = "PATIENT_123";

const PatientConnect = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Connecting...");
  const [meetingLink, setMeetingLink] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [notes, setNotes] = useState([]);
  const [showMeeting, setShowMeeting] = useState(false);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(
      "https://swathya-saathi-signaling-server.onrender.com",
      {
        query: {
          role: "PATIENT",
          patientId: STATIC_PATIENT_ID,
        },
      }
    );

    const socket = socketRef.current;

    socket.on("connect", () => setStatus("Connected. Waiting for doctor..."));
    socket.on("ROOM_CREATED", () => setShowMeeting(true));
    socket.on("MEETING_LINK", (data) => {
      setMeetingLink(data.meetingLink);
      setStatus("Meeting Ready");
    });
    socket.on("NEW_MESSAGE", (data) => {
      const message = data.message;
      setMessages((prev) => [...prev, { text: message, time: new Date() }]);

      if (message.startsWith("PRESCRIPTION:")) {
        setPrescriptions((prev) => [
          ...prev,
          { text: message.replace("PRESCRIPTION:", "").trim(), time: new Date() },
        ]);
      } else {
        setNotes((prev) => [...prev, { text: message, time: new Date() }]);
      }
    });
    socket.on("FORCE_DISCONNECT", () => {
      setStatus("Doctor ended the session");
      socket.disconnect();
      navigate("/patient-dashboard");
    });

    return () => socket.disconnect();
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="flex-1 h-screen flex items-center justify-center">
        {showMeeting && meetingLink ? (
          <iframe
            src={`${meetingLink}#userInfo.displayName="Patient"&config.prejoinPageEnabled=false&config.defaultLocalDisplayName="Patient"&config.constraints.video.aspectRatio=1.777778`}
            allow="camera *; microphone *; fullscreen *; display-capture *; clipboard-write"
            className="w-full h-full border-none rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
          />
        ) : (
          <div className="text-2xl font-semibold text-blue-400 animate-pulse">
            Waiting for doctor connection...
          </div>
        )}
      </div>

      <div className="w-96 bg-gray-900 p-6 flex flex-col h-screen shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">Patient Console</h1>
        <div className="bg-gray-800 rounded-lg p-4 text-green-400 text-center font-medium mb-4">
          {status}
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-700">
          {prescriptions.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-purple-400">Prescriptions</h2>
              {prescriptions.map((prescription, index) => (
                <div key={index} className="bg-purple-800 rounded-lg p-4 shadow-md">
                  <p className="text-purple-100 whitespace-pre-wrap">{prescription.text}</p>
                  <p className="text-purple-300 text-sm mt-2">Received at: {prescription.time.toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          )}

          {notes.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-blue-400">Doctor's Notes</h2>
              {notes.map((note, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4 shadow-md">
                  <p className="text-gray-100 whitespace-pre-wrap">{note.text}</p>
                  <p className="text-gray-400 text-sm mt-2">Received at: {note.time.toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            socketRef.current?.emit("END_CALL");
            navigate("/feedback"); 
          }}
          className="mt-4 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          End Consultation
        </button>

      </div>
    </div>
  );
};

export default PatientConnect;
