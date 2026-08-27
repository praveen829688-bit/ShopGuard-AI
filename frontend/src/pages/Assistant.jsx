import { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, Send, User, ShieldCheck } from "lucide-react";
import { askAI } from "../services/api";

export default function Assistant() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm ShopGuard AI. Tell me what you want to buy, your budget and your requirements."
    }
  ]);

  async function sendMessage() {

    if (!message.trim()) return;

    const current = message;

    setMessages(prev => [
      ...prev,
      {
        type: "user",
        text: current
      }
    ]);

    setMessage("");

    try {

      const response = await askAI(current);

      setMessages(prev => [
        ...prev,
        {
          type: "bot",
          text: response.data.answer
        }
      ]);

    } catch {

      setMessages(prev => [
        ...prev,
        {
          type: "bot",
          text: "Please start the ShopGuard backend first."
        }
      ]);

    }
  }

  return (
    <div className="app">

      <header className="navbar">

        <Link to="/home" className="brand">
          <div className="brand-logo">
            <ShieldCheck size={24} />
          </div>
          ShopGuard <strong>AI</strong>
        </Link>

      </header>

      <main className="chat-container">

        <div className="chat-header">

          <div className="bot-avatar">
            <Bot />
          </div>

          <div>
            <h2>ShopGuard AI Assistant</h2>
            <p>Intelligent shopping assistant</p>
          </div>

        </div>

        <div className="messages">

          {messages.map((item, index) => (

            <div
              className={`message ${item.type}`}
              key={index}
            >

              {item.type === "bot"
                ? <Bot size={18} />
                : <User size={18} />
              }

              <span>{item.text}</span>

            </div>

          ))}

        </div>

        <div className="chat-input">

          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Ask ShopGuard AI..."
          />

          <button onClick={sendMessage}>
            <Send size={20} />
          </button>

        </div>

      </main>

    </div>
  );
}
