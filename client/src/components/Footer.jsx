// src/components/Footer.jsx
import React from "react";
import "./Footer.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h3>HerHealth AI</h3>
          <p>
            Empowering early breast cancer detection through AI technology and
            awareness.
          </p>
        </div>

        {/* Page Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/upload">Upload Scan</Link>
            </li>
            <li>
              <Link to="/tips">Tips &amp; Care</Link>
            </li>
            <li>
              <Link to="/find-doctor">Find Doctors</Link>
            </li>
            <li>
              <Link to="/free-camps">Free Camps</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="footer-socials">
          <h4>Connect with Us</h4>
          <div className="social-icons">
            <a
              href="#"
              aria-label="Visit HerHealth AI on Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Visit HerHealth AI on Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="Visit HerHealth AI on Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Visit HerHealth AI on LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} HerHealth AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
