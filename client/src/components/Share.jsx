import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegCopy } from 'react-icons/fa';
import doveAnimation from '../assets/lottie/DovewithPinkRibbon.json';
import './ActionPage.scss';

const Share = () => {
  const [copied, setCopied] = useState(false);

  const message =
    "🌸 Check out HerHealth AI – a powerful tool for early breast cancer detection. 💖 Learn more and get involved! 👉 www.herhealthai.org";

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent("https://www.herhealthai.org");
    const text = encodeURIComponent(message);

    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div className="action-page">
      <div className="content-wrapper">
        
        {/* Animation */}
        <div className="animation-box floating-animation">
          <Lottie animationData={doveAnimation} loop={true} />
        </div>

        {/* Content */}
        <div className="form-box">
          <h1 className="page-title">Spread the Word</h1>
          <p className="page-desc">
            Help us reach more people by sharing our platform with your network.
            Together, we can raise awareness and save lives.
          </p>

          {/* Share Message Box */}
          <div className="share-box fancy-share-box">
            <textarea readOnly value={message} />
            <button className="copy-btn" onClick={handleCopy}>
              <FaRegCopy /> {copied ? 'Copied!' : 'Copy Message'}
            </button>
          </div>

          {/* Social Buttons */}
          <div className="social-buttons">
            <button onClick={() => handleShare('facebook')} className="social-btn facebook">
              <FaFacebookF /> Share on Facebook
            </button>
            <button onClick={() => handleShare('twitter')} className="social-btn twitter">
              <FaTwitter /> Share on Twitter
            </button>
            <button onClick={() => handleShare('linkedin')} className="social-btn linkedin">
              <FaLinkedinIn /> Share on LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
