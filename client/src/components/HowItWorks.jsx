import React from 'react';
import './HowItWorks.scss';
import { FaUpload, FaBrain, FaHeartbeat, FaLightbulb, FaUserMd } from 'react-icons/fa';

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaUpload />,
      title: 'Upload Ultrasound Image',
      description:
        'Upload a clear ultrasound scan of the breast area to detect early signs of cancer using AI.',
    },
    {
      icon: <FaBrain />,
      title: 'AI Analyzes the Scan',
      description:
        'AI algorithm checks the scan and detects patterns that may indicate cancerous cells.',
    },
    {
      icon: <FaHeartbeat />,
      title: 'Instant Prediction Result',
      description:
        'Get real-time results showing if the case is benign or malignant, with probability scores.',
    },
    {
      icon: <FaLightbulb />,
      title: 'Get Personalized Tips',
      description:
        'Receive lifestyle tips, early warnings, and health advice personalized to your report.',
    },
    {
      icon: <FaUserMd />,
      title: 'Find Doctors & Free Camps',
      description:
        'Locate cancer specialists or join free breast cancer screening camps nearby.',
    },
  ];

  return (
    <div className="how-it-works-container">
      <h2 className="main-heading">How It Works</h2>
      <p className="sub-text">
        Explore how our AI-based system can empower you with fast, private, and personalized breast health support.
      </p>
      <div className="steps-with-arrows">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="card">
              <div className="icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {index < steps.length - 1 && <div className="arrow">➜</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}


