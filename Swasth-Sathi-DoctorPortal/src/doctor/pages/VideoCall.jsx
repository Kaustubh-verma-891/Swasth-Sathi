// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const DoctorMeeting = () => {
//   const [socket, setSocket] = useState(null);
//   const [meetingLink, setMeetingLink] = useState(null);
//   const [prescriptionSent, setPrescriptionSent] = useState(false);
//   const [medication, setMedication] = useState("");
//   const [notes, setNotes] = useState("");

//   useEffect(() => {
//     const newSocket = io(
//       "https://swathya-saathi-signaling-server.onrender.com",
//       {
//         query: { role: "DOCTOR" },
//       }
//     );
//     setSocket(newSocket);

//     newSocket.on("connect", () =>
//       console.log("Doctor connected to socket server!")
//     );
//     newSocket.on("MEETING_LINK", (data) => setMeetingLink(data.meetingLink));
//     newSocket.on("disconnect", () =>
//       console.log("Disconnected from socket server.")
//     );

//     return () => newSocket.disconnect();
//   }, []);

//   const sendPrescription = () => {
//     if (socket) {
//       socket.emit("MESSAGE", {
//         message: `PRESCRIPTION: ${medication}, Notes: ${notes}`,
//       });
//       setPrescriptionSent(true);
//       setMedication("");
//       setNotes("");
//     }
//   };

//   const handleEndCall = () => {
//     if (!prescriptionSent) {
//       alert("Warning: No prescription has been sent!");
//       return;
//     }
//     if (socket) socket.disconnect();
//     window.location.href = "/doctorprofile";
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* Video Call Section */}
//       <div style={{ flex: 4, borderRight: "2px solid #ccc" }}>
//         {meetingLink ? (
//           <iframe
//             src={`${meetingLink}#userInfo.displayName=%22Doctor%22`}
//             width="100%"
//             height="100%"
//             allow="camera; microphone; fullscreen; display-capture"
//           />
//         ) : (
//           <div style={{ textAlign: "center", paddingTop: "20%" }}>
//             Waiting for meeting to start...
//           </div>
//         )}
//       </div>

//       {/* Prescription Section */}
//       <div style={{ flex: 1, padding: "20px" }}>
//         <h3>Prescription</h3>
//         <input
//           type="text"
//           placeholder="Medication"
//           value={medication}
//           onChange={(e) => setMedication(e.target.value)}
//           style={{ width: "100%", marginBottom: "10px" }}
//         />
//         <textarea
//           placeholder="Notes"
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//           style={{ width: "100%", height: "100px", marginBottom: "10px" }}
//         />
//         <button onClick={sendPrescription} style={{ width: "100%" }}>
//           Send Prescription
//         </button>
//         <button
//           onClick={handleEndCall}
//           style={{ width: "100%", marginTop: "10px" }}
//         >
//           End Call
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DoctorMeeting;


import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const DoctorMeeting = () => {
  const [socket, setSocket] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null);
  const [prescriptionSent, setPrescriptionSent] = useState(false);
  const [medication, setMedication] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io("https://swathya-saathi-signaling-server.onrender.com", {
      query: { role: "DOCTOR" },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => console.log("Doctor connected to socket server!"));
    newSocket.on("MEETING_LINK", (data) => setMeetingLink(data.meetingLink));
    newSocket.on("disconnect", () => console.log("Disconnected from socket server."));

    return () => newSocket.disconnect();
  }, []);

  // Function to send prescription message
  const sendPrescription = () => {
    if (socket) {
      socket.emit("MESSAGE", {
        roomId: socket.roomId, // Ensure the message is sent to the correct room
        message: `PRESCRIPTION: ${medication}, Notes: ${notes}`,
      });
      setPrescriptionSent(true);
      setMedication("");
      setNotes("");
    }
  };

  // Function to end the call and disconnect from the socket
  const handleEndCall = () => {
    if (!prescriptionSent) {
      alert("Warning: No prescription has been sent!");
      return;
    }
    if (socket) socket.disconnect();
    window.location.href = "/doctorprofile";
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Video Call Section */}
      <div style={{ flex: 4, borderRight: "2px solid #ccc" }}>
        {meetingLink ? (
          <iframe
            src={`${meetingLink}#userInfo.displayName=%22Doctor%22`}
            width="100%"
            height="100%"
            allow="camera; microphone; fullscreen; display-capture"
          />
        ) : (
          <div style={{ textAlign: "center", paddingTop: "20%" }}>
            Waiting for meeting to start...
          </div>
        )}
      </div>

      {/* Prescription Section */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h3>Prescription</h3>
        <input
          type="text"
          placeholder="Medication"
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ width: "100%", height: "100px", marginBottom: "10px" }}
        />
        <button onClick={sendPrescription} style={{ width: "100%" }}>
          Send Prescription
        </button>
        <button
          onClick={handleEndCall}
          style={{ width: "100%", marginTop: "10px" }}
        >
          End Call
        </button>
      </div>
    </div>
  );
};

export default DoctorMeeting;
