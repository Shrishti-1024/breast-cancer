import React, { useState } from "react";
import "./Register.scss";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    city: "",
    maritalStatus: "",
    familyHistory: "",
    symptoms: "",

    // menstrual history
    menarcheAge: "",
    periodsRegular: "",
    lastPeriodDate: "",

    // pregnancy history
    everPregnant: "",
    pregnanciesCount: "",
    childrenCount: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/patients/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      // ✅ store patientId for future scan/report linking
      localStorage.setItem("patientId", data.patientId);

      // ✅ initialize stats if not present
      if (!localStorage.getItem("userStats")) {
        localStorage.setItem(
          "userStats",
          JSON.stringify({
            registeredAt: new Date().toISOString(),
            totalPredictions: 0,
            reportsDownloaded: 0,
            selfCareActions: 0,
          })
        );
      }

      window.location.href = "/upload";
    } catch (err) {
      alert("Unable to connect to server. Please try again.");
      setLoading(false);
    }
  };

  const isFemale = form.gender === "female";
  const showPregnancy =
    isFemale &&
    (form.maritalStatus === "married" || form.maritalStatus === "widowed");

  return (
    <section className="patient-register">
      <div className="form-card">
        <span className="eyebrow">Patient Registration</span>
        <h2>Basic health details</h2>
        <p className="subtitle">
          These details help doctors and AI give you better, more accurate care.
          You may skip anything you’re uncomfortable sharing.
        </p>

        <form onSubmit={handleSubmit}>
          {/* BASIC DETAILS */}
          <div className="grid">
            <label>
              Full Name *
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Age *
              <input
                type="number"
                name="age"
                min="1"
                value={form.age}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Gender *
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label>
              Phone Number *
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email (optional)
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label>
              City
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </label>

            <label>
              Marital Status
              <select
                name="maritalStatus"
                value={form.maritalStatus}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
              </select>
            </label>

            <label>
              Family history of breast cancer?
              <select
                name="familyHistory"
                value={form.familyHistory}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unknown">Not sure</option>
              </select>
            </label>
          </div>

          {/* MENSTRUAL HISTORY */}
          {isFemale && (
            <>
              <h4 className="section-title">Menstrual History</h4>
              <div className="grid">
                <label>
                  Age at first period
                  <input
                    type="number"
                    name="menarcheAge"
                    value={form.menarcheAge}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Are your periods regular?
                  <select
                    name="periodsRegular"
                    value={form.periodsRegular}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>

                <label>
                  Date of last period
                  <input
                    type="date"
                    name="lastPeriodDate"
                    value={form.lastPeriodDate}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </>
          )}

          {/* PREGNANCY HISTORY */}
          {showPregnancy && (
            <>
              <h4 className="section-title">Pregnancy History</h4>
              <div className="grid">
                <label>
                  Ever been pregnant?
                  <select
                    name="everPregnant"
                    value={form.everPregnant}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>

                {form.everPregnant === "yes" && (
                  <>
                    <label>
                      Number of pregnancies
                      <input
                        type="number"
                        name="pregnanciesCount"
                        value={form.pregnanciesCount}
                        onChange={handleChange}
                      />
                    </label>

                    <label>
                      Number of children
                      <input
                        type="number"
                        name="childrenCount"
                        value={form.childrenCount}
                        onChange={handleChange}
                      />
                    </label>
                  </>
                )}
              </div>
            </>
          )}

          {/* SYMPTOMS */}
          <label className="full">
            Current symptoms (if any)
            <textarea
              name="symptoms"
              rows="3"
              value={form.symptoms}
              onChange={handleChange}
              placeholder="Pain, lump, discharge, or anything unusual"
            />
          </label>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>

        <p className="note">
          🔒 Your information is private and used only for medical care.
        </p>
      </div>
    </section>
  );
}
