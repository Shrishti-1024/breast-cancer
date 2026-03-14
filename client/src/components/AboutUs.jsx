import React, { useState, useEffect } from "react";
import "./AboutUs.scss";
import Lottie from "lottie-react";
import contactUsAnimation from "../assets/lottie/ContactUs.json";
import missionAnimation from "../assets/lottie/Mission.json";
import privacyAnimation from "../assets/lottie/Privacy.json";

// A reusable Counter component for the number animation
const Counter = ({ endValue, duration }) => {
  const [count, setCount] = useState(0);
  const startValue = 0;
  const increment = endValue / (duration * 60); // Assuming 60 frames per second

  useEffect(() => {
    let currentCount = startValue;
    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= endValue) {
        setCount(endValue);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(currentCount));
      }
    }, 1000 / 60); // Update roughly every 16ms for 60fps

    return () => clearInterval(interval);
  }, [endValue, increment, startValue]);

  return <span>{count.toLocaleString()}</span>;
};

export default function AboutUs() {
  // State to manage hover on cards for icon animation
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      icon: "👥",
      title: "Our Team",
      text: "Developers, doctors, and data scientists committed to using technology for real-world impact.",
    },
    {
      icon: "💡",
      title: "Our Approach",
      text: "We combine human expertise with cutting-edge AI to provide comprehensive, reliable insights.",
    },
    {
      icon: "📈",
      title: "Future Vision",
      text: "Partner with NGOs & hospitals to provide real-time screening in underserved areas.",
    },
    {
      icon: "🤝",
      title: "Community Impact",
      text: "Our mission extends beyond technology—we aim to build a community of support and awareness.",
    },
  ];

  return (
    <section className="about-us-section">
      {/* 🌠 Hero Banner with Gradient & Wave */}
      <div className="intro-banner">
        <h1>About Us</h1>
        <p>Empowering early detection with technology and compassion.</p>
        <div className="wave"></div>
      </div>

      <div className="container">
        {/* 🚀 Our Mission Section */}
        <div className="mission-section">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              Harness AI & ML to improve early detection, enable faster diagnosis,
              and make healthcare more accessible. We are dedicated to creating a
              future where every individual has access to timely and accurate health
              information, regardless of their location or socioeconomic status.
            </p>
          </div>
          <div className="mission-animation">
            <Lottie
              animationData={missionAnimation}
              loop={true}
              autoplay={true}
              style={{ width: "100%", maxWidth: "350px", height: "auto" }}
            />
          </div>
        </div>

        {/* 📊 Enhanced Stats Section */}
        <div className="stats-section">
          <div className="stat">
            <h3><Counter endValue={10000} duration={2} />+</h3>
            <p>
              <span className="stat-icon">📈</span> Scans Analyzed
            </p>
          </div>
          <div className="stat">
            <h3><Counter endValue={25} duration={2} />+</h3>
            <p>
              <span className="stat-icon">👩‍⚕️</span> Medical Experts
            </p>
          </div>
          <div className="stat">
            <h3><Counter endValue={15} duration={2} />+</h3>
            <p>
              <span className="stat-icon">🤝</span> Global Partnerships
            </p>
          </div>
        </div>

        {/* 🎯 Cards Grid with Animations */}
        <div className="card-grid">
          {cards.map((item, i) => (
            <div
              className={`card ${hoveredCard === i ? 'hovered' : ''}`}
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="icon">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        
        {/* 🌟 Why It Matters Section with Contact Us Lottie animation */}
        <div className="why-section">
          <div className="why-text">
            <h2>Why It Matters</h2>
            <p>
              Breast cancer detected early can save thousands of lives. Our
              platform empowers users with instant scan analysis, guidance, and
              trusted connections to doctors. We blend compassion with
              technology to make healthcare more human.
            </p>
          </div>
          <div className="why-animation">
            <Lottie
              animationData={contactUsAnimation}
              loop={true}
              autoplay={true}
              style={{ width: "100%", maxWidth: "420px", height: "auto" }}
            />
          </div>
        </div>

        {/* 🔒 Dedicated Privacy Section with Privacy Lottie animation */}
        <div className="privacy-section">
          <div className="privacy-animation">
            <Lottie
              animationData={privacyAnimation}
              loop={true}
              autoplay={true}
              style={{ width: "100%", maxWidth: "420px", height: "auto" }}
            />
          </div>
          <div className="privacy-text">
            <h2>Privacy & Ethics</h2>
            <p>
              Your data stays yours—encrypted, never stored permanently, and
              fully compliant with the highest privacy standards. We are
              committed to ethical AI development and transparent practices.
            </p>
          </div>
        </div>

        {/* 🚀 New Founder's Message Section */}
        <div className="founder-section">
          <div className="founder-img">
            <img src="https://i.pravatar.cc/150?img=12" alt="Founder's name" />
          </div>
          <div className="founder-text">
            <h2>A Message from Our Founder</h2>
            <p>
              "We started this journey with a single purpose: to use our skills
              to make a tangible difference. We believe that technology should
              be a tool for good, and by democratizing access to early
              detection, we can help build a healthier, more hopeful future for
              everyone. This isn't just a platform; it's our promise."
            </p>
            <p className="founder-name">- Rahul Verma, Lead Developer & Founder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
