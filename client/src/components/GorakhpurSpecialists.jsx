import React from "react";
import { motion } from "framer-motion";
import "./GorakhpurSpecialists.scss";

const doctors = [
{
name: "Dr. Jai Prakash Jaiswal",
specialization: "General & Laparoscopic Surgeon",
hospital: "Life Care Hospital",
location: "Civil Lines, Gorakhpur",
contact: "+91 94530 40202",
image: "https://www.lifecarehospitalindia.com/images/dr-j-p-jaiswal.png",
},
{
name: "Dr. Binay Kumar Shukla",
specialization: "General & Bariatric Surgeon",
hospital: "Garg Hospital",
location: "Gorakhpur University Road",
contact: "+91 98765 43210",
image:
"https://content3.jdmagicbox.com/comp/gorakhpur/i5/9999px551.x551.200810214501.f5i5/catalogue/dr-binay-kumar-shukla-garg-hospital-gorakhpur-general-surgeon-doctors-j4aonjldtp.jpg",
},
{
name: "Dr. Parveen Singh",
specialization: "General Surgeon",
hospital: "Adhira Hospital",
location: "M.M.M.E College Road",
contact: "+91 91234 56789",
image:
"https://assets.lybrate.com/img/documents/doctor/dp/510c5e15758dc93b630fa18be14b149d/General-Surgery-ParveenSingh-Noida-43911f.jpg",
},
{
name: "Dr. Ravi Verma",
specialization: "General Surgeon",
hospital: "SRK Healthcare",
location: "Gola, Gorakhpur",
contact: "+91 92345 12345",
image:
"https://cdn.hexahealth.com/Image/webp/480x480/8c1e2d97-83e5-406d-9d22-4cdaa3236b2f.webp",
},
{
name: "Dr. Alok Tiwari",
specialization: "Breast Cancer Surgical Oncologist",
hospital: "Synergy Cancer Institute",
location: "Bilandpur, Gorakhpur",
contact: "+91 72340 06597",
image:
"https://www.synergycancer.com/_next/image?url=%2Fleaders%2Fdoc-alok-tiwari-2.webp&w=3840&q=75",
},
];

export default function GorakhpurSpecialists() {
return ( <section className="gkp-doctors">

```
  <div className="gkp-header">
    <h1>Breast Cancer Specialists in Gorakhpur</h1>
    <p>
      Find verified breast cancer surgeons and oncologists in Gorakhpur.
      Consult trusted specialists and book appointments easily.
    </p>
  </div>

  <div className="doctor-grid">
    {doctors.map((doc, index) => (
      <motion.div
        className="doctor-card"
        key={index}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <img src={doc.image} alt={doc.name} />

        <div className="doctor-info">
          <h3>{doc.name}</h3>
          <p className="spec">{doc.specialization}</p>

          <p>
            <strong>Hospital:</strong> {doc.hospital}
          </p>

          <p>
            <strong>Location:</strong> {doc.location}
          </p>

          <p className="contact">{doc.contact}</p>

          <button className="book-btn">Book Appointment</button>
        </div>
      </motion.div>
    ))}
  </div>
</section>

);
}
