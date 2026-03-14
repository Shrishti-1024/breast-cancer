import React from 'react';

function Dashboard() {
  const username = localStorage.getItem("username"); // optional if stored during login

  return (
    <div style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>
      <h1>Welcome, {username || "User"} 💖</h1>
      <p>This is your personalized dashboard. You can upload scans, track results, and explore care tips.</p>
    </div>
  );
}

export default Dashboard;