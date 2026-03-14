import React from 'react';
import './FeaturesAndBenefits.scss';
import { FaMicroscope, FaClock, FaHeartbeat, FaUserMd, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaMicroscope />,
    title: 'AI-Powered Detection',
    description: 'Advanced machine learning algorithms analyze ultrasound images with high precision, enhancing early diagnosis accuracy.',
  },
  {
    icon: <FaClock />,
    title: 'Instant Results',
    description: 'No waiting for reports. Get real-time feedback with probability scores, helping users make quick decisions.',
  },
  {
    icon: <FaHeartbeat />,
    title: 'Health Tracking',
    description: 'Maintain records and track predictions over time to monitor health progression and anomalies.',
  },
  {
    icon: <FaUserMd />,
    title: 'Doctor Connectivity',
    description: 'Easily connect with nearby specialists or screening camps after a prediction result for prompt follow-up.',
  },
  {
    icon: <FaLightbulb />,
    title: 'Personalized Advice',
    description: 'Get custom wellness tips, early symptom indicators, and guidance based on your prediction output.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Data Privacy',
    description: 'All your medical data and scans are encrypted and securely stored. We respect your health privacy.',
  },
];

const FeaturesAndBenefits = () => {
  return (
    <section className="features-section">
      <div className="features-header">
        <h2>Features & Benefits</h2>
        <p>Explore how our AI-based system can empower you with fast, private, and personalized breast health support.</p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesAndBenefits;
