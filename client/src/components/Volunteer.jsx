import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import neverAloneAnimation from '../assets/lottie/NeverAlone.json';
import './ActionPage.scss';

const Volunteer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className={`action-page ${isVisible ? 'fade-in' : ''}`}>
      <div className="content-wrapper">
        
        {/* Lottie Animation */}
        <div className="animation-box">
          <Lottie animationData={neverAloneAnimation} loop={true} />
        </div>

        {/* Form Section */}
        <div className="form-box">
          <h1 className="page-title">Volunteer With Us</h1>
          <p className="page-desc">
            Join our passionate team of volunteers working to increase breast cancer awareness 
            and provide support during screening camps. Fill out the form below to register as a volunteer.
          </p>
          <form className="action-form">
            <input type="text" placeholder="Your Name" className="fade-input" />
            <input type="email" placeholder="Email Address" className="fade-input" />
            <textarea placeholder="Why do you want to volunteer?" className="fade-input"></textarea>
            <button type="submit" className="fade-input">Submit</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Volunteer;
