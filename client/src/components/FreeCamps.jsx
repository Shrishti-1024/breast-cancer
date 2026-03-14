import React, { useEffect, useState } from "react";
import "./FreeCamps.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import medicalAnimation from "../assets/lottie/MedicalSession.json";
import {
  requestFCMPermission,
  listenForMessages,
} from "../firebase/firebase-messaging";

const campsData = [
  {
    city: "Mumbai",
    date: "2025-07-24",
    hospital: "Nanavati Hospital",
    address: "S.V. Road, Vile Parle West, Mumbai, Maharashtra 400056",
    time: "10 AM – 4 PM",
    registrationUrl: "https://nanavatihospital.org/registration",
  },
  {
    city: "Pune",
    date: "2025-07-27",
    hospital: "Sahyadri Hospital",
    address: "Sinhgad Rd, Deccan Gymkhana, Pune, Maharashtra 411004",
    time: "9 AM – 3 PM",
    registrationUrl: "https://sahyadrihospital.com/registration",
  },
  {
    city: "Bengaluru",
    date: "2025-07-30",
    hospital: "St. John's Medical College",
    address: "Koramangala, Bengaluru, Karnataka 560034",
    time: "11 AM – 5 PM",
    registrationUrl: "https://stjohns.in/registration",
  },
  {
    city: "Gorakhpur",
    date: null,
    hospital: null,
    address: null,
    time: null,
    registrationUrl: null,
  },
];

export default function FreeCamps() {
  const [notificationsAllowed, setNotificationsAllowed] = useState(false);
  const [gorakhpurCamp, setGorakhpurCamp] = useState(null);

  useEffect(() => {
    // notification state
    if (Notification.permission === "granted") {
      setNotificationsAllowed(true);
    }

    // Gorakhpur camp status
    const today = new Date();
    const gorakhpur = campsData.find(
      (c) => c.city.toLowerCase() === "gorakhpur"
    );

    if (gorakhpur && gorakhpur.date) {
      const campDate = new Date(gorakhpur.date);
      if (campDate >= today) {
        setGorakhpurCamp(gorakhpur);
        if (Notification.permission === "granted") {
          notifyUser(gorakhpur);
        }
      } else {
        setGorakhpurCamp(null);
      }
    } else {
      setGorakhpurCamp(null);
    }

    listenForMessages();
  }, []);

  const notifyUser = (camp) => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
      new Notification("Upcoming Breast Cancer Screening Camp in Gorakhpur!", {
        body: `${camp.hospital} on ${formatDate(
          camp.date
        )}. Don't forget to register!`,
        icon: "/favicon.ico",
      });
    }
  };

  const requestNotificationPermission = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }

    Notification.requestPermission().then((permission) => {
      setNotificationsAllowed(permission === "granted");

      if (permission === "granted") {
        requestFCMPermission().then((token) => {
          if (token) {
            fetch("/store-fcm-token", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token }),
            });
          }
        });

        if (gorakhpurCamp) {
          notifyUser(gorakhpurCamp);
        }
      }
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <section className="free-camps">
      <div className="container">
        <div className="header-section">
          <h2>Free Breast Cancer Screening Camps</h2>
          <Player
            autoplay
            loop
            src={medicalAnimation}
            style={{ height: "180px", width: "180px" }}
            className="lottie-animation"
          />
          <p className="intro">
            Join our citywide awareness movement with free breast cancer
            screenings, expert guidance, and educational sessions. Early
            detection saves lives.
          </p>
        </div>

        <div className="camp-list">
          {campsData
            .filter((c) => c.city.toLowerCase() !== "gorakhpur")
            .map((camp, idx) => (
              <div className="camp-card" key={idx}>
                <h3>
                  📍 {camp.city} | {formatDate(camp.date)}
                </h3>
                <p>
                  <strong>{camp.hospital}</strong>
                  <br />
                  {camp.address}
                </p>
                <p>🕒 Time: {camp.time}</p>
                <a
                  href={camp.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="register-btn"
                  aria-label={`Register for camp at ${camp.hospital} in ${camp.city}`}
                >
                  Register Now
                </a>
              </div>
            ))}
        </div>

        <div className="gorakhpur-section">
          <h3>📍 Gorakhpur Camp Status</h3>
          {gorakhpurCamp ? (
            <>
              <p>
                Upcoming camp at <strong>{gorakhpurCamp.hospital}</strong> on{" "}
                <strong>{formatDate(gorakhpurCamp.date)}</strong>.
              </p>
              <a
                href={gorakhpurCamp.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="register-btn secondary"
                aria-label="Register for Gorakhpur camp"
              >
                Register Now
              </a>
            </>
          ) : (
            <p className="gorakhpur-empty">
              There are currently no breast cancer screening camps scheduled in
              Gorakhpur. Stay tuned for upcoming camps in your city!
            </p>
          )}

          {!notificationsAllowed && (
            <button
              className="notify-btn"
              onClick={requestNotificationPermission}
              aria-label="Allow notifications for Gorakhpur camps"
            >
              Enable Notifications for Gorakhpur Camps
            </button>
          )}

          {notificationsAllowed && (
            <p className="notify-info">
              Notifications enabled! You will be alerted when a Gorakhpur camp
              is scheduled.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
