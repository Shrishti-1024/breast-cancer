import React, { useEffect, useState } from "react";
import "./TipsAndCare.scss";

const STORAGE_KEYS = {
  COMPLETED: "completedTips",
  STATS: "userStats",
  LAST_REMINDER: "lastCareReminder",
};

export default function TipsAndCare() {
  const tips = [
    {
      title: "Perform Monthly Self-Exams",
      text: "Spend 5 minutes noticing how your breasts normally look and feel. Familiarity helps you spot changes early.",
      img: "https://t4.ftcdn.net/jpg/05/03/84/65/360_F_503846594_JL9pbEO09Ezy7hPYH3YNSFYLCiwwBnFE.jpg",
    },
    {
      title: "Maintain a Healthy Lifestyle",
      text: "A 10–15 minute walk today counts. Consistency matters more than intensity.",
      img: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
    },
    {
      title: "Limit Alcohol & Avoid Smoking",
      text: "Skipping alcohol even once a week lowers long-term breast cancer risk.",
      img: "https://cdn-icons-png.flaticon.com/512/2542/2542566.png",
    },
    {
      title: "Schedule Clinical Screenings",
      text: "Booking a screening—even weeks ahead—is a powerful act of self-care.",
      img: "https://cdn-icons-png.flaticon.com/512/2976/2976390.png",
    },
    {
      title: "Know Your Family History",
      text: "Knowing your family history helps doctors personalize screening plans.",
      img: "https://cdn-icons-png.flaticon.com/512/3524/3524646.png",
    },
    {
      title: "Reduce Stress & Sleep Well",
      text: "One calm moment today—breathing, stretching, rest—supports your immune system.",
      img: "https://cdn-icons-png.flaticon.com/512/2010/2010850.png",
    },
  ];

  const [completedTips, setCompletedTips] = useState({});
  const [streak, setStreak] = useState(0);

  /* -------------------- INIT -------------------- */
  useEffect(() => {
    const storedCompleted =
      JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED)) || {};
    setCompletedTips(storedCompleted);
    calculateStreak(storedCompleted);
    showDailyReminder();
  }, []);

  /* -------------------- HELPERS -------------------- */
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  const calculateStreak = (data) => {
    const dates = Object.values(data);
    if (dates.includes(today)) {
      if (dates.includes(yesterday)) setStreak((prev) => prev + 1);
      else setStreak(1);
    }
  };

  const updateProfileStats = () => {
    let stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS));
    if (!stats) {
      stats = {
        registeredAt: new Date().toISOString(),
        totalPredictions: 0,
        reportsDownloaded: 0,
        selfCareActions: 0,
      };
    }
    stats.selfCareActions += 1;
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  };

  const showDailyReminder = () => {
    const last = localStorage.getItem(STORAGE_KEYS.LAST_REMINDER);
    if (last === today) return;

    setTimeout(() => {
      alert("🌸 One small self-care action today can make a big difference.");
      localStorage.setItem(STORAGE_KEYS.LAST_REMINDER, today);
    }, 1200);
  };

  /* -------------------- ACTION -------------------- */
  const markAsDone = (title) => {
    if (completedTips[title] === today) return;

    const updated = {
      ...completedTips,
      [title]: today,
    };

    setCompletedTips(updated);
    localStorage.setItem(
      STORAGE_KEYS.COMPLETED,
      JSON.stringify(updated)
    );

    updateProfileStats();
    calculateStreak(updated);
  };

  /* -------------------- UI DATA -------------------- */
  const progress =
    (Object.keys(completedTips).length / tips.length) * 100;

  const todayIndex = new Date().getDate() % tips.length;
  const todaysTip = tips[todayIndex];

  /* -------------------- RENDER -------------------- */
  return (
    <section className="tips-care">
      <div className="tips-container">
        {/* HEADER */}
        <header className="tips-header">
          <span className="eyebrow">Breast health journey</span>
          <h2>Breast Health Tips & Self-Care</h2>
          <p className="subtitle">
            Progress, not perfection. One gentle step at a time.
          </p>
        </header>

        {/* STATS */}
        <div className="tips-stats">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p>{Math.round(progress)}% completed</p>
          <p className="streak">
            🔥 {streak} day self-care streak
          </p>
        </div>

        {/* TODAY */}
        <section className="today-focus">
          <h3>🌸 Today’s Focus</h3>
          <h4>{todaysTip.title}</h4>
          <p>{todaysTip.text}</p>
        </section>

        {/* CARDS */}
        <div className="care-grid">
          {tips.map((tip, index) => {
            const isDoneToday = completedTips[tip.title] === today;

            return (
              <article
                className={`care-card ${
                  isDoneToday ? "completed" : ""
                }`}
                key={index}
              >
                <div className="icon-ring">
                  <div className="icon-circle">
                    <img src={tip.img} alt="" />
                  </div>
                </div>

                <h3>
                  <span className="tip-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>{" "}
                  {tip.title}
                </h3>

                <p>{tip.text}</p>

                <button
                  className={`done-btn ${
                    isDoneToday ? "done" : ""
                  }`}
                  onClick={() => markAsDone(tip.title)}
                >
                  {isDoneToday ? "✅ Done Today" : "Mark as Done"}
                </button>
              </article>
            );
          })}
        </div>

        {/* FOOTER */}
        <footer className="tips-footer">
          <p>
            Reading about health can feel heavy sometimes.
            Pause if you need to. Most changes are harmless,
            and help is always available when you need it.
          </p>
        </footer>
      </div>
    </section>
  );
}
