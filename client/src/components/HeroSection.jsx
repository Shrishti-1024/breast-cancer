// src/components/HeroSection.jsx

import React from "react";
import "./HeroSection.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-wrapper">

      {/* HERO BANNER */}
      <div className="hero-banner">

        <div className="hero-overlay" />

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Healthcare for Good <br />
            Today. Tomorrow. Always
          </h1>
        </motion.div>

      </div>


      {/* SERVICE GRID */}
      <div className="hero-services">

        <div className="services-grid">
           <Link to="/book-appointment" className="service-card appointment">
          <div className="service-card appointment">
            <div className="icon">📅</div>
            <div>
              <h3>Book an Appointment</h3>
              <p>With country's leading experts</p>
            </div>
          </div>
          </Link>
           <Link to="/gorakhpur-specialists" className="service-card appointment">
          <div className="service-card hospital">
            <div className="icon">🏥</div>
            <div>
              <h3>Hospitals</h3>
              <p>Health needs under one roof</p>
            </div>
          </div>
          </Link>

          <div className="service-card speciality">
            <div className="icon">🫀</div>
            <div>
              <h3>Specialities</h3>
              <p>Our expertise in Healthcare</p>
            </div>
          </div>

          <div className="service-card doctors">
            <div className="icon">👨‍⚕️</div>
            <div>
              <h3>Doctors</h3>
              <p>Top experts for your health</p>
            </div>
          </div>

        </div>


        {/* RIGHT SIDE PANEL */}

        <div className="booking-panel">

          <h2>We can help you book</h2>

          <div className="booking-cards">

            <div className="booking-card">
              <div className="booking-icon">🩺</div>
              <p>Health Checkups</p>
            </div>

            <div className="booking-card">
              <div className="booking-icon">🧪</div>
              <p>Tests & Services</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}