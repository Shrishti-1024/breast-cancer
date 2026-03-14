import React from 'react';
import './Testimonials.scss';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Anjali Verma',
    role: 'Breast Cancer Survivor',
    quote:
      'This app saved my life. I uploaded my scan, and it detected an issue that my local clinic missed. I got treatment just in time!',
    location: 'Delhi, India',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Priya Sharma',
    role: 'Early Diagnosed Patient',
    quote:
      'I was nervous at first, but the prediction system was easy to use and accurate. I highly recommend it for early detection!',
    location: 'Mumbai, India',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Health Enthusiast',
    quote:
      'The personalized advice helped me adopt healthier habits and monitor changes. It gives peace of mind.',
    location: 'Bangalore, India',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <p className="subtitle">Real stories from real people who trusted our system</p>
      <div className="testimonial-cards">
        {testimonials.map((user, index) => (
          <div className="testimonial-card" key={index}>
            <FaQuoteLeft className="quote-icon" />
            <p className="quote">"{user.quote}"</p>
            <div className="user">
              <img src={user.img} alt={user.name} />
              <div>
                <h4>{user.name}</h4>
                <p className="role">{user.role}</p>
                <p className="location">{user.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
