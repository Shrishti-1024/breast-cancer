import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import onlineDoctorAnimation from "../assets/lottie/OnlineDoctor.json";
import "./FindDoctor.scss";

const doctors = [
  {
    name: "Dr. Jai Prakash Jaiswal",
    specialization: "General & Laparoscopic Surgeon",
    experience: "48 yrs",
    location: "Life Care Hospital, Civil Lines, Gorakhpur",
    contact: "+91 94530 40202",
    link: "https://drjpjaiswal.com/",
    image: "https://www.lifecarehospitalindia.com/images/dr-j-p-jaiswal.png",
  },
  {
    name: "Dr. Binay Kumar Shukla",
    specialization: "General & Bariatric Surgeon",
    experience: "17 yrs",
    location: "Garg Hospital, Gorakhpur University, Gorakhpur",
    contact: "Call Clinic (via Practo)",
    link: "https://www.practo.com/gorakhpur/doctor/dr-binay-kumar-shukla-general-surgeon",
    image:
      "https://content3.jdmagicbox.com/comp/gorakhpur/i5/9999px551.x551.200810214501.f5i5/catalogue/dr-binay-kumar-shukla-garg-hospital-gorakhpur-general-surgeon-doctors-j4aonjldtp.jpg",
  },
  {
    name: "Dr. Parveen Singh",
    specialization: "General Surgeon",
    experience: "13 yrs",
    location: "Adhira Hospital, M.M.M.E College, Gorakhpur",
    contact: "Contact via DocIndia",
    link: "https://www.docindia.org/doctors/gorakhpur/dr-parveen-singh",
    image:
      "https://assets.lybrate.com/img/documents/doctor/dp/510c5e15758dc93b630fa18be14b149d/General-Surgery-ParveenSingh-Noida-43911f.jpg",
  },
  {
    name: "Dr. Ravi Verma",
    specialization: "General Surgeon",
    experience: "5 yrs",
    location: "SRK Healthcare, Gola, Gorakhpur",
    contact: "Via Practo",
    link: "https://www.practo.com/gorakhpur/doctor/ravi-verma-general-surgeon",
    image:
      "https://cdn.hexahealth.com/Image/webp/480x480/8c1e2d97-83e5-406d-9d22-4cdaa3236b2f.webp",
  },
  {
    name: "Dr. Alok Tiwari",
    specialization: "Surgical Oncologist (Robotic & Breast Cancer)",
    experience: "12+ yrs",
    location: "Synergy Cancer Institute, Bilandpur, Gorakhpur",
    contact: "+91-72340 06597",
    link: "https://synergycancer.com/blog/doctor/dr-alok-tiwari/",
    image:
      "https://www.synergycancer.com/_next/image?url=%2Fleaders%2Fdoc-alok-tiwari-2.webp&w=3840&q=75",
  },
  {
    name: "Dr. Gaurav Gupta",
    specialization: "Additional Professor, General Surgery – AIIMS Gorakhpur",
    experience: "–",
    location: "AIIMS Gorakhpur Campus",
    contact: "Via AIIMS Gorakhpur OPD",
    link: "https://aiimsgorakhpur.edu.in/general-surgery/",
    image:
      "https://images1.doctoriduniya.com/doctors-img/dr-gaurav-gupta-general-surgeon-gorakhpur-8905.jpg",
  },
  {
    name: "Dr. Mukul Singh",
    specialization: "Associate Professor, General Surgery – AIIMS Gorakhpur",
    experience: "–",
    location: "AIIMS Gorakhpur Campus",
    contact: "Via AIIMS Gorakhpur OPD",
    link: "https://aiimsgorakhpur.edu.in/general-surgery/",
    image:
      "https://aiimsgorakhpur.edu.in/wp-content/uploads/2022/06/Dr.-Mukul-Singh-Assistant-Professor-General-Surgery.jpeg",
  },
  {
    name: "Dr. Shashank Shekhar",
    specialization: "Associate Professor, Radiotherapy – AIIMS Gorakhpur",
    experience: "–",
    location: "AIIMS Gorakhpur Campus",
    contact: "Via AIIMS Gorakhpur Radiotherapy Dept",
    link: "https://aiimsgorakhpur.edu.in/radiotherapy/",
    image:
      "https://media.licdn.com/dms/image/v2/C4E03AQGmKzlonBwpow/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1590206524900?e=2147483647&v=beta&t=Q3kZvUlom-w7E2FI_ig33SIxFxQ5G3_Iw_KMPng69jE",
  },
];

export default function FindDoctor() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const handleBook = (doctor) => {
    navigate("/book-appointment", { state: { doctor } });
  };

  return (
    <section className="find-doctor action-fade-in">
      <header className="find-header">
        <div className="header-animation">
          <Lottie
            animationData={onlineDoctorAnimation}
            loop
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="header-text">
          <h2>Find a Verified Breast Cancer Specialist in Gorakhpur</h2>
          <p>
            Appointments are booked directly with clinics—ensuring transparency
            and patient safety.
          </p>
        </div>
      </header>

      <div className={`doctor-list ${visible ? "fade-in-list" : ""}`}>
        {doctors.map((doc, i) => (
          <div key={i} className="doctor-card">
            <img src={doc.image} alt={doc.name} className="doctor-avatar" />
            <h3>{doc.name}</h3>
            <p className="specialization">{doc.specialization}</p>
            <p>
              <strong>Experience:</strong> {doc.experience}
            </p>
            <p>
              <strong>Location:</strong> {doc.location}
            </p>
            <p>
              <span className="contact-label">Contact:</span>{" "}
              <span className="contact-link">{doc.contact}</span>
            </p>
            <p>
              <a
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link"
              >
                Clinic Profile
              </a>
            </p>
            <button
              className="book-btn"
              onClick={() => handleBook(doc)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
