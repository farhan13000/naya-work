import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

// Hardcoded credentials
const HARDCODED_EMAIL = 'user@example.com';
const HARDCODED_PASSWORD = 'password';

// Sample previous chats
const previousChats = [
  { id: 1, message: "Hello, how are you?" },
  { id: 2, message: "What's up?" },
  { id: 3, message: "How's your day going?" }
];

// Component for Login Page
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      localStorage.setItem('isLoggedIn', 'true'); // Store login state in local storage
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-container">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className="login-btn">Login</button>
      </div>
    </div>
  );
}

// Component for Sidebar
function Sidebar({ chats }) {
  return (
    <div className="sidebar">
      <h3>Previous Chats</h3>
      <ul>
        {chats.map(chat => (
          <li key={chat.id} className="chat-item">
            <div className="avatar">
              <img src={`https://i.pravatar.cc/40?u=${chat.id}`} alt="Avatar" />
            </div>
            <div className="chat-info">
              <div className="chat-message">{chat.message}</div>
              <div className="chat-time">12:30 PM</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component for Main Layout
function MainLayout() {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setChatHistory(prev => [...prev, { message: inputValue }]);
      setInputValue('');
      // Implement sending the message to OpenAI API and receiving response here
    }
  };

  return (
    <div className="main-layout">
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-message">
              {chat.message}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

// Component for Home Page
function HomePage({ onLogout }) {
  return (
    <div className="home-page">
      <div className="top-right">
        <button onClick={onLogout} className="logout-btn">Sign Out</button>
      </div>
      <h2>Welcome to the Home Page</h2>
      <div className="home-container">
        <Sidebar chats={previousChats} />
        <MainLayout />
      </div>
    </div>
  );
}

// App component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove login state from local storage
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <HomePage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
