import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import handleWithLoveAnimation from '../assets/lottie/HandlewithLove.json';
import './ActionPage.scss';

const Donate = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className={`action-page ${isVisible ? 'fade-in' : ''}`}>
      <div className="content-wrapper">

        {/* Lottie Animation */}
        <div className="animation-box">
          <Lottie animationData={handleWithLoveAnimation} loop={true} />
        </div>

        {/* Donation Form */}
        <div className="form-box">
          <h1 className="page-title">Make a Difference ❤️</h1>
          <p className="page-desc">
            Every contribution helps us provide free breast cancer screenings, awareness programs, and AI-based research.  
            We believe in complete transparency — your donation goes directly to patient support and awareness campaigns.
          </p>

          {/* Secure Badge */}
          <div className="trust-badge">
            🔒 100% Secure • We never store your payment details.
          </div>

          <form className="action-form">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="number" placeholder="Donation Amount (₹)" min="1" required />
            <select>
              <option value="one-time">One-Time</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button type="submit">Donate Now</button>
          </form>

          {/* Transparency Note */}
          <p className="small-note">
            ✅ This donation form is official and secure. Funds are used only for breast cancer awareness and patient support programs.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Donate;
