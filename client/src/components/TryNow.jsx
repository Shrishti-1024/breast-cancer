import React from 'react';
import './TryNow.scss';
import { Link } from 'react-router-dom';

export default function TryNow() {
  return (
    <section className="try-now">
      <div className="try-container">
        <h2>Start Your Scan</h2>
        <p>Upload your breast ultrasound image and let our AI analyze it in seconds.</p>

        <div className="upload-area">
          <input type="file" accept="image/*" />
          <button className="analyze-btn">Analyze Now</button>
        </div>

        <div className="note">
          <p><strong>Note:</strong> Your image is not stored. All processing happens securely in your browser.</p>
        </div>

        <Link to="/upload" className="goto-upload">Want advanced scan? Go to Full Upload Page →</Link>
      </div>
    </section>
  );
}
