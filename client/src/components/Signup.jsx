import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Signup.scss";

const LottiePlayer = ({ src, style }) => (
  <div
    style={{
      ...style,
      backgroundImage: `url(${src})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  />
);

LottiePlayer.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
};

function Signup() {
  const signupAnimationUrl =
    "https://assets10.lottiefiles.com/packages/lf20_qg1t4b3l.json";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Signup successful. Redirecting to login...");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(
          data.msg || data.message || data.error || "Something went wrong."
        );
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server not reachable. Please check backend connection.");
    }
  };

  return (
    <div className="signup-page">
      {/* animated background layer */}
      <div className="signup-bg-layer" />

      <div className="signup-shell">
        {/* Left: hero text + visual */}
        <motion.div
          className="signup-hero"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Create your HerHealth AI account</h1>
          <p className="hero-subtitle">
            Get a secure space to upload ultrasound scans, receive AI-assisted
            indicators, and keep your breast-health information organised.
          </p>

          <ul className="hero-bullets">
            <li>No cost for basic scan analysis</li>
            <li>Privacy-first, encrypted communication</li>
            <li>Tools to support conversations with your doctor</li>
          </ul>

          <div className="hero-visual">
            <LottiePlayer src={signupAnimationUrl} style={{ height: "170px" }} />
          </div>
        </motion.div>

        {/* Right: signup card */}
        <motion.div
          className="signup-card"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2>Sign up</h2>
          <p className="card-subtitle">
            It only takes a minute to get started.
          </p>

          {error && <div className="message error">{error}</div>}
          {success && <div className="message success">{success}</div>}

          <form onSubmit={handleSignup} className="signup-form">
            <div className="form-group">
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="fullName">Full Name</label>
            </div>

            <div className="form-group">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="email">Email Address</label>
            </div>

            <div className="form-group">
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="form-group">
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>

            <motion.button
              type="submit"
              className="signup-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create account
            </motion.button>
          </form>

          <div className="extra">
            Already have an account?{" "}
            <Link to="/login" className="link-strong">
              Login here
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
