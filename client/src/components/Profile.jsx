import React, { useEffect, useState, useRef } from "react";
import "./Profile.scss";
import {
  FaUserCircle,
  FaEnvelope,
  FaSignOutAlt,
  FaEdit,
  FaCamera,
} from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [stats, setStats] = useState(null);
  const [patient, setPatient] = useState(null);

  const fileInputRef = useRef(null);

  // Load user, avatar, stats & patient data
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const storedAvatar = localStorage.getItem("userAvatar");
    const storedPatient = JSON.parse(localStorage.getItem("patientProfile"));
    let storedStats = JSON.parse(localStorage.getItem("userStats"));

    if (storedUser) setUser(storedUser);
    if (storedAvatar) setAvatar(storedAvatar);
    if (storedPatient) setPatient(storedPatient);

    if (!storedStats) {
      storedStats = {
        registeredAt: new Date().toISOString(),
        totalPredictions: 0,
        reportsDownloaded: 0,
      };
      localStorage.setItem("userStats", JSON.stringify(storedStats));
    }

    setStats(storedStats);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("patientProfile");
    window.location.href = "/login";
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Please upload an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imgData = reader.result;
      setAvatar(imgData);
      localStorage.setItem("userAvatar", imgData);
      window.dispatchEvent(new Event("userAvatarChange"));
    };
    reader.readAsDataURL(file);
  };

  const formatMonthYear = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  const formatNormalDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US");

  if (!user) {
    return (
      <div className="profile-loading">
        <h2>Loading your profile...</h2>
      </div>
    );
  }

  const firstName = user.name?.split(" ")[0] || "User";

  return (
    <div className="profile-page">
      <div className="profile-gradient-bg" />

      <div className="profile-shell">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="brand">
            <span className="brand-logo">💗</span>
            <span className="brand-name">HerHealth AI</span>
          </div>

          <div className="sidebar-user">
            <div className="avatar-wrapper" onClick={handleAvatarClick}>
              {avatar ? (
                <img src={avatar} alt="Profile" className="avatar-img" />
              ) : (
                <FaUserCircle className="avatar-icon" />
              )}
              <button className="avatar-edit" type="button">
                <FaCamera />
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                hidden
              />
            </div>

            <div>
              <h3>{user.name}</h3>
              <p className="sidebar-email">{user.email}</p>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </aside>

        {/* Main Section */}
        <main className="profile-main">
          <header className="profile-header">
            <div>
              <p className="profile-greeting">Dashboard</p>
              <h2>
                Welcome back, <span>{firstName}</span> 💖
              </h2>
              <p className="profile-subtitle">
                Your health, your data, your space.
              </p>
            </div>

            <button className="edit-btn">
              <FaEdit /> Edit Profile
            </button>
          </header>

          {/* Stats */}
          <section className="profile-top-cards">
            <div className="glass-card highlight-card">
              <h4>Account Status</h4>
              <p className="status-pill active">Active</p>
              <span className="status-caption">You're all set and secure.</span>
            </div>

            <div className="glass-card">
              <h4>Member Since</h4>
              <p className="big-number">
                {stats ? formatMonthYear(stats.registeredAt) : "--"}
              </p>
              <span className="status-caption">Thank you for being with us.</span>
            </div>

            <div className="glass-card">
              <h4>Total Predictions</h4>
              <p className="big-number">{stats?.totalPredictions ?? 0}</p>
            </div>

            <div className="glass-card">
              <h4>Reports Downloaded</h4>
              <p className="big-number">{stats?.reportsDownloaded ?? 0}</p>
            </div>
          </section>

          {/* Account Info */}
          <section className="profile-details">
            <h3 className="section-heading">Account Information</h3>

            <div className="detail-card">
              <span className="detail-label">Full Name</span>
              <p className="detail-value">{user.name}</p>
            </div>

            <div className="detail-card">
              <span className="detail-label">Email Address</span>
              <div className="detail-with-icon">
                <FaEnvelope />
                <p className="detail-value">{user.email}</p>
              </div>
            </div>
          </section>

          {/* Health Info */}
          {patient && (
            <section className="profile-details">
              <h3 className="section-heading">Health Details</h3>

              <div className="detail-card">
                <span className="detail-label">Age</span>
                <p className="detail-value">{patient.age ?? "Not provided"}</p>
              </div>

              <div className="detail-card">
                <span className="detail-label">Gender</span>
                <p className="detail-value">{patient.gender}</p>
              </div>

              <div className="detail-card">
                <span className="detail-label">City</span>
                <p className="detail-value">{patient.city || "Not provided"}</p>
              </div>

              <div className="detail-card">
                <span className="detail-label">Marital Status</span>
                <p className="detail-value">
                  {patient.maritalStatus || "Not provided"}
                </p>
              </div>

              <div className="detail-card">
                <span className="detail-label">Family History</span>
                <p className="detail-value">
                  {patient.familyHistory || "Not provided"}
                </p>
              </div>

              {/* Menstrual */}
              {patient.gender === "female" && (
                <>
                  <div className="detail-card">
                    <span className="detail-label">Age at First Period</span>
                    <p className="detail-value">
                      {patient.menarcheAge || "Not provided"}
                    </p>
                  </div>

                  <div className="detail-card">
                    <span className="detail-label">Last Period Date</span>
                    <p className="detail-value">
                      {patient.lastPeriodDate
                        ? formatNormalDate(patient.lastPeriodDate)
                        : "Not provided"}
                    </p>
                  </div>
                </>
              )}

              {/* Pregnancy */}
              {(patient.maritalStatus === "married" ||
                patient.maritalStatus === "widowed") && (
                <>
                  <div className="detail-card">
                    <span className="detail-label">Ever Pregnant?</span>
                    <p className="detail-value">
                      {patient.everPregnant || "Not provided"}
                    </p>
                  </div>

                  {patient.everPregnant === "yes" && (
                    <>
                      <div className="detail-card">
                        <span className="detail-label">Pregnancies</span>
                        <p className="detail-value">
                          {patient.pregnanciesCount}
                        </p>
                      </div>

                      <div className="detail-card">
                        <span className="detail-label">Children</span>
                        <p className="detail-value">
                          {patient.childrenCount}
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Symptoms */}
              <div className="detail-card full">
                <span className="detail-label">Symptoms</span>
                <p className="detail-value">
                  {patient.symptoms || "None reported"}
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
