// WishTree.jsx
import React, { useEffect, useState } from 'react';
import './WishTree.scss';

const sampleWishes = [
  "I wish for healing and strength 💪",
  "May I stay strong and calm 💗",
  "I hope for a healthy tomorrow 🌞",
  "Wishing courage to all fighters 🎀",
];

const WishTree = ({ onComplete }) => {
  const [wish, setWish] = useState('');
  const [bloomed, setBloomed] = useState(false);
  const [floatingWishes, setFloatingWishes] = useState([]);

  useEffect(() => {
    const lastShown = localStorage.getItem('wishTreeLastShown');
    const now = new Date();
    if (lastShown && new Date(lastShown).toDateString() === now.toDateString()) {
      onComplete();
    }
    localStorage.setItem('wishTreeLastShown', now.toISOString());
    const shuffled = [...sampleWishes].sort(() => 0.5 - Math.random());
    setFloatingWishes(shuffled.slice(0, 3));
  }, []);

  const handleSubmit = () => {
    if (wish.trim()) {
      setBloomed(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  };

  return (
    <div className="wish-tree-container">
      <div className="tree-background">
        <div className={`wish-form ${bloomed ? 'hidden' : ''}`}>
          <h2>🌳 Luna’s Wish Tree</h2>
          <p>Write your wish for strength, healing, or courage 💖</p>
          <input
            type="text"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="Your wish..."
          />
          <button onClick={handleSubmit}>Make a Wish 🌸</button>
        </div>

        {bloomed && <div className="bloom-animation">🌸 Your flower is blooming!</div>}

        {floatingWishes.map((w, i) => (
          <div className={`floating-wish float${i}`} key={i}>
            {w}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishTree;
