// components/AIBotChat.jsx
import React, { useState } from 'react';

export default function AIBotChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    const response = await fetch('/api/chat', { // You must create this API route in backend
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();
    const botReply = { sender: 'bot', text: data.reply };
    setMessages((prev) => [...prev, botReply]);
    setInput('');
  };

  return (
    <div className="ai-chat-bot">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === 'bot' ? 'bot' : 'user'}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
    </div>
  );
}
