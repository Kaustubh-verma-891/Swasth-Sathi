 Swasth-Sathi Project

Swasth-Sathi is a comprehensive healthcare solution that includes backend services, a doctor portal, a patient-facing frontend, and a signaling server for real-time communication.

 Project Structure

```
Swasth-Sathi-Backend/          # Node.js backend service
Swasth-Sathi-DoctorPortal/     # React-based doctor portal
Swasth-Sathi-Frontend/         # React-based patient frontend
Swathya_saathi_signaling_server/ # Node.js signaling server (Deployed)
.gitignore
README.md
```

 Repositories and Tech Stack

 1. Swasth-Sathi-Backend
- Tech Stack: Node.js, Express, MongoDB
- Description: Manages authentication, patient records, and doctor-patient interactions.

 2. Swasth-Sathi-DoctorPortal
- Tech Stack: React.js, Redux, Material UI
- Description: A web application for doctors to manage appointments, prescriptions, and patient details.

 3. Swasth-Sathi-Frontend
- Tech Stack: React.js, Redux, TailwindCSS
- Description: The patient-facing application for booking appointments, consulting doctors, and tracking health records.

 4. Swathya Saathi Signaling Server
- Tech Stack: Node.js, WebSockets
- Description: Facilitates real-time communication for video consultations and messaging.
- Deployment Link: [Signaling Server](https://swathya-saathi-signaling-server.onrender.com)

 Setup Instructions

1. Clone the repository and navigate to each folder.
2. Run `npm install` or `npm i` in each directory to install dependencies.
3. Start the backend:
   ```sh
   cd Swasth-Sathi-Backend
   npm install
   npm start
   ```
4. Start the doctor portal frontend:
   ```sh
   cd Swasth-Sathi-DoctorPortal
   npm install
   npm start
   ```
5. Start the patient frontend:
   ```sh
   cd Swasth-Sathi-Frontend
   npm install
   npm start
   ```
6. The signaling server is already deployed at [this link](https://swathya-saathi-signaling-server.onrender.com).

 Contribution Guidelines
- Fork the repository and create a new branch for feature development.
- Submit pull requests with proper commit messages.
- Report issues in the GitHub repository.


NOTE - the language change function might not work properly on some browswers or older version of chrome

---
Developed with ❤️ by the Swasth-Sathi Team
