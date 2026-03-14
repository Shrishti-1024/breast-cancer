import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: data.user?.name || "User",
            email: data.user?.email || formData.email,
          })
        );

        setSuccess("Login successful. Redirecting to your dashboard...");

        setTimeout(() => {
          window.location.href = "/profile";
        }, 1500);
      } else {
        setError(data.msg || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      {/* animated background layer */}
      <div className="login-bg-layer" />

      <div className="login-shell">
        {/* Left hero text */}
        <motion.div
          className="login-hero"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Welcome back to HerHealth AI</h1>
          <p className="hero-subtitle">
            Sign in to view your profile, track past scans, and access
            personalised breast-health guidance powered by AI.
          </p>

          <ul className="hero-bullets">
            <li>Secure upload & storage of ultrasound scans</li>
            <li>Instant AI analysis summaries</li>
            <li>Trusted information and doctor-connect tools</li>
          </ul>
        </motion.div>

        {/* Right login card */}
        <motion.div
          className="login-card"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2>Sign in</h2>
          <p className="card-subtitle">
            Use your registered email and password to continue.
          </p>

          {error && <div className="message error">{error}</div>}
          {success && <div className="message success">{success}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
                autoComplete="email"
              />
              <label>Email</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder=" "
                autoComplete="current-password"
              />
              <label>Password</label>
            </div>

            <div className="form-meta">
              <Link to="/forgot-password" className="link-ghost">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              className="login-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </form>

          <div className="extra">
            Don’t have an account?{" "}
            <Link to="/signup" className="link-strong">
              Create one
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
