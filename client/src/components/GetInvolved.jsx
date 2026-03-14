import React from 'react';
import './GetInvolved.scss';
import { FaHandsHelping, FaDonate, FaBullhorn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const actions = [
  {
    icon: <FaHandsHelping />,
    title: 'Volunteer with Us',
    description: 'Join our mission to spread awareness and assist in breast cancer screening camps across various cities.',
    link: '/volunteer',
  },
  {
    icon: <FaDonate />,
    title: 'Make a Donation',
    description: 'Support our AI research, screenings, and community programs with a one-time or recurring donation.',
    link: '/donate',
  },
  {
    icon: <FaBullhorn />,
    title: 'Spread the Word',
    description: 'Share our platform on social media and help reach more women who can benefit from early diagnosis.',
    link: '/share',
  },
];

const GetInvolved = () => {
  return (
    <section className="get-involved-section">
      <h2>Get Involved</h2>
      <p className="subtitle">Every action counts in the fight against breast cancer</p>
      <div className="involve-cards">
        {actions.map((item, index) => (
          <div className="involve-card" key={index}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link to={item.link}>
              <button className="cta-button">Join Now</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetInvolved;
