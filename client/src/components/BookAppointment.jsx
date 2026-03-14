import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./BookAppointment.scss";
import Footer from "../components/Footer";

/* Doctor directory (same source used by FindDoctor) */
const doctors = [
{
name: "Dr. Jai Prakash Jaiswal",
specialization: "General & Laparoscopic Surgeon",
location: "Life Care Hospital, Civil Lines, Gorakhpur",
image: "https://www.lifecarehospitalindia.com/images/dr-j-p-jaiswal.png",
},
{
name: "Dr. Binay Kumar Shukla",
specialization: "General & Bariatric Surgeon",
location: "Garg Hospital, Gorakhpur University, Gorakhpur",
image:
"https://content3.jdmagicbox.com/comp/gorakhpur/i5/9999px551.x551.200810214501.f5i5/catalogue/dr-binay-kumar-shukla-garg-hospital-gorakhpur-general-surgeon-doctors-j4aonjldtp.jpg",
},
{
name: "Dr. Parveen Singh",
specialization: "General Surgeon",
location: "Adhira Hospital, M.M.M.E College, Gorakhpur",
image:
"https://assets.lybrate.com/img/documents/doctor/dp/510c5e15758dc93b630fa18be14b149d/General-Surgery-ParveenSingh-Noida-43911f.jpg",
},
{
name: "Dr. Ravi Verma",
specialization: "General Surgeon",
location: "SRK Healthcare, Gola, Gorakhpur",
image:
"https://cdn.hexahealth.com/Image/webp/480x480/8c1e2d97-83e5-406d-9d22-4cdaa3236b2f.webp",
},
{
name: "Dr. Alok Tiwari",
specialization: "Surgical Oncologist (Robotic & Breast Cancer)",
location: "Synergy Cancer Institute, Bilandpur, Gorakhpur",
image:
"https://www.synergycancer.com/_next/image?url=%2Fleaders%2Fdoc-alok-tiwari-2.webp&w=3840&q=75",
},
{
name: "Dr. Gaurav Gupta",
specialization: "General Surgery – AIIMS Gorakhpur",
location: "AIIMS Gorakhpur Campus",
image:
"https://images1.doctoriduniya.com/doctors-img/dr-gaurav-gupta-general-surgeon-gorakhpur-8905.jpg",
},
{
name: "Dr. Mukul Singh",
specialization: "General Surgery – AIIMS Gorakhpur",
location: "AIIMS Gorakhpur Campus",
image:
"https://aiimsgorakhpur.edu.in/wp-content/uploads/2022/06/Dr.-Mukul-Singh-Assistant-Professor-General-Surgery.jpeg",
},
{
name: "Dr. Shashank Shekhar",
specialization: "Radiotherapy – AIIMS Gorakhpur",
location: "AIIMS Gorakhpur Campus",
image:
"https://media.licdn.com/dms/image/v2/C4E03AQGmKzlonBwpow/profile-displayphoto-shrink_200_200/0/1590206524900?e=2147483647&v=beta&t=Q3kZvUlom-w7E2FI_ig33SIxFxQ5G3_Iw_KMPng69jE",
},
];

const BookAppointment = () => {
const location = useLocation();
const selectedDoctor = location.state?.doctor || null;

const [formData, setFormData] = useState({
fullName: "",
email: "",
phone: "",
doctor: selectedDoctor?.name || "",
date: "",
time: "",
mode: "in-person",
reason: "",
});

const [submitted, setSubmitted] = useState(false);

/* Active doctor shown on left panel */
const activeDoctor =
doctors.find((doc) => doc.name === formData.doctor) || selectedDoctor;

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
if (submitted) setSubmitted(false);
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Appointment data:", formData);
setSubmitted(true);
};

return (
<> <div className="appointment-page"> <div className="appointment-bg-layer" />


    <div className="appointment-shell">

      {/* LEFT PANEL */}
      <motion.div
        className="doctor-panel"
        initial={{ x: -25, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="doctor-badge">Breast Cancer Specialist</div>

        <h1>Book an appointment</h1>

        <p className="panel-subtitle">
          Choose a convenient time to consult a verified breast specialist.
          Your details are encrypted and shared only with the clinic.
        </p>

        {/* Dynamic doctor preview */}
        <motion.div
          key={activeDoctor?.name}
          className="doctor-card-mini"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className="avatar"
            style={
              activeDoctor?.image
                ? {
                    backgroundImage: `url(${activeDoctor.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          />

          <div className="doctor-info">
            <h3>{activeDoctor?.name || "Select a doctor"}</h3>
            <p className="role">
              {activeDoctor?.specialization ||
                "Breast & general surgery"}
            </p>
            <p className="location">
              {activeDoctor?.location ||
                "Clinic location will appear here"}
            </p>
          </div>
        </motion.div>

        <ul className="panel-points">
          <li>No payment processed on this page – clinic will confirm.</li>
          <li>You’ll get a confirmation email/SMS once booked.</li>
          <li>Bring any previous reports or ultrasound scans along.</li>
        </ul>
      </motion.div>

      {/* RIGHT PANEL – FORM */}
      <motion.div
        className="appointment-card"
        initial={{ x: 25, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <h2>Appointment details</h2>

        <p className="card-subtitle">
          Fill in a few details so the clinic can schedule your visit.
        </p>

        {submitted && (
          <div className="appt-message success">
            Request submitted. The clinic will reach out to confirm your
            slot.
          </div>
        )}

        <form className="appointment-form" onSubmit={handleSubmit}>

          <div className="appt-row">
            <div className="appt-group">
              <label>Full name</label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="appt-group">
              <label>Mobile number</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="appt-row">
            <div className="appt-group">
              <label>Email address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="appt-group">
              <label>Preferred doctor</label>

              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
              >
                <option value="">Select doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.name} value={doc.name}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="appt-row">
            <div className="appt-group">
              <label>Preferred date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="appt-group">
              <label>Preferred time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="appt-group">
            <label>Consultation mode</label>

            <div className="mode-toggle">
              <button
                type="button"
                className={formData.mode === "in-person" ? "active" : ""}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, mode: "in-person" }))
                }
              >
                In-person
              </button>

              <button
                type="button"
                className={formData.mode === "online" ? "active" : ""}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, mode: "online" }))
                }
              >
                Video consult
              </button>
            </div>
          </div>

          <div className="appt-group">
            <label>Reason for visit</label>
            <textarea
              name="reason"
              rows="3"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>

          <div className="appt-consent">
            <input type="checkbox" required />
            <label>
              I understand this is a request for an appointment.
            </label>
          </div>

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send appointment request
          </motion.button>

        </form>
      </motion.div>
    </div>
  </div>

  <Footer />
</>
);
};

export default BookAppointment;
