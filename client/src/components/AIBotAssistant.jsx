import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import doctorBot from '../assets/lottie/Doctor.json';
import './AIBotAssistant.scss';

const responseMap = [
  { match: ["hi", "hello", "hey", "hey luna", "hi luna"], reply: "Hi there! 😊 How can I help you?" },
  { match: ["good morning"], reply: "Good morning! ☀️ Hope you're feeling great today!" },
  { match: ["good evening"], reply: "Good evening! 🌙 What would you like to know?" },
  { match: ["good afternoon"], reply: "Good afternoon! 😊 Ready when you are!" },
  {
    match: [
      "what is this site", "what is this project", "what is this app", "what's this site", "what's this project",
      "what does this site do", "what's this app for", "what is this platform", "what is this for"
    ],
    reply: "This app helps users understand breast cancer risk using AI. You can upload ultrasound images and ask Luna for guidance."
  },
  { match: ["how can i login", "where is the login button"], reply: "Use the login button at the top right to get started." },
  { match: ["can you tell me a joke", "tell me a joke"], reply: "Why did the scarecrow win an award? Because he was outstanding in his field 😄" },
  { match: ["what image should i upload", "what kind of image", "upload image type"], reply: "Please upload a clear breast ultrasound image. JPEG or PNG works best." },
  { match: ["do i need to login"], reply: "Yes, login first to enable image upload and other features." },
  { match: ["where do i upload"], reply: "You’ll see the upload option once you’re logged in." },
  { match: ["can i use mammogram"], reply: "Yes, mammograms are accepted too if they're clear and diagnostic." },
  { match: ["how to use", "how does this work"], reply: "Login, upload your image, and ask Luna your questions." },
  { match: ["thank you", "thanks"], reply: "You're welcome 😊" },
  { match: ["bye", "goodbye", "see you"], reply: "Goodbye! Hope to chat again soon." },
  { match: ["i love you"], reply: "You're sweet! 😊 Luna appreciates the love." },
  { match: ["who are you", "what's your name"], reply: "I'm Luna, your assistant for breast cancer prediction. Ask me anything." },
  { match: ["what is breast cancer"], reply: "It's when abnormal cells grow in breast tissue. Early screening helps!" },
  { match: ["are you real", "are you human"], reply: "Not really 😄 I'm your AI friend Luna, here to help!" },
  { match: ["do you sleep", "do you eat", "do you have emotions"], reply: "I don’t need food or sleep, but I do care about helping you!" },
  { match: ["sing a song", "can you sing"], reply: "🎶 La la la... I'm better at chatting than singing!" },
  { match: ["do you get tired"], reply: "Never! I’m here for you 24/7 😊" },
];

const AIBotAssistant = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = "Hello! I'm Luna 😊";
    if (hour < 12) greeting = "Good morning! I'm Luna 😊";
    else if (hour < 18) greeting = "Good afternoon! I'm Luna 😊";
    else greeting = "Good evening! I'm Luna 😊";
    setMessages([{ sender: 'bot', text: greeting }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setShowChat(!showChat);

  const matchManualResponse = (input) => {
    const query = input.toLowerCase().trim();
    for (const item of responseMap) {
      for (const phrase of item.match) {
        const pattern = new RegExp(`\\b${phrase}\\b`, 'i');
        if (pattern.test(query)) {
          return item.reply;
        }
      }
    }
    return null;
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMsg = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const manual = matchManualResponse(userInput);
    const botResponse = manual
      ? { sender: 'bot', text: manual }
      : await fetchSmartReply(userInput);

    setMessages((prev) => [...prev, botResponse]);
    setUserInput('');
    document.querySelector('.chat-input input')?.blur();
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const fetchSmartReply = async (input) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gemma3',
          prompt: `You are Luna, a smart assistant for breast cancer prediction. Keep answers short, kind, and accurate. If asked about images, suggest: "Upload a clear breast ultrasound image."`,
          stream: false
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      const reply = data?.response?.trim();
      if (!reply) throw new Error('Empty response');
      return { sender: 'bot', text: reply };
    } catch (error) {
      clearTimeout(timeout);
      console.error('Fetch failed:', error);
      return { sender: 'bot', text: "Luna’s stuck. Try again." };
    }
  };

  return (
    <div className="ai-bot-widget">
      <div className="bot-icon" onClick={toggleChat}>
        <Lottie animationData={doctorBot} loop />
      </div>

      {showChat && (
        <div className="chat-popup">
          <div className="chat-header">
            <span className="bot-name">Luna 🌸</span>
            <span className="close-btn" onClick={toggleChat}>✖</span>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-msg bot">Thinking... ⏳</div>}
            <div ref={messagesEndRef} />
            <div className="contact-note">
              For further details, contact <strong>7071860726</strong> or message on <strong>WhatsApp</strong>.
            </div>
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Luna anything..."
            />
            <button onClick={handleSend} disabled={loading}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBotAssistant;
